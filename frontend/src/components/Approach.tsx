export default function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="container">
        <div className="approach__grid">
          <div className="approach__left fade-in">
            <p className="section-label">Our Approach</p>
            <h2 className="approach__statement">
              Digital Health Works is a medical device commercialization and sales agency.
            </h2>
            <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: 'var(--text-base)' }}>
              We help medtech, digital health, and life science companies build revenue across the US and Europe — through health economics strategy, market development, and distributor sales.
            </p>
          </div>
          <div className="approach__body fade-in">
            <p>Most medical technologies are built forward: designed, validated, approved, then handed to sales with the assumption that revenue will follow. <strong>It rarely does.</strong></p>
            <p>Healthcare adopts innovation when value is clear, risk is defined, incentives are aligned, and operational impact is understood.</p>
            <p>We take a different approach. <strong>We start from the sale and work backward</strong> — defining the buyer, the value dynamics, and the commercial structure first.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
