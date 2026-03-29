"""Helen — DHW Commercialization Advisor API routes.

Provides:
  POST /api/helen/chat           — Streaming chat via Claude (SSE)
  POST /api/helen/booking        — Lead capture → Pipedrive + Teams notification
  POST /api/helen/talking-points — Export conversation summary
"""

import json
import os
import re
from pathlib import Path

import anthropic
import httpx
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional

from app.config import settings
from app.routes.notify import send_lead_notification

router = APIRouter(prefix="/api/helen", tags=["helen"])

# Claude client
client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

# Load Helen's system prompt
_prompt_path = Path(__file__).resolve().parent.parent.parent / "helen-system-prompt.txt"
_knowledge_path = Path(__file__).resolve().parent.parent.parent / "knowledge-base.md"

helen_system_prompt = _prompt_path.read_text(encoding="utf-8")

# Append the knowledge base if it exists
if _knowledge_path.is_file():
    _kb = _knowledge_path.read_text(encoding="utf-8")
    helen_system_prompt += "\n\n---\n\nDOMAIN KNOWLEDGE BASE\n\n" + _kb


# ─── Pipedrive config ───
PIPEDRIVE_API_TOKEN = os.getenv("PIPEDRIVE_API_TOKEN", "")
PIPEDRIVE_BASE = "https://api.pipedrive.com/v1"

PIPEDRIVE_CONFIG = {
    "pipeline_id": 7,
    "stage_id": 30,  # "New Lead" stage
    "owner_id_daniel": 12705075,
    "owner_id_romy": 12705086,
    "deal_source_field_key": "c2d7270a6e59009665bc350c0bf9c433a51e2965",
    "deal_source_helen_id": 99,
    "product_desc_field_key": "411091dc80b93d8cd95f734af6460d97ccddf2f3",
    "venture_stage_field_key": "9d9494759867f4c3bf3b6c5f74344e3c0963d8fe",
    "venture_stage_options": {
        "Pre-CE/FDA": 81,
        "Cleared, Pre-Commercial": 82,
        "Actively Commercializing": 83,
        "Scaling": 84,
    },
    "target_markets_field_key": "5bf8d23b2e87c6ed0bb8e7df4d06380d68581f45",
    "target_markets_options": {
        "US": 91, "EU": 92, "UK": 93, "US + EU": 94, "Global": 95, "Other": 96,
    },
    "talking_points_field_key": "0dd4f3f78ad52c938ac382d3b23f5387d2732f80",
}

# Teams config
TEAMS_TEAM_ID = "55112248-9cbf-4822-b2e7-829264b464a0"
TEAMS_CHANNEL_ID = "19:EqZyIlEqOkSnKroYjFSTxYuxqH55HrmLSuWBWRHu_z81@thread.tacv2"

BOOKING_URL = "https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/"


# ─── Models ───

class BookingRequest(BaseModel):
    name: str
    email: EmailStr
    company: str
    product_description: Optional[str] = None
    venture_stage: Optional[str] = None
    target_markets: Optional[str] = None
    conversation_summary: Optional[str] = None
    topics_discussed: Optional[list[str]] = None


class TalkingPointsRequest(BaseModel):
    messages: list[dict]
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    company_name: Optional[str] = None
    product_description: Optional[str] = None
    venture_stage: Optional[str] = None
    target_markets: Optional[str] = None


# ─── Pipedrive helpers ───

async def pipedrive_request(endpoint: str, method: str = "GET", body: dict | None = None) -> dict:
    sep = "&" if "?" in endpoint else "?"
    url = f"{PIPEDRIVE_BASE}{endpoint}{sep}api_token={PIPEDRIVE_API_TOKEN}"
    async with httpx.AsyncClient(timeout=15.0) as http:
        if method == "POST":
            resp = await http.post(url, json=body)
        elif method == "DELETE":
            resp = await http.delete(url)
        else:
            resp = await http.get(url)
        data = resp.json()
        if not data.get("success"):
            print(f"Pipedrive error ({endpoint}): {data}")
        return data


async def find_person(email: str) -> int | None:
    data = await pipedrive_request(f"/persons/search?term={email}&fields=email")
    if data.get("success") and data.get("data", {}).get("items"):
        return data["data"]["items"][0]["item"]["id"]
    return None


async def find_organization(name: str) -> int | None:
    data = await pipedrive_request(f"/organizations/search?term={name}")
    if data.get("success") and data.get("data", {}).get("items"):
        return data["data"]["items"][0]["item"]["id"]
    return None


async def create_pipedrive_lead(booking: BookingRequest, summary: str, topics: list[str]) -> dict | None:
    """Create Org → Person → Deal → Note in Pipedrive."""
    if not PIPEDRIVE_API_TOKEN:
        print("Pipedrive not configured — skipping lead creation")
        return None

    try:
        # 1. Find or create organization
        org_id = await find_organization(booking.company)
        if not org_id:
            result = await pipedrive_request("/organizations", "POST", {"name": booking.company})
            if result.get("success"):
                org_id = result["data"]["id"]
            else:
                return None

        # 2. Find or create person
        person_id = await find_person(booking.email)
        if not person_id:
            result = await pipedrive_request("/persons", "POST", {
                "name": booking.name,
                "email": [{"value": booking.email, "primary": True}],
                "org_id": org_id,
            })
            if result.get("success"):
                person_id = result["data"]["id"]
            else:
                return None

        # 3. Create deal
        cfg = PIPEDRIVE_CONFIG
        deal_data: dict = {
            "title": f"{booking.company} — Helen Lead",
            "pipeline_id": cfg["pipeline_id"],
            "stage_id": cfg["stage_id"],
            "person_id": person_id,
            "org_id": org_id,
            "user_id": cfg["owner_id_daniel"],
            "status": "open",
            cfg["deal_source_field_key"]: cfg["deal_source_helen_id"],
        }

        if booking.product_description:
            deal_data[cfg["product_desc_field_key"]] = booking.product_description
        if booking.venture_stage and booking.venture_stage in cfg["venture_stage_options"]:
            deal_data[cfg["venture_stage_field_key"]] = cfg["venture_stage_options"][booking.venture_stage]
        if booking.target_markets and booking.target_markets in cfg["target_markets_options"]:
            deal_data[cfg["target_markets_field_key"]] = cfg["target_markets_options"][booking.target_markets]

        deal_result = await pipedrive_request("/deals", "POST", deal_data)
        if not deal_result.get("success"):
            return None
        deal_id = deal_result["data"]["id"]

        # 4. Add Romy as follower
        await pipedrive_request(f"/deals/{deal_id}/followers", "POST", {
            "user_id": cfg["owner_id_romy"],
        })

        # 5. Add conversation note
        note_html = (
            f"<b>Helen Lead — {booking.company}</b><br><br>"
            f"<b>Contact:</b> {booking.name} ({booking.email})<br>"
        )
        if booking.product_description:
            note_html += f"<b>Product:</b> {booking.product_description}<br>"
        if booking.venture_stage:
            note_html += f"<b>Stage:</b> {booking.venture_stage}<br>"
        if booking.target_markets:
            note_html += f"<b>Markets:</b> {booking.target_markets}<br>"
        note_html += f"<br><b>Key Topics:</b><br>"
        note_html += "<br>".join(f"• {t}" for t in topics)
        note_html += f"<br><br><b>Conversation Summary:</b><br>{summary}"

        await pipedrive_request("/notes", "POST", {
            "content": note_html,
            "deal_id": deal_id,
            "person_id": person_id,
            "org_id": org_id,
        })

        print(f"Pipedrive lead created: Person {person_id}, Org {org_id}, Deal {deal_id}")
        return {"person_id": person_id, "org_id": org_id, "deal_id": deal_id}

    except Exception as e:
        print(f"Pipedrive error: {e}")
        return None


# ─── Teams notification ───

async def send_teams_notification(booking: BookingRequest, topics: list[str]) -> bool:
    """Send notification to Helen (Training) channel via Graph API."""
    try:
        # Use the existing notify module's ROPC flow
        from app.routes.notify import get_graph_token
        token = await get_graph_token()
        if not token:
            print("Teams: no token available — skipping notification")
            return False

        lines = [
            "<b>🆕 New Helen Lead</b>",
            "",
            f"<b>Contact:</b> {booking.name} ({booking.email})",
            f"<b>Company:</b> {booking.company}",
        ]
        if booking.product_description:
            lines.append(f"<b>Product:</b> {booking.product_description}")
        if booking.venture_stage:
            lines.append(f"<b>Stage:</b> {booking.venture_stage}")
        if booking.target_markets:
            lines.append(f"<b>Markets:</b> {booking.target_markets}")
        lines.append("")
        lines.append("<b>Key Topics:</b>")
        for t in topics:
            lines.append(f"• {t}")
        lines.append("")
        lines.append("<b>Requested Meeting:</b> Yes")

        body_html = "<br>".join(lines)

        url = f"https://graph.microsoft.com/v1.0/teams/{TEAMS_TEAM_ID}/channels/{TEAMS_CHANNEL_ID}/messages"
        async with httpx.AsyncClient(timeout=10.0) as http:
            resp = await http.post(url, json={
                "body": {"contentType": "html", "content": body_html}
            }, headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            })
            success = resp.status_code in (200, 201)
            if success:
                print(f"Teams notification sent for {booking.company}")
            else:
                print(f"Teams notification failed: {resp.status_code} {resp.text}")
            return success
    except Exception as e:
        print(f"Teams notification error: {e}")
        return False


# ─── Topic extraction ───

TOPIC_PATTERNS: dict[str, str] = {
    r"510\(k\)|PMA|FDA|de novo|clearance": "FDA regulatory pathway",
    r"CE mark|MDR|IVDR|notified bod": "EU MDR / CE marking",
    r"UKCA|MHRA|NHS|NICE": "UK market access",
    r"DiGA|BfArM|SGB V|G-BA": "German DiGA pathway",
    r"EBM|GOÄ|GKV|PKV": "German billing/reimbursement",
    r"CPT|HCPCS|billing code|reimburse": "US billing codes & reimbursement",
    r"pilot|proof of concept|POC": "Pilot design & conversion",
    r"go-to-market|GTM|market entry|launch": "Go-to-market strategy",
    r"pricing|price|cost|engagement": "Pricing & engagement scope",
    r"sales|distributor|channel|KAM": "Sales infrastructure",
    r"stakeholder|decision.maker|buyer|procurement": "Stakeholder mapping",
    r"SaMD|software|AI|algorithm|digital": "Software as Medical Device (SaMD)",
    r"RPM|remote|telehealth|monitoring": "Remote patient monitoring",
    r"clinical|evidence|trial|study": "Clinical evidence strategy",
    r"DRG|hospital|inpatient": "Hospital/inpatient reimbursement",
}


def extract_topics(messages: list[dict]) -> list[str]:
    all_text = " ".join(m.get("content", "") for m in messages).lower()
    topics = []
    for pattern, topic in TOPIC_PATTERNS.items():
        if re.search(pattern, all_text, re.IGNORECASE):
            topics.append(topic)
    if not topics:
        topics.append("General commercialization inquiry")
    return topics[:5]


def generate_summary(messages: list[dict]) -> str:
    user_msgs = [m for m in messages if m.get("role") == "user"]
    if not user_msgs:
        return "No substantive exchanges yet."
    first = user_msgs[0]["content"][:200]
    count = len(user_msgs)
    summary = f'User asked {count} question(s). Initial inquiry: "{first}"'
    if count > 1:
        last = user_msgs[-1]["content"][:150]
        summary += f' Most recent question: "{last}"'
    return summary


def generate_talking_points(req: TalkingPointsRequest) -> str:
    from datetime import date
    today = date.today().isoformat()
    company = req.company_name or "[Not provided]"
    name = req.contact_name or "[Not provided]"
    email = req.contact_email or "[Not provided]"

    doc = f"TALKING POINTS — {company} / {today}\n"
    doc += f"Generated from Helen conversation\n\n"
    doc += "════════════════════════════════════════\n\n"
    doc += "SECTION 1: ABOUT THE VENTURE\n"
    doc += f"Company:        {company}\n"
    doc += f"Contact:        {name} ({email})\n"
    doc += f"Product:        {req.product_description or '[Not provided]'}\n"
    doc += f"Stage:          {req.venture_stage or '[Not provided]'}\n"
    doc += f"Markets:        {req.target_markets or '[Not provided]'}\n\n"
    doc += "════════════════════════════════════════\n\n"
    doc += "SECTION 2: QUESTIONS DISCUSSED\n\n"

    q_num = 0
    msgs = req.messages
    for i, m in enumerate(msgs):
        if m.get("role") == "user":
            q_num += 1
            question = m["content"][:300]
            answer = "[No response recorded]"
            if i + 1 < len(msgs) and msgs[i + 1].get("role") == "assistant":
                answer = msgs[i + 1]["content"][:500]
            doc += f"{q_num}. Question: {question}\n"
            doc += f"   Summary: {answer}\n\n"

    doc += "════════════════════════════════════════\n\n"

    topics = extract_topics(msgs)
    doc += "SECTION 3: KEY TOPICS IDENTIFIED\n\n"
    for t in topics:
        doc += f"- {t}\n"
    doc += "\n"

    doc += "════════════════════════════════════════\n\n"
    doc += "SECTION 4: RECOMMENDED FOCUS FOR FIRST CALL\n\n"
    doc += "Based on the conversation, the DHW team should focus on:\n"
    if topics:
        doc += f"1. {topics[0]} — primary area of inquiry\n"
        if len(topics) > 1:
            doc += f"2. {topics[1]} — secondary area\n"
    doc += "3. Commercial readiness assessment — gap analysis based on current stage\n\n"

    doc += "════════════════════════════════════════\n"
    doc += "Generated by Helen / Digital Health Works\n"
    doc += "digitalhealthworks.com\n"

    return doc


# ─── Routes ───

@router.post("/chat")
async def helen_chat(request: Request):
    """Streaming chat with Helen via Claude."""
    body = await request.json()
    messages = body.get("messages", [])

    if not messages or not isinstance(messages, list):
        async def error_stream():
            yield f"data: {json.dumps({'error': 'Please enter a message.'})}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")

    # Clean messages
    messages = [
        {"role": m.get("role", "user"), "content": m.get("content", "")}
        for m in messages
        if m.get("content", "").strip()
    ]
    if not messages:
        async def error_stream():
            yield f"data: {json.dumps({'error': 'Please enter a message.'})}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")

    async def generate():
        try:
            with client.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=2048,
                system=helen_system_prompt,
                messages=messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.post("/booking")
async def helen_booking(request: Request):
    """Capture lead → Pipedrive + Teams notification."""
    try:
        body = await request.json()
        booking = BookingRequest(**body)
        messages = body.get("messages", [])

        topics = booking.topics_discussed or extract_topics(messages)
        summary = booking.conversation_summary or generate_summary(messages)

        # Create Pipedrive lead (don't block on failure)
        pipedrive_result = None
        try:
            pipedrive_result = await create_pipedrive_lead(booking, summary, topics)
        except Exception as e:
            print(f"Pipedrive background error: {e}")

        # Send Teams notification (don't block on failure)
        try:
            await send_teams_notification(booking, topics)
        except Exception as e:
            print(f"Teams background error: {e}")

        # Also fire the existing notify flow to General channel
        try:
            await send_lead_notification(
                name=booking.name,
                email=booking.email,
                company=booking.company,
                message=f"Helen lead: {summary}",
            )
        except Exception:
            pass

        return JSONResponse({
            "success": True,
            "booking_url": BOOKING_URL,
            "pipedrive": pipedrive_result,
        })

    except Exception as e:
        print(f"Booking error: {e}")
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)


@router.post("/talking-points")
async def helen_talking_points(request: Request):
    """Generate and return talking points document."""
    try:
        body = await request.json()
        req = TalkingPointsRequest(**body)
        doc = generate_talking_points(req)
        return JSONResponse({"success": True, "talking_points": doc})
    except Exception as e:
        print(f"Talking points error: {e}")
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)
