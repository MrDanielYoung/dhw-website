import { Link } from 'react-router-dom'

export default function DistributionCTA() {
  return (
    <section className="section distribution-cta fade-in">
      <div className="container">
        <div className="distribution-cta__inner">
          <p className="section-label">For Product Companies</p>
          <h2 className="distribution-cta__title">
            Getting ready to take your digital health, medtech, or software product to market?
          </h2>
          <p className="distribution-cta__text">
            We may be able to help. Digital Health Works builds distribution pipelines for medical device and digital health companies across the US, UK, and EU.
          </p>
          <Link to="/contact" className="cta-btn">
            Let's talk
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
