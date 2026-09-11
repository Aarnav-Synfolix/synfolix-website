import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './EmployeeExperience.css'

const EXPERIENCE_POINTS = [
  {
    title: 'Thoughtful Onboarding',
    description: 'Ramp up on real projects from week one, paired with someone who knows the codebase.',
  },
  {
    title: 'Regular Growth Conversations',
    description: 'Career growth and feedback aren’t left to a single annual review.',
  },
  {
    title: 'Flexible, Remote-Friendly Work',
    description: 'Work where and how you’re most effective, day to day.',
  },
  {
    title: 'Team Events & Offsites',
    description: 'Periodic in-person time to stay connected as a distributed team.',
  },
]

function EmployeeExperience() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`employee-experience blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="employee-experience"
    >
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Employee Experience</span>
          <h2 className="section-heading">What day-to-day actually feels like.</h2>
        </div>

        <div className="employee-experience__grid">
          {EXPERIENCE_POINTS.map((point, index) => (
            <SpotlightCard
              key={point.title}
              className={`employee-experience__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="employee-experience__card-title">{point.title}</h3>
              <p className="employee-experience__card-text">{point.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmployeeExperience
