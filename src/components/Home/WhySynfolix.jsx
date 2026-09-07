import './WhySynfolix.css'

const PILLARS = [
  {
    title: 'Product Thinking',
    description: 'We approach every build like a product, not just a project — with users in mind.',
  },
  {
    title: 'Built Around Your Business',
    description: 'Solutions shaped around how your business actually works, not a generic template.',
  },
  {
    title: 'Modern Technology',
    description: 'A current, reliable stack chosen for what the problem needs — not trends.',
  },
  {
    title: 'End-to-End Development',
    description: 'From strategy to design, build, testing and launch — one team, start to finish.',
  },
  {
    title: 'Built to Scale',
    description: 'Architecture that holds up as usage, data and complexity grow.',
  },
]

function WhySynfolix() {
  return (
    <section className="why">
      <div className="container">
        <h2 className="why__heading">Why Synfolix?</h2>

        <div className="why__grid">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.title} className="why-card">
              <span className="why-card__index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="why-card__title">{pillar.title}</h3>
              <p className="why-card__description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySynfolix
