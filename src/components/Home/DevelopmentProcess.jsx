import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './DevelopmentProcess.css'

const PROCESS_STEPS = [
  { title: 'Discover', description: 'Understand your business, users and goals.' },
  { title: 'Define', description: 'Scope the problem and define what success looks like.' },
  { title: 'Design', description: 'Map the experience and the product architecture.' },
  { title: 'Build', description: 'Engineer the solution, sprint by sprint.' },
  { title: 'Launch', description: 'Ship to real users with confidence.' },
  { title: 'Scale', description: 'Grow, optimize and evolve after launch.' },
]

function DevelopmentProcess() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`process blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">How We Work</span>
          <h2 className="section-heading">One lifecycle, start to finish.</h2>
          <p className="section-text">
            A clear, repeatable lifecycle that takes an idea from first conversation to a product
            running at scale.
          </p>
        </div>

        <div className="process__row">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.title}
              className={`process-step blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.06 * index}s` }}
            >
              <div className="process-step__card card">
                <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </div>
              {index < PROCESS_STEPS.length - 1 && (
                <span className="process-step__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DevelopmentProcess
