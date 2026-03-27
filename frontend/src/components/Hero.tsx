import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Delay video load until after page is interactive
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = '/assets/images/hero-video.mp4'
        videoRef.current.load()
        videoRef.current.play().catch(() => {})
        setVideoLoaded(true)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div
        className="hero__poster"
        style={{
          backgroundImage: 'url(/assets/images/hero-poster.jpg)',
          opacity: videoLoaded ? 0 : 1,
        }}
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
