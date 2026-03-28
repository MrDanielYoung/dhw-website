import { useEffect, useRef, useState } from 'react'

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

function shouldLoadVideo(): boolean {
  if (typeof navigator === 'undefined') return true
  const conn = (navigator as any).connection
  if (conn) {
    // Skip video on slow connections or data-saver mode
    if (conn.saveData) return false
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return false
  }
  return true
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if (!shouldLoadVideo()) return

    const mobile = isMobile()
    const videoSrc = mobile
      ? '/assets/images/hero-video-sm.mp4'
      : '/assets/images/hero-video.mp4'

    // Delay video load — poster handles the initial view
    const delay = mobile ? 2500 : 1500
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = videoSrc
        videoRef.current.load()
        videoRef.current.play().then(() => {
          setVideoLoaded(true)
        }).catch(() => {})
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* High-priority poster image for fast LCP */}
      <img
        src="/assets/images/hero-poster.jpg"
        srcSet="/assets/images/hero-poster-sm.jpg 640w, /assets/images/hero-poster.jpg 1280w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="hero__poster-img"
        fetchPriority="high"
        decoding="async"
        style={{ opacity: videoLoaded ? 0 : 1 }}
      />
      <video
        ref={videoRef}
        className="hero__video"
        muted
        playsInline
        loop
        preload="none"
        style={{ opacity: videoLoaded ? 1 : 0 }}
      />
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 id="hero-heading" className="hero__title">We connect medical innovations to the people who need them most.</h1>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  )
}
