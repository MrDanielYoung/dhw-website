import json
import re
from pathlib import Path

import anthropic
import httpx
from bs4 import BeautifulSoup
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse

from app.config import settings

router = APIRouter()

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

# Load Kate's system prompt
_kate_prompt_path = Path(__file__).resolve().parent.parent / "kate-system-prompt.txt"
try:
    kate_system_prompt = _kate_prompt_path.read_text(encoding="utf-8")
except FileNotFoundError:
    kate_system_prompt = "You are Kate, the LinkedIn content assistant at Digital Health Works. Help the user draft LinkedIn posts."

# Known news sources Kate can browse
KNOWN_SOURCES = {
    "stat": "https://www.statnews.com",
    "statnews": "https://www.statnews.com",
    "stat news": "https://www.statnews.com",
    "health affairs": "https://www.healthaffairs.org",
    "healthaffairs": "https://www.healthaffairs.org",
    "fierce healthcare": "https://www.fiercehealthcare.com",
    "mobihealthnews": "https://www.mobihealthnews.com",
    "medtech dive": "https://www.medtechdive.com",
    "healthcare it news": "https://www.healthcareitnews.com",
    "modern healthcare": "https://www.modernhealthcare.com",
}


async def fetch_page_content(url: str, max_chars: int = 8000) -> str:
    """Fetch a web page and extract readable text content."""
    try:
        async with httpx.AsyncClient(
            follow_redirects=True,
            timeout=15.0,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
        ) as http_client:
            resp = await http_client.get(url)
            resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")

        # Remove script, style, nav, footer, sidebar elements
        for tag in soup(["script", "style", "nav", "footer", "aside", "header", "noscript", "iframe"]):
            tag.decompose()

        # Extract article headlines and summaries
        articles = []
        
        # Look for common article patterns
        for article in soup.find_all(["article", "div"], class_=re.compile(r"post|article|story|card|item|entry", re.I)):
            headline_el = article.find(["h1", "h2", "h3", "h4", "a"])
            if headline_el:
                headline = headline_el.get_text(strip=True)
                # Get the link
                link_el = article.find("a", href=True)
                link = link_el["href"] if link_el else ""
                if link and not link.startswith("http"):
                    link = url.rstrip("/") + "/" + link.lstrip("/")
                # Get summary/description
                desc_el = article.find(["p", "span"], class_=re.compile(r"desc|summary|excerpt|teaser|blurb", re.I))
                desc = desc_el.get_text(strip=True) if desc_el else ""
                if headline and len(headline) > 15:
                    articles.append({"headline": headline[:200], "link": link, "summary": desc[:300]})

        if articles:
            result = f"## Headlines from {url}\n\n"
            for i, a in enumerate(articles[:15], 1):
                result += f"{i}. **{a['headline']}**\n"
                if a["summary"]:
                    result += f"   {a['summary']}\n"
                if a["link"]:
                    result += f"   Link: {a['link']}\n"
                result += "\n"
            return result[:max_chars]

        # Fallback: just extract all text
        text = soup.get_text(separator="\n", strip=True)
        # Clean up excessive whitespace
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text[:max_chars]

    except Exception as e:
        return f"[Could not fetch {url}: {str(e)}]"


def detect_urls_and_sources(messages: list) -> list[str]:
    """Detect URLs and known source names in user messages."""
    urls = []
    last_user_msg = ""
    for m in reversed(messages):
        if m.get("role") == "user":
            last_user_msg = m.get("content", "").lower()
            break

    # Check for explicit URLs
    url_pattern = re.compile(r"https?://[^\s<>\"']+")
    found_urls = url_pattern.findall(last_user_msg)
    urls.extend(found_urls)

    # Check for known source names
    for name, url in KNOWN_SOURCES.items():
        if name in last_user_msg:
            if url not in urls:
                urls.append(url)

    return urls


@router.post("/api/kate/chat")
async def kate_chat(request: Request):
    body = await request.json()
    messages = body.get("messages", [])
    user_context = body.get("user_context", None)

    # Build system prompt with user context
    system = kate_system_prompt
    if user_context:
        system = kate_system_prompt + "\n\n## Current Session\n" + user_context

    # Validate messages
    if not messages or not isinstance(messages, list):
        async def error_stream():
            yield f"data: {json.dumps({'error': 'Please enter a message.'})}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")

    # Ensure messages have correct format
    clean_messages = [
        {"role": m.get("role", "user"), "content": m.get("content", "")}
        for m in messages
        if m.get("content", "").strip()
    ]
    if not clean_messages:
        async def error_stream():
            yield f"data: {json.dumps({'error': 'Please enter a message.'})}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")

    # Detect if user wants Kate to browse news sources
    urls_to_fetch = detect_urls_and_sources(clean_messages)

    # Fetch web content if needed
    web_context = ""
    if urls_to_fetch:
        fetched_parts = []
        for url in urls_to_fetch[:3]:  # Max 3 URLs
            content = await fetch_page_content(url)
            fetched_parts.append(content)
        web_context = "\n\n".join(fetched_parts)

    # If we have web content, inject it into the conversation
    if web_context:
        # Add the web content as context in the system prompt
        system += f"\n\n## Live Web Content (just fetched)\n{web_context}\n\nUse this content to suggest LinkedIn post topics. Pick 3-5 headlines that align with Daniel's content pillars and DHW's strategic priorities. For each, suggest a hook and angle."

    async def generate():
        try:
            with client.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=2048,
                system=system,
                messages=clean_messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
