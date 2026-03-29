const logos = [
  { src: '/assets/logos/jj.svg', alt: 'Johnson & Johnson' },
  { src: '/assets/logos/ccf.svg', alt: 'Cleveland Clinic' },
  { src: '/assets/logos/bosch.svg', alt: 'Bosch' },
  { src: '/assets/logos/aok.svg', alt: 'AOK Die Gesundheitskasse' },
  { src: '/assets/logos/charite.png', alt: 'Charité Universitätsmedizin Berlin' },
  { src: '/assets/logos/uh.png', alt: 'University Hospitals' },
  { src: '/assets/logos/bih.png', alt: 'Berlin Institute of Health at Charité' },
  { src: '/assets/logos/parker.svg', alt: 'Parker' },
  { src: '/assets/logos/inven2.png', alt: 'Inven2' },
]

export default function Clients() {
  // Double the logos for seamless infinite scroll
  const doubledLogos = [...logos, ...logos]

  return (
    <section className="section clients" id="clients">
      <div className="container">
        <p className="section-label">Trusted By</p>
        <h2 className="section-title" style={{ color: 'var(--color-navy)' }}>Customers and Clients</h2>
        <p className="section-desc">
          We work with medical device and digital health companies that are serious about commercialization in the US and European healthcare markets. Our clients range from early-stage medtech ventures to established healthcare technology companies.
        </p>
      </div>
      <div className="clients__marquee-wrap">
        <div className="clients__marquee">
          {doubledLogos.map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="clients__marquee-item">
              <img
                src={logo.src}
                alt={logo.alt}
                className="clients__logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
