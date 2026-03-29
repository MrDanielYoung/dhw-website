import { useEffect } from 'react'
import HelenChat from '../components/HelenChat'

export default function MeetHelen() {
  useEffect(() => {
    document.title = 'Meet Helen — AI Commercialization Advisor | Digital Health Works'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'Helen is an AI-powered commercialization advisor from Digital Health Works. Ask about medical device market entry, reimbursement strategy, regulatory pathways, go-to-market planning, and more. Export talking points or book a call with the DHW team.')
    }
    return () => {
      document.title = 'Digital Health Works — Medical Device Commercialization, Market Access & Sales Agency'
      if (meta) {
        meta.setAttribute('content', 'Digital Health Works is a medical device commercialization and sales agency helping medtech, digital health, and life science companies build revenue through health economics strategy, market development, and distributor sales across the US and Europe.')
      }
    }
  }, [])

  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">AI-Powered</p>
          <h1 className="page-hero__title">Meet Helen</h1>
          <p className="page-hero__subtitle">Your commercialization advisor — built on DHW's methodology and years of medtech market experience.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="chat-widget-page">
            <HelenChat />
          </div>
          <p style={{
            textAlign: 'center',
            color: 'var(--color-text-faint)',
            fontSize: 'var(--text-sm)',
            marginTop: 'var(--space-6)',
            lineHeight: '1.6'
          }}>
            Helen is an AI advisor — not a substitute for professional consulting.<br />
            For tailored guidance, <a href="https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>schedule a call</a> with our team.
          </p>
        </div>
      </section>
    </main>
  )
}
