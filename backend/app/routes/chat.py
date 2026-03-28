import json

import anthropic
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse

from app.config import settings
from app.system_prompt import system_prompt

router = APIRouter()

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)


@router.post("/api/chat")
async def chat(request: Request):
    body = await request.json()
    messages = body.get("messages", [])
    # Use client-provided system prompt for backward compat, otherwise server default
    system = body.get("system") or system_prompt

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
