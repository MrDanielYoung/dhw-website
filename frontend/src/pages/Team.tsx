const founders = [
  {
    name: 'Daniel Young',
    role: 'Co-Founder',
    photo: '/assets/team/daniel-young.jpg',
    bio: '18 years of hands-on experience building health technology ventures. Deep understanding of the intersection between technology and commercialization. Daniel started his career in Cleveland in 2006 with a digital product design agency specializing in healthcare, eventually evolving into building digital health ventures and co-founding Digital Health Works.',
  },
  {
    name: 'Romy Benninga',
    role: 'Co-Founder, COO',
    photo: '/assets/team/romy-benninga.png',
    bio: 'Biomedical scientist with over 10 years of industry experience. Expert in commercialization strategies that bring innovative science and technologies to market. From Boston\'s MedTech scene, Romy saw firsthand how life-saving devices struggled to find sustainable revenue — driving her mission to bridge the gap between innovation and market success.',
  },
]

export default function Team() {
  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">Our People</p>
          <h1 className="page-hero__title">Meet the Team</h1>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <p className="section-label">Founders</p>
          <h2 className="section-title">Leadership</h2>
          <div className="founders-list">
            {founders.map((founder) => (
              <div key={founder.name} className="founder-card fade-in">
                <div className="founder-card__photo-wrap">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="founder-card__photo"
                    loading="lazy"
                  />
                </div>
                <div className="founder-card__info">
                  <h3 className="founder-card__name">{founder.name}</h3>
                  <p className="founder-card__role">{founder.role}</p>
                  <p className="founder-card__bio">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
