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
kate_system_prompt = _kate_prompt_path.read_text(encoding="utf-8")


@router.post("/api/kate/chat")
async def kate_chat(request: Request):
    body = await request.json()
    messages = body.get("messages", [])

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
                system=kate_system_prompt,
                messages=messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
