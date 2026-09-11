import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './WhatIsSynfolix.css'

function WhatIsSynfolix() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`what blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <span className="glow-orb what__glow" aria-hidden="true" />
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-heading">
            One team. Two ways to <span className="what__heading-accent">build.</span>
          </h2>
          <p className="section-text">
            Synfolix is a software and technology company. We build and maintain our own suite of
            products, and we partner with businesses to design, develop and scale custom digital
            platforms tailored to their needs.
          </p>
        </div>

        <div className="what__cards">
          <SpotlightCard
            className={`what__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="what__card-index">01</span>
            <span className="what__tag tag">Owned Software</span>
            <h3 className="what__card-title">Our Products</h3>
            <p className="what__card-text">
              Software we build, own and continuously improve — ready to use, built for scale.
            </p>
          </SpotlightCard>

          <SpotlightCard
            className={`what__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="what__card-index">02</span>
            <span className="what__tag tag">Built For You</span>
            <h3 className="what__card-title">Custom Software</h3>
            <p className="what__card-text">
              Platforms designed and engineered from the ground up for your business and industry.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

export default WhatIsSynfolix
