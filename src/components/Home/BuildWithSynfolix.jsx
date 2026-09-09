import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './BuildWithSynfolix.css'

const JOURNEY_STEPS = ['Idea', 'Strategy', 'Design', 'Development', 'Testing', 'Launch', 'Scale']

const CAPABILITIES = [
  'Custom Software',
  'SaaS Development',
  'Web Development',
  'Mobile Development',
  'AI Solutions',
  'Business Automation',
  'MVP Development',
]

function BuildWithSynfolix() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`build reveal-left ${isVisible ? 'reveal-left--visible' : ''}`} id="solutions">
      <div className="container">
        <h2 className="build__heading">Have an idea? We&rsquo;ll build it with you.</h2>

        <ol className="build__journey">
          {JOURNEY_STEPS.map((step, index) => (
            <li key={step} className="build__step">
              <span className="build__step-number">{index + 1}</span>
              <span className="build__step-label">{step}</span>
              {index < JOURNEY_STEPS.length - 1 && <span className="build__step-connector" />}
            </li>
          ))}
        </ol>

        <div className="build__capabilities">
          {CAPABILITIES.map((capability) => (
            <span key={capability} className="build__pill">
              {capability}
            </span>
          ))}
        </div>

        <div className="build__cta-row">
          <a href="#" className="build__cta" onClick={(event) => event.preventDefault()}>
            Tell Us What You&rsquo;re Building
          </a>
        </div>
      </div>
    </section>
  )
}

export default BuildWithSynfolix
