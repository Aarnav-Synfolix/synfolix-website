import { useState } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './Industries.css'

const INDUSTRIES = ['Healthcare', 'Legal', 'Education', 'Finance', 'Retail', 'Business', 'Startups', 'Enterprise']
const PREVIEW_COUNT = 6

function Industries() {
  const [showAll, setShowAll] = useState(false)
  const visibleIndustries = showAll ? INDUSTRIES : INDUSTRIES.slice(0, PREVIEW_COUNT)
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`industries reveal-left ${isVisible ? 'reveal-left--visible' : ''}`} id="industries">
      <div className="container">
        <div className="industries__intro">
          <h2 className="industries__heading">Industries We Serve</h2>
          <p className="industries__text">
            Synfolix builds products and platforms tailored to the needs of each industry we work
            with.
          </p>
        </div>

        <div className="industries__grid">
          {visibleIndustries.map((industry) => (
            <a key={industry} href="#" className="industry-card" onClick={(event) => event.preventDefault()}>
              <span className="industry-card__name">{industry}</span>
              <span className="industry-card__arrow">→</span>
            </a>
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
