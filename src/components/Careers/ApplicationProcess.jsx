import { useInViewOnce } from '../../hooks/useInViewOnce'
import './ApplicationProcess.css'

const STEPS = ['Apply', 'Screening Call', 'Team Interview', 'Offer', 'Onboarding']

function ApplicationProcess() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`application-process blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="application-process"
    >
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Application Process</span>
          <h2 className="section-heading">A straightforward process.</h2>
          <p className="section-text">
            We aim to get back to every applicant within a few business days at each step.
          </p>
        </div>

        <ol className="application-process__row">
          {STEPS.map((step, index) => (
            <li
              key={step}
              className={`application-step blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <div className="application-step__card card">
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
