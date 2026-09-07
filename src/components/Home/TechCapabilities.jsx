import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './TechCapabilities.css'

const CAPABILITIES = [
  {
    title: 'Development',
    accent: 'indigo',
    description: 'Engineering across the full stack — built to perform, scale and last.',
    items: ['Web Applications', 'Mobile Apps', 'Backend Systems', 'APIs', 'Cloud Infrastructure'],
  },
  {
    title: 'AI & Automation',
    accent: 'violet',
    description: 'Reducing manual work and unlocking smarter decisions with applied AI.',
    items: ['Predictive Models', 'Process Automation', 'Intelligent Workflows', 'NLP & Data Extraction'],
  },
  {
    title: 'Analytics',
    accent: 'emerald',
    description: 'Turning raw data into decisions leadership can act on.',
    items: ['Custom Dashboards', 'Reporting & BI', 'Data Pipelines', 'Performance Insights'],
  },
  {
    title: 'Integrations',
    accent: 'sky',
    description: 'Connecting the systems your business already runs on.',
    items: ['Third-Party APIs', 'Payment Gateways', 'CRM / ERP Connectivity', 'Legacy System Integration'],
  },
]

function TechCapabilities() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`tech reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}>
      <div className="container">
        <div className="tech__intro">
          <h2 className="tech__heading">Technology Capabilities</h2>
          <p className="tech__text">
            What we build spans development, intelligence, insight and connectivity — mapped to
            business outcomes, not just tech stacks.
          </p>
        </div>

        <div className="tech__grid">
          {CAPABILITIES.map((capability) => (
            <div key={capability.title} className="tech-card">
              <span className={`tech-card__dot tech-card__dot--${capability.accent}`} />
              <h3 className="tech-card__title">{capability.title}</h3>
              <p className="tech-card__description">{capability.description}</p>
              <ul className="tech-card__items">
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechCapabilities
