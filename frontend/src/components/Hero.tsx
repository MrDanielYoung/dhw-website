const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <video className="hero__video" autoPlay muted playsInline loop preload="auto">
        <source src="/assets/images/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 id="hero-heading" className="hero__title">We connect medical innovations to the people who need them most.</h1>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hero__cta">
          Schedule a Call
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  )
}
