export default function About() {
  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">About Us</p>
          <h1 className="page-hero__title">The Backstory of Digital Health Works</h1>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="approach__grid">
            <div className="approach__left fade-in">
              <h2 className="approach__statement" style={{ fontSize: 'var(--text-lg)' }}>
                Romy Benninga and Daniel Young founded Digital Health Works.
              </h2>
              <h2 className="approach__statement" style={{ fontSize: 'var(--text-lg)' }}>
                The agency supports digital health and MedTech ventures to enter the market, finding paths to sustainable revenue.
              </h2>
              <h2 className="approach__statement" style={{ fontSize: 'var(--text-lg)' }}>
                We use the market to connect health innovations with the patients and care providers who need them most.
              </h2>
            </div>
            <div className="approach__body fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
                The Story began in 2006
              </h3>
              <p>The journey of Digital Health Works began in Cleveland in 2006, when Daniel Young started a digital product design agency that specialized in healthcare applications and technologies. His company designed and manufactured hardware and software devices.</p>
              <p>This work evolved from designing new products to building digital health ventures. While both were different in mission, they were commonly linked by frequently encountering regulatory and commercial challenges to bring these products to market.</p>
              <p>In the heart of Boston's MedTech scene, where life-saving, yet complex devices struggled to find their fit in the market and generate sustainable revenue, Romy Benninga experienced the same challenges.</p>
              <p>Too many innovative MedTech ventures were failing because they lacked access to resources that could help.</p>
              <p>Motivated by these missed opportunities, and the pain of seeing incredible technologies go to waste, Romy and Daniel committed to a mission to create an agency that would offload the 'tedious' yet necessary market access, commercialization, and sales work, and allow bold, innovative founders to focus on building their teams, companies, and products.</p>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-text)', marginTop: 'var(--space-8)' }}>
                Digital Health Works was founded in 2023
              </h3>
              <p>Since then, Digital Health Works has put together a team of experts, a database of knowledge and a network of partners to work hand-in-hand with innovators, ensuring the success of not only their products but also their businesses as a whole.</p>
              <p>Positioned as a Manufacturer's Sales Rep Agency — not just consulting, but actually selling and distributing DTx, software, and SaMD products in the US and European healthcare markets.</p>
              <p>Our experience in developing clinical and non-clinical medical products has given us a unique understanding of the efforts required to create a product and the formidable challenges of introducing it to the market.</p>
              <p>The agency's goal is to bring digital health and MedTech innovations to market, connecting them with the people who need them the most.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
