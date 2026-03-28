import { Link } from 'react-router-dom'

export default function DistributionCTA() {
  return (
    <section className="section distribution-cta fade-in">
      <div className="container">
        <div className="distribution-cta__grid">
          <div className="distribution-cta__content">
            <p className="section-label">For Product Companies</p>
            <h2 className="distribution-cta__title">
              We've built digital health operations inside Mittelstand and corporate companies — turning their innovations into revenue.
            </h2>
            <p className="distribution-cta__text">
              From standing up entire commercial teams to building the distribution pipelines that get products into hospitals and health systems across the US, UK, and EU — we may be able to do the same for you.
            </p>
            <Link to="/contact" className="cta-btn">
              Let's talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="distribution-cta__image fade-in">
            <img
              src="/assets/images/apple-concussion.jpg"
              alt="Cleveland Clinic concussion app built by Daniel Young — featured on Apple.com homepage"
              loading="lazy"
              width={960}
              height={315}
            />
            <p className="distribution-cta__caption">
              We helped Cleveland Clinic commercialize their digital health innovations — including the first generation of DTx from CCF in 2010, and this concussion monitoring app, featured on Apple.com in 2014
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
