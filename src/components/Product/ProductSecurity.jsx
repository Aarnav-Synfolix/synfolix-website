import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductSecurity.css'

function ProductSecurity({ security }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-security blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Security</span>
          <h2 className="section-heading">Built to be trusted with sensitive data.</h2>
        </div>

        <div className="product-security__grid">
          {security.map((item, index) => (
            <div
              key={item.title}
              className={`product-security__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="product-security__title">{item.title}</h3>
              <p className="product-security__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSecurity
