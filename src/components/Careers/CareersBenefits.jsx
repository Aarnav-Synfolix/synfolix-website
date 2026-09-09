import { useInViewOnce } from '../../hooks/useInViewOnce'
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
      className={`careers-benefits reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="benefits"
    >
      <div className="container">
        <h2 className="careers-benefits__heading">Benefits</h2>

        <div className="careers-benefits__grid">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="careers-benefits__card">
              <h3 className="careers-benefits__card-title">{benefit.title}</h3>
              <p className="careers-benefits__card-text">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersBenefits
