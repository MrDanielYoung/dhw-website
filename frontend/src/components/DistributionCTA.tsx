import { Link } from 'react-router-dom'

export default function DistributionCTA() {
  return (
    <section className="section distribution-cta fade-in">
      <div className="container">
        <div className="distribution-cta__grid">
          <div className="distribution-cta__content">
            <p className="section-label">For Product Companies</p>
            <h2 className="distribution-cta__title">
              We've built digital health operations, turning customer innovations into revenue-generating businesses.
            </h2>
            <p className="distribution-cta__text">
              From standing up entire commercial teams to building the distribution pipelines that get products into hospitals and health systems across the US, UK, and EU, we may be able to do the same for you.
            </p>
            <Link to="/contact" className="cta-btn">
              Let's talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="distribution-cta__image fade-in">
            <img
              src="/assets/images/apple-concussion.jpg"
              alt="Cleveland Clinic concussion app developed by Daniel Young, featured on Apple.com"
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
            />
            <p className="distribution-cta__caption">
              We helped the Cleveland Clinic develop and commercialize digital health apps, including their concussion monitoring app featured by Apple in 2014
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
