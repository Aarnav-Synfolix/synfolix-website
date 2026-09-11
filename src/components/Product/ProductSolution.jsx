import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductSolution.css'

function ProductSolution({ heading, description, points }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-solution blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container product-solution__inner">
        <div className="section-intro product-solution__intro">
          <span className="section-eyebrow">The Solution</span>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-text">{description}</p>
        </div>

        <ul className="product-solution__list">
          {points.map((point) => (
            <li key={point} className="product-solution__item">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductSolution
