import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

interface Article {
  slug: string
  title: string
  subtitle: string
  author: string
  date: string
  pillar: string
  pillar_label: string
  excerpt: string
}

// Hardcoded fallback in case API isn't ready yet
const FALLBACK_ARTICLES: Article[] = [
  {
    slug: 'medical-commercialization-9-moves',
    title: 'Medical Device Commercialization: 9 "Working Backwards" Moves to Reach your First Revenues',
    subtitle: 'Designing from the invoice back to product development',
    author: 'Daniel Young',
    date: '2026-02-16',
    pillar: 'value-dynamics',
    pillar_label: 'Value Dynamics',
    excerpt: 'Most ventures do not stall because the science is weak. They stall because the commercial system that makes a purchase routine never gets built.',
  },
  {
    slug: 'moving-beyond-a-pilot',
    title: 'Moving Beyond a Pilot',
    subtitle: 'How to move from a pilot project to a successful commercial project',
    author: 'Daniel Young',
    date: '2026-02-16',
    pillar: 'market-development',
    pillar_label: 'Market Development',
    excerpt: 'The healthcare sector is flooded with innovation, but most pilots never scale. Interest is there, but converting a digital health pilot into a paying customer is a different story.',
  },
  {
    slug: 'how-to-cross-the-emr-moat',
    title: 'How to Cross the EMR Moat',
    subtitle: 'Breaking Through Barriers: Innovative Paths into the EMR Market',
    author: 'Daniel Young',
    date: '2025-02-18',
    pillar: 'market-development',
    pillar_label: 'Market Development',
    excerpt: 'In the ever-evolving world of digital health, the quest for innovation often feels like crossing a sprawling, fortified moat.',
  },
  {
    slug: 'sales-strategy-for-medical-devices',
    title: 'Sales Strategy for Medical Devices',
    subtitle: 'Glengarry... or Sales Strategy for Medical Devices',
    author: 'Daniel Young',
    date: '2024-03-06',
    pillar: 'sales',
    pillar_label: 'Distributor Sales',
    excerpt: 'Crafting a sales strategy for medical devices requires detailed research and planning. Identifying your target audience, mapping out the discovery process, and establishing the product\'s role in the care path.',
  },
  {
    slug: 'measuring-value-strategic-alliance',
    title: 'Measuring Value with Strategic Alliances',
    subtitle: 'Creating alliances to increase and measure value',
    author: 'Daniel Young',
    date: '2025-06-17',
    pillar: 'value-dynamics',
    pillar_label: 'Value Dynamics',
    excerpt: 'Measuring value is as important (and challenging) as clinical validation, but it\'s a task that\'s often ignored by many health tech ventures.',
  },
  {
    slug: 'measuring-impact',
    title: 'Measuring Impact',
    subtitle: 'Understanding where the real value lies in digital health',
    author: 'Daniel Young',
    date: '2025-06-17',
    pillar: 'value-dynamics',
    pillar_label: 'Value Dynamics',
    excerpt: 'Validation and impact are critical for every digital health application. Demonstrating that an application works and has a positive clinical effect validates the product.',
  },
  {
    slug: 'a-clear-need-for-validation',
    title: 'A Clear Need for Validation',
    subtitle: 'Why clinical evidence matters for digital health ventures',
    author: 'Daniel Young',
    date: '2025-06-17',
    pillar: 'market-development',
    pillar_label: 'Market Development',
    excerpt: 'A recent analysis of the market found that over 40% of digital health products lacked clinical trials or relevant regulatory filings.',
  },
  {
    slug: 'validation-and-measuring-impact-of-digital-health-apps',
    title: 'Validation and Measuring Impact of Digital Health Apps',
    subtitle: 'Does the plane fly?',
    author: 'Daniel Young',
    date: '2025-06-17',
    pillar: 'value-dynamics',
    pillar_label: 'Value Dynamics',
    excerpt: "During the summer lull, it's worth revisiting the fundamentals of validation and impact measurement for digital health applications.",
  },
]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'value-dynamics', label: 'Value Dynamics' },
  { key: 'market-development', label: 'Market Development' },
  { key: 'sales', label: 'Distributor Sales' },
]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Insights() {
  const [filter, setFilter] = useState('all')
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES)

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setArticles(data)
        }
      })
      .catch(() => {
        // Use fallback articles
      })
  }, [])

  const filtered = filter === 'all' ? articles : articles.filter(a => a.pillar === filter)

  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">Insights</p>
          <h1 className="page-hero__title">Working from the Sale: Insights on Commercialization and Business Development</h1>
          <p className="page-hero__subtitle">Practical strategies for medtech and digital health teams navigating market entry, reimbursement, procurement, and sales.</p>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section" id="articles">
        <div className="container">
          {/* Pillar Filter Tabs */}
          <div className="pillar-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`pillar-tab${filter === f.key ? ' pillar-tab--active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="articles-grid">
            {filtered.map((article, i) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className={`article-card${i === 0 && filter === 'all' ? ' article-card--featured' : ''}`}
                data-pillar={article.pillar}
              >
                <div className="article-card__body">
                  <p className="article-card__pillar">{article.pillar_label}</p>
                  <h2 className="article-card__title">{article.title}</h2>
                  <p className="article-card__excerpt">{article.excerpt}</p>
                  <div className="article-card__meta">
                    <span className="article-card__author">{article.author}</span>
                    <span className="article-card__date">{formatDate(article.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section fade-in">
        <div className="container text-center">
          <h2 className="cta-section__text">Ready to build a commercialization strategy that works?</h2>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
            Schedule a Call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
