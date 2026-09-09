import { useInViewOnce } from '../../hooks/useInViewOnce'
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
      className={`careers-why reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="why-synfolix"
    >
      <div className="container">
        <h2 className="careers-why__heading">Why Synfolix</h2>

        <div className="careers-why__grid">
          {REASONS.map((reason) => (
            <div key={reason.title} className="careers-why__card">
              <h3 className="careers-why__card-title">{reason.title}</h3>
              <p className="careers-why__card-text">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersWhy
