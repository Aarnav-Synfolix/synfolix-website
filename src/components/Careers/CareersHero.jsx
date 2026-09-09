import './CareersHero.css'

function CareersHero() {
  return (
    <section className="careers-hero">
      <div className="container careers-hero__inner">
        <span className="careers-hero__eyebrow">Careers at Synfolix</span>
        <h1 className="careers-hero__heading">Build software that solves real problems — with us.</h1>
        <p className="careers-hero__subtext">
          We&rsquo;re a small, hands-on team building our own products and shipping platforms for
          businesses across industries. If you want real ownership over real work, we want to
          hear from you.
        </p>
        <a href="#open-positions" className="careers-hero__cta">
          View Open Positions
        </a>
      </div>
    </section>
  )
}

export default CareersHero
