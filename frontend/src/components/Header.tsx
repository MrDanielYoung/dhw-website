import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const isActive = (path: string) => location.pathname === path

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`} id="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Digital Health Works — Home">
          <img
            src="/assets/images/dhw-logo-light.svg"
            alt="Digital Health Works"
            height="32"
          />
        </Link>

        {/* Desktop nav — unchanged */}
        <nav className="site-nav site-nav--desktop" aria-label="Main navigation">
          <Link to="/about" className={`site-nav__link${isActive('/about') ? ' site-nav__link--active' : ''}`}>About</Link>
          <Link to="/insights" className={`site-nav__link${isActive('/insights') ? ' site-nav__link--active' : ''}`}>Insights</Link>
          <Link to="/team" className={`site-nav__link${isActive('/team') ? ' site-nav__link--active' : ''}`}>Team</Link>
          <Link to="/meet-helen" className={`site-nav__link${isActive('/meet-helen') ? ' site-nav__link--active' : ''}`}>Meet Helen</Link>
          <Link to="/contact" className={`site-nav__link${isActive('/contact') ? ' site-nav__link--active' : ''}`}>Contact</Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="site-nav__cta">Schedule a Call</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button className="mobile-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile side panel */}
      <div className={`mobile-backdrop${mobileOpen ? ' is-visible' : ''}`} onClick={closeMobile} aria-hidden="true" />
      <aside className={`mobile-panel${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile navigation" role="dialog" aria-modal="true">
        <div className="mobile-panel__header">
          <Link to="/" className="site-header__logo" aria-label="Digital Health Works — Home" onClick={closeMobile}>
            <img
              src="/assets/images/dhw-header-logo-light.png"
              srcSet="/assets/images/dhw-header-logo-light.png 1x, /assets/images/dhw-header-logo-light@2x.png 2x"
              alt="Digital Health Works"
              height="24"
            />
          </Link>
          <button className="mobile-panel__close" aria-label="Close menu" onClick={closeMobile}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <nav className="mobile-panel__nav">
          <Link to="/about" className={`mobile-panel__link${isActive('/about') ? ' mobile-panel__link--active' : ''}`} onClick={closeMobile}>About</Link>
          <Link to="/insights" className={`mobile-panel__link${isActive('/insights') ? ' mobile-panel__link--active' : ''}`} onClick={closeMobile}>Insights</Link>
          <Link to="/team" className={`mobile-panel__link${isActive('/team') ? ' mobile-panel__link--active' : ''}`} onClick={closeMobile}>Team</Link>
          <Link to="/meet-helen" className={`mobile-panel__link${isActive('/meet-helen') ? ' mobile-panel__link--active' : ''}`} onClick={closeMobile}>Meet Helen</Link>
          <Link to="/contact" className={`mobile-panel__link${isActive('/contact') ? ' mobile-panel__link--active' : ''}`} onClick={closeMobile}>Contact</Link>
        </nav>

        <div className="mobile-panel__cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mobile-panel__cta-btn" onClick={closeMobile}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Schedule a Call
          </a>
        </div>

        <div className="mobile-panel__footer">
          <div className="mobile-panel__footer-row">
            <ThemeToggle />
            <a href="https://www.linkedin.com/company/digital-health-works/" target="_blank" rel="noopener noreferrer" className="mobile-panel__social" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <p className="mobile-panel__contact">info@digitalhealthworks.com</p>
        </div>
      </aside>
    </header>
  )
}
