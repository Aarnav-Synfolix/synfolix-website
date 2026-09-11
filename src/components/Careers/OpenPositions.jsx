import { useState } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { DEPARTMENTS, JOBS } from '../../data/jobs'
import './OpenPositions.css'

const ALL_DEPARTMENTS = 'All Departments'

function OpenPositions() {
  const [ref, isVisible] = useInViewOnce()
  const [department, setDepartment] = useState(ALL_DEPARTMENTS)

  const visibleJobs = department === ALL_DEPARTMENTS ? JOBS : JOBS.filter((job) => job.department === department)

  return (
    <section
      ref={ref}
      className={`open-positions blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="open-positions"
    >
      <div className="container">
        <div className="open-positions__header">
          <div className="section-intro open-positions__intro">
            <span className="section-eyebrow">Open Positions</span>
            <h2 className="section-heading">Current openings.</h2>
          </div>

          <select
            className="open-positions__filter"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value={ALL_DEPARTMENTS}>{ALL_DEPARTMENTS}</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {visibleJobs.length === 0 ? (
          <p className="open-positions__empty">No open roles in this department right now — check back soon.</p>
        ) : (
          <div className="open-positions__list">
            {visibleJobs.map((job, index) => (
              <div
                key={job.id}
                className={`job-card card blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
                style={{ transitionDelay: `${0.06 * index}s` }}
              >
                <div className="job-card__info">
                  <h3 className="job-card__title">{job.title}</h3>
                  <div className="job-card__meta">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <a href="#" className="job-card__apply" onClick={(event) => event.preventDefault()}>
                  Apply
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default OpenPositions
