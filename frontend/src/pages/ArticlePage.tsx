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
