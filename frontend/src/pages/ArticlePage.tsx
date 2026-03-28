import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

interface Article {
  slug: string
  title: string
  subtitle: string
  author: string
  date: string
  pillar: string
  pillar_label: string
  excerpt: string
  content: string
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    fetch(`/api/articles/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => {
        setArticle(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="page-hero__content">
            <p className="page-hero__label">Insights</p>
            <h1 className="page-hero__title" style={{ opacity: 0.5 }}>Loading...</h1>
          </div>
        </section>
      </main>
    )
  }

  if (error || !article) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="page-hero__content">
            <p className="page-hero__label">Insights</p>
            <h1 className="page-hero__title">Article not found</h1>
            <p className="page-hero__subtitle">
              <Link to="/insights" style={{ color: 'var(--color-accent)' }}>Back to all articles</Link>
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main id="main">
      {/* Article Hero */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">{article.pillar_label}</p>
          <h1 className="page-hero__title">{article.title}</h1>
          {article.subtitle && (
            <p className="page-hero__subtitle">{article.subtitle}</p>
          )}
        </div>
      </section>

      {/* Article Body */}
      <article className="section article-body">
        <div className="container container--narrow">
          <div className="article-body__meta">
            <span className="article-body__author">{article.author}</span>
            <span className="article-body__divider">·</span>
            <time className="article-body__date">{formatDate(article.date)}</time>
          </div>
          <div className="article-body__content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          <div className="article-body__share">
            <span className="article-body__share-label">Share</span>
            <div className="article-body__share-links">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://digitalhealthworks.com/insights/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-body__share-link"
                aria-label="Share on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://digitalhealthworks.com/insights/${slug}`)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-body__share-link"
                aria-label="Share on X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={`https://bsky.app/intent/compose?text=${encodeURIComponent(article.title + ' https://digitalhealthworks.com/insights/' + slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-body__share-link"
                aria-label="Share on Bluesky"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.643 3.593 3.511 6.2 3.265-3.723.57-6.982 2.182-3.937 7.606C5.876 25.152 9.19 21.15 12 17.043c2.81 4.107 5.714 7.837 9.113 4.075 3.045-5.424-.214-7.036-3.937-7.606 2.607.246 5.415-.622 6.2-3.265C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.86-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg>
              </a>
            </div>
          </div>
          <div className="article-body__footer">
            <Link to="/insights" className="article-body__back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              All Articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
