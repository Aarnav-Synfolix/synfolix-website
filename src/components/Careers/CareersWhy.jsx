import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './CareersWhy.css'

const REASONS = [
  {
    title: 'Real Ownership',
    description: 'You own features end-to-end — from first conversation to what ships to users, not just tickets pulled off a board.',
  },
  {
    title: 'Modern, Practical Stack',
    description: 'We pick tools for the job, not for the resume. No legacy sludge to wade through before you can be useful.',
  },
  {
    title: 'Work Across Industries',
    description: 'Healthcare, legal, education, CRM — you’ll work on real problems across multiple industries, not one narrow vertical.',
  },
  {
    title: 'Small Teams, Direct Impact',
    description: 'Small teams mean your work ships fast and is used by real people quickly — no work disappearing into a backlog.',
  },
]

function CareersWhy() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`careers-why blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="why-synfolix"
    >
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Why Synfolix</span>
          <h2 className="section-heading">A place to do work that matters.</h2>
        </div>

        <div className="careers-why__grid">
          {REASONS.map((reason, index) => (
            <SpotlightCard
              key={reason.title}
              className={`careers-why__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="careers-why__card-title">{reason.title}</h3>
              <p className="careers-why__card-text">{reason.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersWhy
