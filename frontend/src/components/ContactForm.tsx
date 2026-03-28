const FORM_URL = 'https://webforms.pipedrive.com/f/clNlO0gqFKcPrsnF0DHuYIsJhoVwaydo8Yf8oWSB4r0ZkSMPnWoHAsmkNFHaSWEzGr'
const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function ContactForm() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-section__grid">
          <div className="contact-section__left fade-in">
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Let's start a conversation.</h2>
            <p className="section-desc" style={{ marginBottom: 'var(--space-6)' }}>
              We have years of experience with digital health and medical technology ventures.
            </p>
            <p className="section-desc">
              Have a question about commercialization, market access, or how to bring a product to market? Get in touch to schedule a time for a call.
            </p>
          </div>
          <div className="contact-section__right fade-in">
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', overflow: 'hidden' }}>
              <iframe
                src={FORM_URL}
                width="100%"
                height="720"
                style={{ border: 'none', background: '#ffffff', display: 'block' }}
                title="Contact Form"
                scrolling="no"
              />
            </div>
            <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
                Or schedule a call directly
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
