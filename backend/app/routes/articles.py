"""Articles API — reads markdown files from backend/articles/ directory."""

import re
from pathlib import Path
from typing import Optional

import yaml
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/articles", tags=["articles"])

ARTICLES_DIR = Path(__file__).parent.parent.parent / "articles"


class ArticleMeta(BaseModel):
    slug: str
    title: str
    subtitle: str
    author: str
    date: str
    pillar: str
    pillar_label: str
    excerpt: str


class ArticleFull(ArticleMeta):
    content: str  # markdown body (no frontmatter)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split YAML frontmatter from markdown body."""
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if not match:
        return {}, text
    meta = yaml.safe_load(match.group(1)) or {}
    body = match.group(2).strip()
    return meta, body


def load_article(path: Path) -> Optional[ArticleFull]:
    """Load a single article from a markdown file."""
    try:
        text = path.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(text)
        slug = path.stem
        return ArticleFull(
            slug=slug,
            title=meta.get("title", slug),
            subtitle=meta.get("subtitle", ""),
            author=meta.get("author", "Digital Health Works"),
            date=meta.get("date", ""),
            pillar=meta.get("pillar", ""),
            pillar_label=meta.get("pillar_label", ""),
            excerpt=meta.get("excerpt", ""),
            content=body,
        )
    except Exception:
        return None


def load_all_articles() -> list[ArticleFull]:
    """Load all articles, sorted by date descending."""
    if not ARTICLES_DIR.is_dir():
        return []
    articles = []
    for path in ARTICLES_DIR.glob("*.md"):
        article = load_article(path)
        if article:
            articles.append(article)
    articles.sort(key=lambda a: a.date, reverse=True)
    return articles


@router.get("", response_model=list[ArticleMeta])
async def list_articles():
    """Return metadata for all articles (no body content)."""
    articles = load_all_articles()
    return [
        ArticleMeta(**a.model_dump(exclude={"content"}))
        for a in articles
    ]


@router.get("/{slug}", response_model=ArticleFull)
async def get_article(slug: str):
    """Return a single article with full content."""
    path = ARTICLES_DIR / f"{slug}.md"
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Article not found")
    article = load_article(path)
    if not article:
        raise HTTPException(status_code=500, detail="Failed to parse article")
    return article
