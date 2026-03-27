const ValueIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-6 4 3 5-7" />
  </svg>
)

const MarketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const SalesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36L8.87 8.5a2.13 2.13 0 0 0 0 3h0a2.13 2.13 0 0 0 3 0l2.26-2.21" />
  </svg>
)

const icons = [ValueIcon, MarketIcon, SalesIcon]

const services = [
  {
    title: 'Value Dynamics',
    subtitle: 'Medical Device Value Strategy & Healthcare Market Access',
    desc: 'We analyze the economic, clinical, and institutional forces that determine adoption. This includes reimbursement strategy, budget impact, stakeholder incentives, risk allocation, and executive decision criteria\u2014defining the value framework required for successful medical device commercialization.',
  },
  {
    title: 'Market Development',
    subtitle: 'Go-to-Market Strategy & Market Entry Execution',
    desc: 'We design and implement go-to-market strategy for medical devices and digital health products. This includes positioning, pricing strategy, channel design, distribution models, and strategic partnerships required for scalable healthcare market entry.',
  },
  {
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
          {services.map((s, i) => {
            const Icon = icons[i]
            return (
              <article key={s.title} className="service-card fade-in" itemScope itemType="https://schema.org/Service">
                <div className="service-card__icon">
                  <Icon />
                </div>
                <h3 className="service-card__title" itemProp="name">{s.title}</h3>
                <p className="service-card__subtitle">{s.subtitle}</p>
                <p className="service-card__desc" itemProp="description">{s.desc}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
