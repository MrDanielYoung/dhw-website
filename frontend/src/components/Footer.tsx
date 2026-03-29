import { Link } from 'react-router-dom'

const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-header__logo" style={{ marginBottom: 'var(--space-2)' }} aria-label="Digital Health Works">
            <img
              src="/assets/images/dhw-logo-light.svg"
              alt="Digital Health Works"
              height="28"
              style={{ display: 'block' }}
            />
          </Link>
          <p className="site-footer__brand-desc">Value Dynamics<br />Market Development<br />Sales</p>
          <a href="https://www.linkedin.com/company/digital-health-works/" target="_blank" rel="noopener noreferrer" className="site-footer__social" aria-label="Digital Health Works on LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
        <div>
          <p className="site-footer__col-title">Company</p>
          <Link to="/about" className="site-footer__link">About</Link>
          <Link to="/team" className="site-footer__link">Team</Link>
          <Link to="/" className="site-footer__link" onClick={() => setTimeout(() => scrollToSection('clients'), 100)}>Clients</Link>
          <Link to="/" className="site-footer__link" onClick={() => setTimeout(() => scrollToSection('case-study'), 100)}>Case Study</Link>
        </div>
        <div>
          <p className="site-footer__col-title">Resources</p>
          <Link to="/insights" className="site-footer__link">Insights</Link>
          <Link to="/meet-helen" className="site-footer__link">Meet Helen</Link>
          <a href="https://accessmri.io/" target="_blank" rel="noopener noreferrer" className="site-footer__link">AccessMRI</a>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="site-footer__link">Schedule Meeting</a>
        </div>
        <div>
          <p className="site-footer__col-title">Legal</p>
          <Link to="/imprint" className="site-footer__link">Imprint</Link>
          <Link to="/privacy" className="site-footer__link">Privacy Policy</Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p className="site-footer__copy">&copy; 2026 Digital Health Works Inc.</p>
      </div>
    </footer>
  )
}
