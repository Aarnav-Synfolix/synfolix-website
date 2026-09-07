import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './WhatIsSynfolix.css'

function WhatIsSynfolix() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`what reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}>
      <div className="container">
        <div className="what__intro">
          <h2 className="what__heading">What Is Synfolix?</h2>
          <p className="what__text">
            Synfolix is a software and technology company. We build and maintain our own suite of
            products, and we partner with businesses to design, develop and scale custom digital
            platforms tailored to their needs.
          </p>
        </div>

        <div className="what__cards">
          <div className="what__card what__card--products">
            <span className="what__tag">Owned Software</span>
            <h3 className="what__card-title">Our Products</h3>
            <p className="what__card-text">
              Software we build, own and continuously improve — ready to use, built for scale.
            </p>
          </div>

          <div className="what__card what__card--custom">
            <span className="what__tag">Built For You</span>
            <h3 className="what__card-title">Custom Software</h3>
            <p className="what__card-text">
              Platforms designed and engineered from the ground up for your business and industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsSynfolix
