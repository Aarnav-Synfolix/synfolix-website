import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductBenefits.css'

function ProductBenefits({ benefits }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-benefits blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <span className="section-eyebrow product-benefits__eyebrow">Benefits</span>
        <h2 className="product-benefits__heading">Business outcomes, not just features.</h2>

        <div className="product-benefits__grid">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`product-benefits__card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="product-benefits__card-title">{benefit.title}</h3>
              <p className="product-benefits__card-text">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductBenefits
