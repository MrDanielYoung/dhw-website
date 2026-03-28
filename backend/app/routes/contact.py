"""Contact form API — creates a Person + Lead in Pipedrive."""

import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api", tags=["contact"])

PIPEDRIVE_API_TOKEN = os.getenv("PIPEDRIVE_API_TOKEN", "")
PIPEDRIVE_BASE = "https://api.pipedrive.com/v1"


class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    message: str = ""


class ContactResponse(BaseModel):
    success: bool
    message: str


async def pipedrive_request(method: str, endpoint: str, json_data: dict) -> dict:
    """Make an authenticated request to Pipedrive API."""
    url = f"{PIPEDRIVE_BASE}{endpoint}?api_token={PIPEDRIVE_API_TOKEN}"
    async with httpx.AsyncClient(timeout=15.0) as client:
        if method == "POST":
            resp = await client.post(url, json=json_data)
        else:
            resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactFormData):
    """
    Accept a contact form submission, create a Person in Pipedrive,
    then create a Lead linked to that Person.
    """
    if not PIPEDRIVE_API_TOKEN:
        raise HTTPException(status_code=500, detail="Pipedrive not configured")

    try:
        # 1. Create a Person
        person_payload: dict = {
            "name": data.name,
            "email": [data.email],
        }
        if data.phone:
            person_payload["phone"] = [data.phone]

        person_resp = await pipedrive_request("POST", "/persons", person_payload)
        if not person_resp.get("success"):
            raise HTTPException(status_code=502, detail="Failed to create contact in CRM")

        person_id = person_resp["data"]["id"]

        # 2. Build a lead title
        lead_title = f"Website inquiry from {data.name}"
        if data.company:
            lead_title = f"Website inquiry from {data.name} ({data.company})"

        # 3. Create a Lead linked to the Person
        lead_payload: dict = {
            "title": lead_title,
            "person_id": person_id,
        }

        # Add a note with the message if provided
        lead_resp = await pipedrive_request("POST", "/leads", lead_payload)
        if not lead_resp.get("success"):
            raise HTTPException(status_code=502, detail="Failed to create lead in CRM")

        lead_id = lead_resp["data"]["id"]

        # 4. If there's a message, add it as a note on the lead
        if data.message.strip():
            note_text = f"<strong>Website Contact Form</strong><br><br>"
            if data.company:
                note_text += f"<strong>Company:</strong> {data.company}<br>"
            note_text += f"<strong>Message:</strong><br>{data.message}"

            note_payload = {
                "content": note_text,
                "lead_id": lead_id,
            }
            # Notes endpoint — best effort, don't fail the whole request if this fails
            try:
                await pipedrive_request("POST", "/notes", note_payload)
            except Exception:
                pass  # Note creation is non-critical

        return ContactResponse(
            success=True,
            message="Thank you. We'll be in touch shortly."
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Submission failed: {str(e)}")
