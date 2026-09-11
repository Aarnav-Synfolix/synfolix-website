import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SpotlightCard } from '../spotlightCard/spotlightCard'
import { DEPARTMENTS, JOBS } from '../../data/jobs'
import './CareersDepartments.css'

const DEPARTMENT_BLURBS = {
  Engineering: 'Builds and ships the products and platforms Synfolix and its clients run on.',
  'Product & Design': 'Shapes what gets built and makes sure it’s usable, clear and consistent.',
  'AI & Data': 'Builds the models and data pipelines behind Synfolix’s AI-driven features.',
  'Customer Success': 'Makes sure every client gets real value out of what we build for them.',
  'Sales & Marketing': 'Finds and grows the relationships that bring new work to Synfolix.',
}

function CareersDepartments() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`careers-departments blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="departments"
    >
      <div className="container">
        <div className="section-intro">
          <span className="section-eyebrow">Departments</span>
          <h2 className="section-heading">Find where you fit.</h2>
        </div>

        <div className="careers-departments__grid">
          {DEPARTMENTS.map((department, index) => {
            const openCount = JOBS.filter((job) => job.department === department).length
            return (
              <SpotlightCard
                key={department}
                className={`careers-departments__card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
                style={{ transitionDelay: `${0.08 * index}s` }}
              >
                <h3 className="careers-departments__card-title">{department}</h3>
                <p className="careers-departments__card-text">{DEPARTMENT_BLURBS[department]}</p>
                <span className="careers-departments__card-count">
                  {openCount > 0 ? `${openCount} open role${openCount > 1 ? 's' : ''}` : 'No open roles right now'}
                </span>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CareersDepartments
