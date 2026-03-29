const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function CTASection() {
  return (
    <section className="section cta-section fade-in" aria-labelledby="cta-heading">
      <div className="container text-center">
        <h2 id="cta-heading" className="cta-section__text">Ready to bring your innovation to market?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto var(--space-6)', opacity: 0.85 }}>Whether you are a startup building your first go-to-market plan or an established manufacturer entering a new market, we would like to hear about your product.</p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Schedule a Call
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  )
}
