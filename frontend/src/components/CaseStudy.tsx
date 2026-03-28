export default function CaseStudy() {
  return (
    <section className="section case-study" id="case-study" aria-labelledby="casestudy-heading">
      <div className="container">
        <p className="section-label">Case Study</p>
        <h2 id="casestudy-heading" className="section-title">AccessMRI: From Concept to Commercial Launch</h2>
        <div className="case-study__grid">
          <div className="fade-in">
            <img
              src="/assets/images/accessmri.jpg"
              alt="AccessMRI platform — CIED MRI safety and labeling verification for cardiac implant patients"
              className="case-study__image"
              loading="lazy"
              width={768}
              height={432}
            />
          </div>
          <div className="case-study__content fade-in">
            <p className="case-study__client">Digital Health Platform</p>
            <h3 className="case-study__title">Enabling safe MRI access for patients with cardiac implants</h3>
            <p className="case-study__desc">
              <a href="https://accessmri.io/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontWeight: 600 }}>AccessMRI</a> is a cloud-based SaaS platform for CIED (Cardiac Implantable Electronic Device) MRI safety — providing real-time labeling verification and compatibility assessments to ensure patients with cardiac implants can safely undergo MRI scans.
            </p>
            <p className="case-study__desc">
              Digital Health Works led the full commercialization pathway: product strategy, market positioning, revenue modeling (usage-based pricing aligned to CPT codes), distribution strategy, and US market launch — demonstrating our end-to-end capabilities from initial concept through commercial traction.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ borderLeft: '3px solid var(--color-teal)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.25rem' }}>US &amp; EU</strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Dual-market strategy</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-teal)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.25rem' }}>SaaS</strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Cloud-based on Azure</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-teal)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.25rem' }}>Radiology</strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Imaging centers &amp; hospitals</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-teal)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.25rem' }}>Secure</strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Enterprise-grade infrastructure</span>
              </div>
            </div>
            <a href="https://accessmri.io/" target="_blank" rel="noopener noreferrer" className="case-study__link">
              Learn more about AccessMRI
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
