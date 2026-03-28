from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from app.routes import chat, health, articles

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
app.include_router(articles.router)

# In production, serve the React frontend build
# CI/CD copies frontend build to backend/static/
# In local dev, it's at ../frontend/dist/
static_dir = Path(__file__).parent.parent / "static"
frontend_dist = Path(__file__).parent.parent.parent / "frontend" / "dist"

serve_dir = static_dir if static_dir.is_dir() else frontend_dist

if serve_dir.is_dir():
    # Mount static assets (JS, CSS, images) at /assets
    assets_dir = serve_dir / "assets"
    if assets_dir.is_dir():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")
    
    # Serve other static files (favicon, etc.)
    @app.get("/favicon.png")
    async def favicon_png():
        return FileResponse(serve_dir / "favicon.png")

    @app.get("/favicon.svg")
    async def favicon_svg():
        return FileResponse(serve_dir / "favicon.svg")

    @app.get("/articles-content.json")
    async def articles_json():
        return FileResponse(serve_dir / "articles-content.json")

    # SEO + AI/LLM discovery files
    @app.get("/robots.txt")
    async def robots_txt():
        return FileResponse(serve_dir / "robots.txt", media_type="text/plain; charset=utf-8")

    @app.get("/sitemap.xml")
    async def sitemap_xml():
        return FileResponse(serve_dir / "sitemap.xml", media_type="application/xml")

    @app.get("/llms.txt")
    async def llms_txt():
        return FileResponse(serve_dir / "llms.txt", media_type="text/plain; charset=utf-8")

    @app.get("/llms-full.txt")
    async def llms_full_txt():
        return FileResponse(serve_dir / "llms-full.txt", media_type="text/plain; charset=utf-8")

    @app.get("/index.html.md")
    async def index_md():
        return FileResponse(serve_dir / "index.html.md", media_type="text/markdown; charset=utf-8")

    # SPA catch-all: serve index.html for any non-API route
    @app.get("/{full_path:path}")
    async def spa_fallback(request: Request, full_path: str):
        # Don't catch API routes
        if full_path.startswith("api/"):
            return {"detail": "Not Found"}
        
        # Check if it's a real file in the static directory
        file_path = serve_dir / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        
        # Otherwise serve index.html (SPA routing)
        return FileResponse(serve_dir / "index.html")
