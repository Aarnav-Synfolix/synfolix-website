import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductProblem.css'

function ProductProblem({ heading, description, points }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-problem blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container product-problem__inner">
        <div className="section-intro product-problem__intro">
          <span className="section-eyebrow">The Problem</span>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-text">{description}</p>
        </div>

        <ul className="product-problem__list">
          {points.map((point) => (
            <li key={point} className="product-problem__item">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductProblem
