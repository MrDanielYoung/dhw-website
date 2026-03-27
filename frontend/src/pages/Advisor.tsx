import ChatWidget from '../components/ChatWidget'

export default function Advisor() {
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
            <ChatWidget />
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
