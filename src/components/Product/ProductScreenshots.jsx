import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductScreenshots.css'

// Placeholder mockup panels — swap in real product screenshots once available.
function ProductScreenshots({ screenshots }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-screenshots blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Product Screenshots</span>
          <h2 className="section-heading">See it in action.</h2>
        </div>

        <div className="product-screenshots__grid">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.title}
              className={`product-screenshot blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <div className="product-screenshot__frame" aria-hidden="true">
                <div className="product-screenshot__bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="product-screenshot__body">
                  <span className="product-screenshot__block" />
                  <span className="product-screenshot__block" />
                  <span className="product-screenshot__block product-screenshot__block--short" />
                </div>
              </div>
              <h3 className="product-screenshot__title">{screenshot.title}</h3>
              <p className="product-screenshot__description">{screenshot.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductScreenshots
