import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { useCountUp } from '../../hooks/useCountUp'
import './About.css'

const STATS = [
  { value: '4+', label: 'Industries served' },
  { value: '10+', label: 'Products & platforms shipped' },
  { value: '100%', label: 'In-house engineering team' },
]

function StatItem({ value, label, isActive }) {
  const display = useCountUp(value, isActive)

  return (
    <div className="about__stat">
      <span className="about__stat-value">{display}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

function About() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`about blur-fade ${isVisible ? 'blur-fade--visible' : ''}`} id="about">
      <div className="container">
        <div className="section-intro about__intro">
          <span className="section-eyebrow">About Synfolix</span>
          <h2 className="section-heading">Built by people who care how it&rsquo;s built.</h2>
          <p className="section-text">
            Synfolix is a software and technology company built by people who care about solving
            real problems, not just shipping code. We build our own products and partner closely
            with businesses to build theirs — carrying the same product thinking into every
            engagement.
          </p>
        </div>

        <div className="about__grid">
          {[
            {
              label: 'Our Vision',
              text: 'A future where every business, regardless of size, has access to software built as well as the biggest tech companies build their own.',
            },
            {
              label: 'Our Mission',
              text: 'To design, build and scale digital products that create measurable impact for the businesses and industries we work with.',
            },
            {
              label: 'Our Team',
              text: 'A hands-on team of engineers, designers and strategists working end-to-end on every product we ship — in-house, from first sketch to production.',
            },
          ].map((card, index) => (
            <div
              key={card.label}
              className={`about__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <span className="about__label">{card.label}</span>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="about__stats">
          <span className="glow-orb about__stats-glow" aria-hidden="true" />
          {STATS.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} isActive={isVisible} />
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
