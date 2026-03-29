import json
from pathlib import Path

import anthropic
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
    # Fallback if file not found in container
    kate_system_prompt = "You are Kate, the LinkedIn content assistant at Digital Health Works. Help the user draft LinkedIn posts."


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
                system=system,
                messages=messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
