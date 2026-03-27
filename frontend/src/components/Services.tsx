const services = [
  {
    number: '01',
    title: 'Value Dynamics',
    subtitle: 'Strategic Consulting & Healthcare Market Access',
    desc: 'Strategic consulting that identifies who will use, buy, and pay for your medical technology. We build validated business models and revenue strategies by working backwards from the point of sale.',
    items: [
      'Revenue modeling and financial forecasting',
      'Pricing strategy and reimbursement mapping',
      'Stakeholder and payer identification',
      'Business plan development for fundraising',
      'Competitive positioning and market sizing',
    ],
  },
  {
    number: '02',
    title: 'Market Development',
    subtitle: 'Go-to-Market Strategy & Market Entry Execution',
    desc: 'We design and implement go-to-market strategy for medical devices and digital health products — positioning, pricing, channel design, distribution models, and strategic partnerships for scalable market entry.',
    items: [
      'Go-to-market planning and positioning',
      'Distribution and channel partner strategy',
      'Hospital value analysis committee preparation',
      'Clinical evidence and health economics arguments',
      'KOL engagement and clinical advisory boards',
    ],
  },
  {
    number: '03',
    title: 'Sales Execution',
    subtitle: "Manufacturer's Sales Representation & Revenue Growth",
    desc: 'Direct sales representation for medical device and digital health companies entering or expanding in the US and European markets. We act as your commercial team on the ground.',
    items: [
      "Manufacturer's sales representation",
      'Hospital and health system account management',
      'Contract negotiation and procurement navigation',
      'Sales enablement and training development',
      'Pipeline management and revenue tracking',
    ],
  },
]

export default function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <p className="section-label">What We Do</p>
        <h2 id="services-heading" className="section-title">Three pillars of medical device commercialization</h2>
        <p className="section-desc">Strategy, market development, and sales execution — integrated capabilities that take your medical technology from validated concept to commercial traction.</p>
        <div className="services__grid">
          {services.map((s) => (
            <article key={s.number} className="service-card fade-in" itemScope itemType="https://schema.org/Service">
              <div className="service-card__number">{s.number}</div>
              <h3 className="service-card__title" itemProp="name">{s.title}</h3>
              <p className="service-card__subtitle">{s.subtitle}</p>
              <p className="service-card__desc" itemProp="description">{s.desc}</p>
              {s.items && (
                <ul className="service-card__list">
                  {s.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
