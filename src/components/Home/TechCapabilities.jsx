import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './TechCapabilities.css'

const CAPABILITIES = [
  {
    title: 'Development',
    description: 'Engineering across the full stack — built to perform, scale and last.',
    items: ['Web Applications', 'Mobile Apps', 'Backend Systems', 'APIs', 'Cloud Infrastructure'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 6 2 12 8 18" />
        <polyline points="16 6 22 12 16 18" />
      </svg>
    ),
  },
  {
    title: 'AI & Automation',
    description: 'Reducing manual work and unlocking smarter decisions with applied AI.',
    items: ['Predictive Models', 'Process Automation', 'Intelligent Workflows', 'NLP & Data Extraction'],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" />
      </svg>
    ),
  },
  {
    title: 'Analytics',
    description: 'Turning raw data into decisions leadership can act on.',
    items: ['Custom Dashboards', 'Reporting & BI', 'Data Pipelines', 'Performance Insights'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="20" x2="4" y2="12" />
        <line x1="12" y1="20" x2="12" y2="6" />
        <line x1="20" y1="20" x2="20" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Integrations',
    description: 'Connecting the systems your business already runs on.',
    items: ['Third-Party APIs', 'Payment Gateways', 'CRM / ERP Connectivity', 'Legacy System Integration'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" opacity="0.45" />
      </svg>
    ),
  },
]

function TechCapabilities() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`tech blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-heading">Development, intelligence, insight, connectivity.</h2>
          <p className="section-text">
            Mapped to business outcomes, not just tech stacks.
          </p>
        </div>

        <div className="tech__grid">
          {CAPABILITIES.map((capability, index) => (
            <SpotlightCard
              key={capability.title}
              className={`tech-card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <span className="tech-card__icon">{capability.icon}</span>
              <h3 className="tech-card__title">{capability.title}</h3>
              <p className="tech-card__description">{capability.description}</p>
              <ul className="tech-card__items">
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechCapabilities
