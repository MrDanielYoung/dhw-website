"""Teams notification — sends lead alerts to the DHW General channel."""

import os
import httpx

# Microsoft Graph credentials
MS_TENANT_ID = "3dd54b52-c31e-442e-8705-a56b839e59a7"
MS_CLIENT_ID = "1950a258-227b-4e31-a9cf-717495945fc2"  # Azure PowerShell first-party app
MS_USERNAME = os.getenv("MS_NOTIFY_USERNAME", "")
MS_PASSWORD = os.getenv("MS_NOTIFY_PASSWORD", "")

# DHW Inc team → DHW Marketing channel
TEAM_ID = "55112248-9cbf-4822-b2e7-829264b464a0"
CHANNEL_ID = "19:7da209fec81c49c9805b934841278bf5@thread.tacv2"

TOKEN_URL = f"https://login.microsoftonline.com/{MS_TENANT_ID}/oauth2/v2.0/token"
GRAPH_URL = "https://graph.microsoft.com/v1.0"


async def get_graph_token() -> str | None:
    """Acquire a Graph API token using ROPC flow."""
    if not MS_USERNAME or not MS_PASSWORD:
        return None
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(TOKEN_URL, data={
                "client_id": MS_CLIENT_ID,
                "scope": "https://graph.microsoft.com/.default",
                "grant_type": "password",
                "username": MS_USERNAME,
                "password": MS_PASSWORD,
            })
            data = resp.json()
            return data.get("access_token")
    except Exception:
        return None


async def send_lead_notification(
    name: str,
    email: str,
    phone: str = "",
    company: str = "",
    message: str = "",
) -> bool:
    """Send a lead notification to the DHW General Teams channel."""
    token = await get_graph_token()
    if not token:
        return False

    # Build a clean HTML message
    lines = [
        "<b>🔔 New Website Lead</b>",
        "",
        f"<b>Name:</b> {name}",
        f"<b>Email:</b> {email}",
    ]
    if phone:
        lines.append(f"<b>Phone:</b> {phone}")
    if company:
        lines.append(f"<b>Company:</b> {company}")
    if message:
        lines.append(f"<br><b>Message:</b><br>{message}")
    lines.append("")
    lines.append("<em>— digitalhealthworks.com</em>")

    body_html = "<br>".join(lines)

    url = f"{GRAPH_URL}/teams/{TEAM_ID}/channels/{CHANNEL_ID}/messages"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json={
                "body": {
                    "contentType": "html",
                    "content": body_html,
                }
            }, headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            })
            return resp.status_code in (200, 201)
    except Exception:
        return False
