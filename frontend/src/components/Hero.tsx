import { useRef, useEffect } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const show = () => vid.classList.add('is-loaded')
    if (vid.readyState >= 3) {
      show()
    } else {
      vid.addEventListener('loadeddata', show, { once: true })
      return () => vid.removeEventListener('loadeddata', show)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src="/assets/images/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 id="hero-heading" className="hero__title">
          We connect medical innovators{'\n'}to the people{'\n'}who need them the most.
        </h1>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  )
}
