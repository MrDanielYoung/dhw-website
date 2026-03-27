const logos = [
  { src: '/assets/logos/jj.svg', alt: 'Johnson & Johnson', w: 120 },
  { src: '/assets/logos/ccf.svg', alt: 'Cleveland Clinic', w: 120 },
  { src: '/assets/logos/bosch.svg', alt: 'Bosch', w: 100 },
  { src: '/assets/logos/aok.svg', alt: 'AOK Die Gesundheitskasse', w: 100 },
  { src: '/assets/logos/charite.png', alt: 'Charité Universitätsmedizin Berlin', w: 120 },
  { src: '/assets/logos/uh.png', alt: 'University Hospitals', w: 120 },
  { src: '/assets/logos/bih.png', alt: 'Berlin Institute of Health at Charité', w: 120 },
  { src: '/assets/logos/parker.svg', alt: 'Parker', w: 100 },
  { src: '/assets/logos/inven2.png', alt: 'Inven2', w: 100 },
]

export default function Clients() {
  return (
    <section className="section clients" id="clients">
      <div className="container">
        <p className="section-label">Trusted By</p>
        <h2 className="section-title" style={{ color: 'var(--color-navy)' }}>Customers and Clients</h2>
        <p className="section-desc">
          We work with medical device and digital health companies that are serious about commercialization in the US and European healthcare markets. Our clients range from early-stage medtech ventures to established healthcare technology companies.
        </p>
        <div className="clients__grid fade-in">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="clients__logo"
              loading="lazy"
              width={logo.w}
              height={40}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
