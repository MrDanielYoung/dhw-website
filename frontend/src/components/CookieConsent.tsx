import { useState, useEffect } from 'react'

declare global {
  interface Window {
    __dhwLoadTracking?: () => void
  }
}

function getConsent(): string | null {
  try {
    return localStorage.getItem('dhw-cookies')
  } catch {
    return null
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getConsent()
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    try { localStorage.setItem('dhw-cookies', 'accepted') } catch {}
    setVisible(false)
    if (window.__dhwLoadTracking) window.__dhwLoadTracking()
  }

  const decline = () => {
    try { localStorage.setItem('dhw-cookies', 'declined') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner__card">
        <div className="cookie-banner__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
            <circle cx="14" cy="7" r="1" fill="currentColor"/>
            <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
            <circle cx="10" cy="15" r="1" fill="currentColor"/>
            <circle cx="6.5" cy="13" r="0.75" fill="currentColor"/>
            <path d="M16 4.5C14.5 5.5 15 7.5 16.5 7.5C18 7.5 18 5.5 19.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="cookie-banner__content">
          <p className="cookie-banner__heading">Have a cookie.</p>
          <p className="cookie-banner__text">
            We use cookies and analytics to improve our site and deliver relevant content. Have one on us.{' '}
            <a href="/privacy" className="cookie-banner__link">Privacy Policy</a>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={decline}>
            No thanks
          </button>
          <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  )
}
