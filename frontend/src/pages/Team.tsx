const founders = [
  {
    name: 'Daniel Young',
    role: 'Co-Founder',
    photo: '/assets/team/daniel-young.jpg',
    linkedin: 'https://www.linkedin.com/in/mrdanielyoung/',
    bio: '18 years of hands-on experience building health technology ventures. Deep understanding of the intersection between technology and commercialization. Daniel started his career in Cleveland in 2006 with a digital product design agency specializing in healthcare, eventually evolving into building digital health ventures and co-founding Digital Health Works.',
  },
  {
    name: 'Romy Benninga',
    role: 'Co-Founder, COO',
    photo: '/assets/team/romy-benninga.png',
    linkedin: 'https://www.linkedin.com/in/romybenninga/',
    bio: 'Biomedical scientist with over 10 years of industry experience. Expert in commercialization strategies that bring innovative science and technologies to market. From Boston\'s MedTech scene, Romy saw firsthand how life-saving devices struggled to find sustainable revenue — driving her mission to bridge the gap between innovation and market success.',
  },
]

export default function Team() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">Our People</p>
          <h1 className="page-hero__title">Meet the Team</h1>
        </div>
      </section>

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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <p className="founder-card__role" style={{ margin: 0 }}>{founder.role}</p>
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn`} style={{ color: 'var(--color-text-faint)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#0A66C2')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-faint)')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
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
