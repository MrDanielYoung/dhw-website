import { useState, useEffect } from 'react'
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

  const isActive = (path: string) => location.pathname === path

  const handleAdvisorClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById('advisor')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`} id="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Digital Health Works — Home">
          <img
            src="/assets/images/dhw-header-logo-light.png"
            srcSet="/assets/images/dhw-header-logo-light.png 1x, /assets/images/dhw-header-logo-light@2x.png 2x"
            alt="Digital Health Works"
            height="32"
          />
        </Link>

        <nav className={`site-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <Link to="/about" className={`site-nav__link${isActive('/about') ? ' site-nav__link--active' : ''}`}>About</Link>
          <Link to="/insights" className={`site-nav__link${isActive('/insights') ? ' site-nav__link--active' : ''}`}>Insights</Link>
          <Link to="/team" className={`site-nav__link${isActive('/team') ? ' site-nav__link--active' : ''}`}>Team</Link>
          <Link to="/advisor" className={`site-nav__link${isActive('/advisor') ? ' site-nav__link--active' : ''}`}>Meet Helen</Link>
          <Link to="/contact" className={`site-nav__link${isActive('/contact') ? ' site-nav__link--active' : ''}`}>Contact</Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="site-nav__cta">Schedule a Call</a>
          <div className="theme-toggle-mobile"><ThemeToggle /></div>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button className="mobile-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
