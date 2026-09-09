import { useInViewOnce } from '../../hooks/useInViewOnce'
import './ApplicationProcess.css'

const STEPS = ['Apply', 'Screening Call', 'Team Interview', 'Offer', 'Onboarding']

function ApplicationProcess() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`application-process reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="application-process"
    >
      <div className="container">
        <h2 className="application-process__heading">Application Process</h2>
        <p className="application-process__text">
          A straightforward process — we aim to get back to every applicant within a few
          business days at each step.
        </p>

        <ol className="application-process__row">
          {STEPS.map((step, index) => (
            <li key={step} className="application-step">
              <div className="application-step__card">
                <span className="application-step__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="application-step__label">{step}</span>
              </div>
              {index < STEPS.length - 1 && (
                <span className="application-step__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ApplicationProcess
