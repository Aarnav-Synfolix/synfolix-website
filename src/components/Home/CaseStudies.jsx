import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './CaseStudies.css'

const CASE_STUDIES = [
  {
    client: 'Regional Hospital Network',
    industry: 'Healthcare',
    accent: 'indigo',
    problem: 'Manual patient admissions and billing were causing long wait times and revenue leakage.',
    approach: 'Mapped the full patient journey across staff, doctors and billing to design a unified workflow.',
    solution: 'A custom HMS platform covering admissions, prescriptions, billing and discharge in one system.',
    stack: ['React Native', 'Node.js', 'MySQL'],
    outcomes: [
      { metric: '45%', label: 'Faster patient intake' },
      { metric: '3x', label: 'Billing accuracy' },
    ],
  },
  {
    client: 'Multi-Practice Law Firm',
    industry: 'Legal',
    accent: 'amber',
    problem: 'Case files, deadlines and client communication were scattered across emails and spreadsheets.',
    approach: 'Consolidated firm workflows into a single source of truth for cases, documents and deadlines.',
    solution: 'A case management platform with a secure client portal and automated deadline tracking.',
    stack: ['React', 'Express', 'PostgreSQL'],
    outcomes: [
      { metric: '60%', label: 'Less time on admin' },
      { metric: '0', label: 'Missed deadlines since launch' },
    ],
  },
  {
    client: 'National Retail Chain',
    industry: 'Retail',
    accent: 'emerald',
    problem: 'Disconnected inventory and sales data made demand forecasting unreliable.',
    approach: 'Built a data pipeline connecting store, warehouse and sales systems into one analytics layer.',
    solution: 'A custom analytics dashboard with predictive restocking and real-time sales visibility.',
    stack: ['Next.js', 'Python', 'BigQuery'],
    outcomes: [
      { metric: '30%', label: 'Reduction in stockouts' },
      { metric: '2x', label: 'Faster reporting' },
    ],
  },
]

function CaseStudies() {
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <section ref={ref} className={`cases reveal-left ${isVisible ? 'reveal-left--visible' : ''}`} id="our-work">
      <div className="container">
        <div className="cases__intro">
          <h2 className="cases__heading">Our Work</h2>
          <p className="cases__text">
            A look at how Synfolix partners with businesses to turn real problems into working
            software.
          </p>
        </div>

        <div className="cases__list">
          {CASE_STUDIES.map((study) => (
            <article key={study.client} className="case-card">
              <div className={`case-card__panel case-card__panel--${study.accent}`}>
                <span className="case-card__industry">{study.industry}</span>
                <div className="case-card__outcomes">
                  {study.outcomes.map((outcome) => (
                    <div key={outcome.label} className="case-card__outcome">
                      <span className="case-card__outcome-metric">{outcome.metric}</span>
                      <span className="case-card__outcome-label">{outcome.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="case-card__content">
                <h3 className="case-card__client">{study.client}</h3>

                <div className="case-card__block">
                  <span className="case-card__block-label">Problem</span>
                  <p>{study.problem}</p>
                </div>
                <div className="case-card__block">
                  <span className="case-card__block-label">Approach</span>
                  <p>{study.approach}</p>
                </div>
                <div className="case-card__block">
                  <span className="case-card__block-label">Solution</span>
                  <p>{study.solution}</p>
                </div>

                <div className="case-card__stack">
                  {study.stack.map((tech) => (
                    <span key={tech} className="case-card__tech">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
