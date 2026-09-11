import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductCTA.css'

function ProductCTA({ name, heading, text }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-cta blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container product-cta__inner">
        <h2 className="product-cta__heading">{heading ?? `See ${name} for yourself.`}</h2>
        <p className="product-cta__text">{text ?? 'Request a demo and we’ll walk you through it, live.'}</p>
        <a href="/#contact" className="product-cta__button">
          Request a Demo
        </a>
      </div>
    </section>
  )
}

export default ProductCTA
