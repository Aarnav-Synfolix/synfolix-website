import './ProductShowcase.css'

const PRODUCTS = [
  {
    name: 'Synfolix Health',
    industry: 'Healthcare',
    accent: 'indigo',
    description:
      'An EHR and patient management platform that streamlines admissions, billing and clinical workflows for hospitals and clinics.',
    features: ['Patient & appointment management', 'Integrated billing', 'Prescription workflows', 'Role-based access'],
  },
  {
    name: 'Synfolix Legal',
    industry: 'Legal',
    accent: 'amber',
    description:
      'A case management platform built for law firms to track cases, documents, deadlines and client communication in one place.',
    features: ['Case & document tracking', 'Deadline reminders', 'Client portal', 'Secure file storage'],
  },
  {
    name: 'Synfolix CRM',
    industry: 'CRM',
    accent: 'emerald',
    description:
      'A customer relationship platform that helps sales and support teams manage leads, pipelines and conversations at scale.',
    features: ['Lead & pipeline tracking', 'Team collaboration', 'Automation workflows', 'Analytics dashboard'],
  },
  {
    name: 'Synfolix Learn',
    industry: 'Education',
    accent: 'sky',
    description:
      'A learning management system for institutions to deliver courses, track progress and manage students and faculty.',
    features: ['Course & content management', 'Progress tracking', 'Attendance & grading', 'Parent/student portals'],
  },
]

function ProductShowcase() {
  return (
    <section className="showcase" id="products">
      <div className="container">
        <div className="showcase__intro">
          <h2 className="showcase__heading">Our Products</h2>
          <p className="showcase__text">
            Software Synfolix builds, owns and continuously improves — deployed across
            Healthcare, Legal, CRM and Education.
          </p>
        </div>

        <div className="showcase__grid">
          {PRODUCTS.map((product) => (
            <article key={product.name} className="product-card">
              <div className={`product-card__mockup product-card__mockup--${product.accent}`}>
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

              <span className={`product-card__tag product-card__tag--${product.accent}`}>
                {product.industry}
              </span>
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__description">{product.description}</p>

              <ul className="product-card__features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="product-card__actions">
                <a href="#" className="product-card__link">
                  View Product →
                </a>
                <a href="#" className="product-card__demo">
                  Request Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
