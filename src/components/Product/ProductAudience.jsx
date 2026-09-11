import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductAudience.css'

function ProductAudience({ audience, note }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-audience blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Who It&rsquo;s For</span>
          <h2 className="section-heading">Built for everyone in the building.</h2>
          {note && <p className="section-text">{note}</p>}
        </div>

        <div className="product-audience__grid">
          {audience.map((person, index) => (
            <div
              key={person.title}
              className={`product-audience__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="product-audience__title">{person.title}</h3>
              <p className="product-audience__description">{person.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductAudience
