import { useInViewOnce } from '../../hooks/useInViewOnce'
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
      className={`careers-departments reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="departments"
    >
      <div className="container">
        <h2 className="careers-departments__heading">Departments</h2>

        <div className="careers-departments__grid">
          {DEPARTMENTS.map((department) => {
            const openCount = JOBS.filter((job) => job.department === department).length
            return (
              <div key={department} className="careers-departments__card">
                <h3 className="careers-departments__card-title">{department}</h3>
                <p className="careers-departments__card-text">{DEPARTMENT_BLURBS[department]}</p>
                <span className="careers-departments__card-count">
                  {openCount > 0 ? `${openCount} open role${openCount > 1 ? 's' : ''}` : 'No open roles right now'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CareersDepartments
