from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.gzip import GZipMiddleware

from app.config import settings
from app.routes import chat, health, articles, contact

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


# Cache-Control + compression middleware
class CacheAndCompressMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        path = request.url.path

        # Never cache API responses
        if path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
            return response

        content_type = response.headers.get("content-type", "")

        # Hashed assets (JS/CSS with fingerprint in filename) — cache aggressively
        if path.startswith("/assets/") and any(
            path.endswith(ext) for ext in (".js", ".css")
        ):
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
            return response

        # Images, video, fonts — cache for 1 week
        if any(
            ext in content_type
            for ext in ("image/", "video/", "font/", "application/font")
        ) or any(
            path.endswith(ext)
            for ext in (".jpg", ".jpeg", ".png", ".svg", ".webp", ".mp4", ".webm", ".woff2", ".woff")
        ):
            response.headers["Cache-Control"] = "public, max-age=604800"
            return response

        # Favicon
        if "favicon" in path:
            response.headers["Cache-Control"] = "public, max-age=604800"
            return response

        # SEO files — cache for 1 hour
        if path in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/index.html.md"):
            response.headers["Cache-Control"] = "public, max-age=3600"
            return response

        # HTML/SPA pages — revalidate every time
        if "text/html" in content_type or path == "/":
            response.headers["Cache-Control"] = "public, max-age=0, must-revalidate"
            return response

        return response


app.add_middleware(CacheAndCompressMiddleware)
app.add_middleware(GZipMiddleware, minimum_size=500)

# API routes
app.include_router(health.router)
app.include_router(chat.router)
app.include_router(articles.router)
app.include_router(contact.router)

# In production, serve the React frontend build
# CI/CD copies frontend build to backend/static/
# In local dev, it's at ../frontend/dist/
static_dir = Path(__file__).parent.parent / "static"
frontend_dist = Path(__file__).parent.parent.parent / "frontend" / "dist"

serve_dir = static_dir if static_dir.is_dir() else frontend_dist


def _content_type(path: str) -> str:
    """Guess content type from file extension."""
    ext = Path(path).suffix.lower()
    types = {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".txt": "text/plain; charset=utf-8",
        ".xml": "application/xml",
        ".md": "text/markdown; charset=utf-8",
    }
    return types.get(ext, "application/octet-stream")


def _serve_with_precompressed(file_path: Path, request: Request) -> FileResponse:
    """Serve a pre-compressed (.br or .gz) version if the client supports it."""
    accept_encoding = request.headers.get("accept-encoding", "")
    
    # Try brotli first (best compression)
    if "br" in accept_encoding:
        br_path = Path(str(file_path) + ".br")
        if br_path.is_file():
            return FileResponse(
                br_path,
                media_type=_content_type(str(file_path)),
                headers={"Content-Encoding": "br", "Vary": "Accept-Encoding"},
            )
    
    # Try gzip
    if "gzip" in accept_encoding:
        gz_path = Path(str(file_path) + ".gz")
        if gz_path.is_file():
            return FileResponse(
                gz_path,
                media_type=_content_type(str(file_path)),
                headers={"Content-Encoding": "gzip", "Vary": "Accept-Encoding"},
            )
    
    # Serve uncompressed (GZipMiddleware will handle compression)
    return FileResponse(file_path, media_type=_content_type(str(file_path)))


if serve_dir.is_dir():
    # Serve /assets with pre-compressed file support
    @app.get("/assets/{file_path:path}")
    async def serve_assets(file_path: str, request: Request):
        full_path = serve_dir / "assets" / file_path
        if full_path.is_file():
            return _serve_with_precompressed(full_path, request)
        return Response(status_code=404)

    @app.get("/favicon.png")
    async def favicon_png(request: Request):
        return FileResponse(serve_dir / "favicon.png")

    @app.get("/favicon.svg")
    async def favicon_svg(request: Request):
        return FileResponse(serve_dir / "favicon.svg", media_type="image/svg+xml")

    @app.get("/articles-content.json")
    async def articles_json(request: Request):
        return _serve_with_precompressed(serve_dir / "articles-content.json", request)

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
        if full_path.startswith("api/"):
            return {"detail": "Not Found"}
        
        # Check if it's a real file in the static directory
        file_path = serve_dir / full_path
        if file_path.is_file():
            return _serve_with_precompressed(file_path, request)
        
        # Otherwise serve index.html (SPA routing)
        return _serve_with_precompressed(serve_dir / "index.html", request)
