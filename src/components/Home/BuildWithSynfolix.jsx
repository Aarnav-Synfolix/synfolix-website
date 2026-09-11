import { useRef } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { AnimatedBeam } from '../animatedBeam/animatedBeam'
import { Marquee } from '../marquee/marquee'
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
  const journeyRef = useRef(null)
  const stepNodeRefs = useRef([])

  const getStepRef = (index) => {
    if (!stepNodeRefs.current[index]) {
      stepNodeRefs.current[index] = { current: null }
    }
    return stepNodeRefs.current[index]
  }

  return (
    <section ref={ref} className={`build blur-fade ${isVisible ? 'blur-fade--visible' : ''}`} id="solutions">
      <div className="container">
        <span className="section-eyebrow build__eyebrow">Solutions</span>
        <h2 className="build__heading">Have an idea? We&rsquo;ll build it with you.</h2>

        <div className="build__journey" ref={journeyRef}>
          <ol className="build__journey-list">
            {JOURNEY_STEPS.map((step, index) => (
              <li key={step} className="build__step">
                <span
                  className="build__step-number"
                  ref={(el) => {
                    getStepRef(index).current = el
                  }}
                >
                  {index + 1}
                </span>
                <span className="build__step-label">{step}</span>
              </li>
            ))}
          </ol>

          {JOURNEY_STEPS.slice(0, -1).map((step, index) => (
            <AnimatedBeam
              key={step}
              containerRef={journeyRef}
              fromRef={getStepRef(index)}
              toRef={getStepRef(index + 1)}
              duration={5}
              delay={index * 0.3}
            />
          ))}
        </div>

        <Marquee
          className="build__capabilities"
          items={CAPABILITIES}
          duration={20}
          renderItem={(capability) => <span className="build__pill">{capability}</span>}
        />

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
