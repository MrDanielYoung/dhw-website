export default function CaseStudy() {
  return (
    <section className="section case-study" id="case-study">
      <div className="container">
        <p className="section-label">Case Study</p>
        <h2 className="section-title">AccessMRI</h2>
        <div className="case-study__grid">
          <div className="fade-in">
            <img
              src="/assets/images/accessmri.png"
              alt="AccessMRI platform — MRI access for cardiac and neuro implants"
              className="case-study__image"
              loading="lazy"
              width={768}
              height={432}
            />
          </div>
          <div className="case-study__content fade-in">
            <p className="case-study__client">Digital Health Platform</p>
            <h3 className="case-study__title">Enabling MRI access for patients with cardiac implants</h3>
            <p className="case-study__desc">
              <a href="https://accessmri.io/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontWeight: 600 }}>AccessMRI</a> is a digital health platform that enables MRI access for patients with implanted cardiac devices by coordinating eligibility review, documentation, and communication between cardiology and radiology.
            </p>
            <p className="case-study__desc">
              Digital Health Works led US medical device commercialization strategy and guided market launch execution. We developed the US go-to-market plan, aligned the product with hospital workflow and reimbursement realities, structured distribution partnerships, and supported early revenue through direct US sales execution.
            </p>
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
