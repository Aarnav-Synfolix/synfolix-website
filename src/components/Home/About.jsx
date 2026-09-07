import './About.css'

const STATS = [
  { value: '4+', label: 'Industries served' },
  { value: '10+', label: 'Products & platforms shipped' },
  { value: '100%', label: 'In-house engineering team' },
]

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__intro">
          <h2 className="about__heading">About Synfolix</h2>
          <p className="about__text">
            Synfolix is a software and technology company built by people who care about solving
            real problems, not just shipping code. We build our own products and partner closely
            with businesses to build theirs — carrying the same product thinking into every
            engagement.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__card">
            <span className="about__label">Our Vision</span>
            <p>
              A future where every business, regardless of size, has access to software built as
              well as the biggest tech companies build their own.
            </p>
          </div>
          <div className="about__card">
            <span className="about__label">Our Mission</span>
            <p>
              To design, build and scale digital products that create measurable impact for the
              businesses and industries we work with.
            </p>
          </div>
          <div className="about__card">
            <span className="about__label">Our Team</span>
            <p>
              A hands-on team of engineers, designers and strategists working end-to-end on every
              product we ship — in-house, from first sketch to production.
            </p>
          </div>
        </div>

        <div className="about__stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="about__stat">
              <span className="about__stat-value">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="about__forward">
          We&rsquo;re just getting started — building toward a future where Synfolix products and
          Synfolix-built platforms power businesses across every industry we touch.
        </p>
      </div>
    </section>
  )
}

export default About
