import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductHero.css'

function ProductHero({ name, industry, tagline, description }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-hero blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container product-hero__inner">
        <div className="product-hero__content">
          <span className="section-eyebrow">{industry}</span>
          <h1 className="product-hero__name">{name}</h1>
          <p className="product-hero__tagline">{tagline}</p>
          <p className="product-hero__description">{description}</p>

          <div className="product-hero__actions">
            <a href="/#contact" className="product-hero__cta product-hero__cta--primary">
              Request a Demo
            </a>
            <a href="#features" className="product-hero__cta product-hero__cta--secondary">
              See Features
            </a>
          </div>
        </div>

        <div className="product-hero__visual" aria-hidden="true">
          <div className="product-hero__mockup">
            <div className="product-hero__mockup-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="product-hero__mockup-body">
              <span className="product-hero__mockup-block" />
              <span className="product-hero__mockup-block" />
              <span className="product-hero__mockup-block product-hero__mockup-block--short" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductHero
