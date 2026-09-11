import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './ProductIntegrations.css'

function ProductIntegrations({ integrations }) {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`product-integrations blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Integrations</span>
          <h2 className="section-heading">Works with what you already run.</h2>
        </div>

        <div className="product-integrations__grid">
          {integrations.map((integration, index) => (
            <div
              key={integration.title}
              className={`product-integrations__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              <h3 className="product-integrations__title">{integration.title}</h3>
              <p className="product-integrations__description">{integration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductIntegrations
