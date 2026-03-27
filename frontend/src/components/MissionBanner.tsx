export default function MissionBanner() {
  return (
    <section className="mission-banner fade-in" aria-labelledby="mission-heading">
      <div className="mission-banner__accent" aria-hidden="true" />
      <div className="mission-banner__content">
        <p className="mission-banner__label">Our Mission</p>
        <h2 id="mission-heading" className="mission-banner__text">
          To commercialize medical device and digital health innovations in the US and European markets.
        </h2>
      </div>
      <div className="mission-banner__accent mission-banner__accent--bottom" aria-hidden="true" />
    </section>
  )
}
