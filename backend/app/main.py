from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routes import chat, health

app = FastAPI(title="Digital Health Works API")

# CORS
origins = [o.strip() for o in settings.allowed_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(health.router)
app.include_router(chat.router)

# In production, serve the React frontend build
# CI/CD copies frontend build to backend/static/
# In local dev, it's at ../frontend/dist/
static_dir = Path(__file__).parent.parent / "static"
frontend_dist = Path(__file__).parent.parent.parent / "frontend" / "dist"

serve_dir = static_dir if static_dir.is_dir() else frontend_dist
if serve_dir.is_dir():
    app.mount("/", StaticFiles(directory=str(serve_dir), html=True), name="static")
