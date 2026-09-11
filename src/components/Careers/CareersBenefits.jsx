import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import './CareersBenefits.css'

const BENEFITS = [
  { title: 'Health Coverage', description: 'Medical coverage for you, with options to extend to your family.' },
  { title: 'Flexible Hours', description: 'Work the hours that suit you, as long as the work gets done.' },
  { title: 'Remote-Friendly', description: 'Work from home, the office, or a mix of both.' },
  { title: 'Learning Budget', description: 'An annual budget for courses, books and conferences.' },
  { title: 'Equity', description: 'Meaningful equity so you share in what you help build.' },
  { title: 'Paid Time Off', description: 'Real time off, taken without having to justify it.' },
]

function CareersBenefits() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`careers-benefits blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="benefits"
    >
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Benefits</span>
          <h2 className="section-heading">Taken care of, properly.</h2>
        </div>

        <div className="careers-benefits__grid">
          {BENEFITS.map((benefit, index) => (
            <SpotlightCard
              key={benefit.title}
              className={`careers-benefits__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.06 * index}s` }}
            >
              <h3 className="careers-benefits__card-title">{benefit.title}</h3>
              <p className="careers-benefits__card-text">{benefit.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersBenefits
