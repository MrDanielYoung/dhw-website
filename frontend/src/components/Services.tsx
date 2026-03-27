const services = [
  {
    number: '01',
    title: 'Value Dynamics',
    subtitle: 'Medical Device Value Strategy & Healthcare Market Access',
    desc: 'We analyze the economic, clinical, and institutional forces that determine adoption. This includes reimbursement strategy, budget impact, stakeholder incentives, risk allocation, and executive decision criteria\u2014defining the value framework required for successful medical device commercialization.',
  },
  {
    number: '02',
    title: 'Market Development',
    subtitle: 'Go-to-Market Strategy & Market Entry Execution',
    desc: 'We design and implement go-to-market strategy for medical devices and digital health products. This includes positioning, pricing strategy, channel design, distribution models, and strategic partnerships required for scalable healthcare market entry.',
  },
  {
    number: '03',
    title: 'Sales',
    subtitle: 'Direct Medtech Sales & Revenue Execution',
    desc: 'We provide direct sales execution for medical device and digital health companies. We build pipeline, engage hospital and health system decision-makers, manage procurement processes, and close contracts, driving measurable revenue growth in the US and Europe.',
  },
]

export default function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <p className="section-label">What We Do</p>
        <h2 id="services-heading" className="section-title">Three pillars of medical device commercialization</h2>
        <div className="services__grid">
          {services.map((s) => (
            <article key={s.number} className="service-card fade-in" itemScope itemType="https://schema.org/Service">
              <div className="service-card__number">{s.number}</div>
              <h3 className="service-card__title" itemProp="name">{s.title}</h3>
              <p className="service-card__subtitle">{s.subtitle}</p>
              <p className="service-card__desc" itemProp="description">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
