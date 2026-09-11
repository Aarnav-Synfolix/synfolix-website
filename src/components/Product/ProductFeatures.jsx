import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './ProductFeatures.css'

function ProductFeatures({ features }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-features blur-fade ${isVisible ? 'blur-fade--visible' : ''}`} id="features">
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Features</span>
          <h2 className="section-heading">Everything the job needs.</h2>
        </div>

        <div className="product-features__grid">
          {features.map((feature, index) => (
            <SpotlightCard
              key={feature.title}
              className={`product-feature card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.06 * index}s` }}
            >
              <h3 className="product-feature__title">{feature.title}</h3>
              <ul className="product-feature__items">
                {feature.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductFeatures
