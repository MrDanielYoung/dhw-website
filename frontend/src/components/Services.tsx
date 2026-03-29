const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    ),
    title: 'Value Dynamics',
    subtitle: 'Health Economics & Value Strategy',
    desc: 'We map the economic forces that determine adoption — reimbursement pathways, budget impact, stakeholder incentives, and the value framework procurement committees need to say yes. Every commercial decision starts here.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    title: 'Market Development',
    subtitle: 'Commercial Strategy & Market Entry',
    desc: 'We translate that economic understanding into a commercial strategy — pricing, distribution channels, partner selection, and the evidence packages that hospital value analysis committees require. The result is a go-to-market roadmap with clear milestones.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Distributor Sales',
    subtitle: "Manufacturer's Sales Representation",
    desc: "We act as your sales team in the US and European markets — building pipeline through distribution partners, navigating procurement, closing contracts, and managing customer relationships. Measurable revenue growth, not slide decks.",
  },
]

export default function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <p className="section-label">What We Do</p>
        <h2 id="services-heading" className="section-title">Three pillars of medical device commercialization</h2>
        <p className="section-desc">Health economics, commercial strategy, and direct sales — integrated under one roof.</p>
        <div className="services__grid">
          {services.map((s) => (
            <article key={s.title} className="service-card fade-in" itemScope itemType="https://schema.org/Service">
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title" itemProp="name">{s.title}</h3>
              <p className="service-card__subtitle">{s.subtitle}</p>
              <p className="service-card__desc" itemProp="description">{s.desc}</p>
            </article>
          ))}
        </div>
        <p className="services__icp">For medtech companies, digital health startups, and device manufacturers entering or scaling in the US and European markets.</p>
      </div>
    </section>
  )
}
