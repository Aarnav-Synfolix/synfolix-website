import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './ProductShowcase.css'

const PRODUCTS = [
  {
    name: 'Synfolix HMS',
    industry: 'Healthcare',
    href: '/products/synfolix-health',
    description:
      'An EHR and patient management platform that streamlines admissions, billing and clinical workflows for hospitals and clinics.',
    features: ['Patient & appointment management', 'Integrated billing', 'Prescription workflows', 'Role-based access'],
  },
  {
    name: 'Synfolix Legal',
    industry: 'Legal',
    description:
      'A case management platform built for law firms to track cases, documents, deadlines and client communication in one place.',
    features: ['Case & document tracking', 'Deadline reminders', 'Client portal', 'Secure file storage'],
  },
  {
    name: 'Synfolix CRM',
    industry: 'CRM',
    description:
      'A customer relationship platform that helps sales and support teams manage leads, pipelines and conversations at scale.',
    features: ['Lead & pipeline tracking', 'Team collaboration', 'Automation workflows', 'Analytics dashboard'],
  },
  {
    name: 'Synfolix Learn',
    industry: 'Education',
    description:
      'A learning management system for institutions to deliver courses, track progress and manage students and faculty.',
    features: ['Course & content management', 'Progress tracking', 'Attendance & grading', 'Parent/student portals'],
  },
]

function ProductShowcase() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`showcase blur-fade ${isVisible ? 'blur-fade--visible' : ''}`} id="products">
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Our Products</span>
          <h2 className="section-heading">Software we build, own and ship.</h2>
          <p className="section-text">
            Deployed across Healthcare, Legal, CRM and Education — built and maintained in-house,
            not outsourced once it ships.
          </p>
        </div>

        <div className="showcase__grid">
          {PRODUCTS.map((product, index) => (
            <SpotlightCard
              as="article"
              key={product.name}
              className={`product-card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="product-card__mockup">
                <div className="product-card__mockup-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="product-card__mockup-body">
                  <span className="product-card__mockup-block" />
                  <span className="product-card__mockup-block" />
                  <span className="product-card__mockup-block product-card__mockup-block--short" />
                </div>
              </div>

              <span className="product-card__tag tag">{product.industry}</span>
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__description">{product.description}</p>

              <ul className="product-card__features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="product-card__actions">
                {product.href ? (
                  <a href={product.href} className="product-card__link">
                    View Product →
                  </a>
                ) : (
                  <a href="#" className="product-card__link" onClick={(event) => event.preventDefault()}>
                    View Product →
                  </a>
                )}
                <a href="#" className="product-card__demo" onClick={(event) => event.preventDefault()}>
                  Request Demo
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
