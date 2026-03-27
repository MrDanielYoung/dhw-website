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
              src="/assets/images/dhw-header-logo-light.png"
              srcSet="/assets/images/dhw-header-logo-light.png 1x, /assets/images/dhw-header-logo-light@2x.png 2x"
              alt="Digital Health Works"
              height="28"
              style={{ display: 'block' }}
            />
          </Link>
          <p className="site-footer__brand-desc">Medical device commercialization and sales for the US and European healthcare markets.</p>
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
          <Link to="/advisor" className="site-footer__link">Meet Helen</Link>
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
