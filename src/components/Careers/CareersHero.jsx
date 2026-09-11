import { useInViewOnce } from '../../hooks/useInViewOnce'
import './CareersHero.css'

function CareersHero() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section ref={ref} className={`careers-hero blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <span className="glow-orb careers-hero__glow" aria-hidden="true" />
      <div className="container careers-hero__inner">
        <span className="section-eyebrow">Careers at Synfolix</span>
        <h1 className="section-heading">Build software that solves real problems — with us.</h1>
        <p className="section-text">
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
