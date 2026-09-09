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
      className={`open-positions reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="open-positions"
    >
      <div className="container">
        <div className="open-positions__header">
          <h2 className="open-positions__heading">Open Positions</h2>

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
            {visibleJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card__info">
                  <h3 className="job-card__title">{job.title}</h3>
                  <div className="job-card__meta">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@synfolix.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  className="job-card__apply"
                >
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
