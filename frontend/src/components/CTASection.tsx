const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function CTASection() {
  return (
    <section className="section cta-section fade-in">
      <div className="container text-center">
        <h2 className="cta-section__text">We can help your team build a solid sales operation.</h2>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Schedule a Call
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  )
}
