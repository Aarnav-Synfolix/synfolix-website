import { useState } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './Industries.css'

const INDUSTRIES = ['Healthcare', 'Legal', 'Education', 'Finance', 'Retail', 'Business', 'Startups', 'Enterprise']
const PREVIEW_COUNT = 6

function Industries() {
  const [showAll, setShowAll] = useState(false)
  const visibleIndustries = showAll ? INDUSTRIES : INDUSTRIES.slice(0, PREVIEW_COUNT)
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`industries blur-fade ${isVisible ? 'blur-fade--visible' : ''}`} id="industries">
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Industries</span>
          <h2 className="section-heading">Built for the way your industry actually works.</h2>
          <p className="section-text">
            Synfolix builds products and platforms tailored to the needs of each industry we work
            with.
          </p>
        </div>

        <div className="industries__grid">
          {visibleIndustries.map((industry, index) => (
            <SpotlightCard
              as="a"
              key={industry}
              href="#"
              className={`industry-card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.06 * (index % PREVIEW_COUNT)}s` }}
              onClick={(event) => event.preventDefault()}
            >
              <span className="industry-card__name">{industry}</span>
              <span className="industry-card__arrow">→</span>
            </SpotlightCard>
          ))}
        </div>

        {!showAll && INDUSTRIES.length > PREVIEW_COUNT && (
          <div className="industries__more">
            <button type="button" className="industries__more-btn" onClick={() => setShowAll(true)}>
              View All Industries
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Industries
