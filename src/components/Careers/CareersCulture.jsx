import { useInViewOnce } from '../../hooks/useInViewOnce'
import './CareersCulture.css'

const VALUES = ['Craftsmanship', 'Ownership', 'Collaboration', 'Curiosity']

function CareersCulture() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`careers-culture blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
      id="culture"
    >
      <div className="container careers-culture__inner">
        <div className="careers-culture__text-col">
          <span className="section-eyebrow">Culture</span>
          <h2 className="section-heading">How we actually work.</h2>
          <p className="section-text careers-culture__text">
            We&rsquo;re a small team that cares about doing the work well — not just shipping
            something that technically works. Decisions are made close to the people doing the
            work, and everyone is expected to speak up when something doesn&rsquo;t feel right.
          </p>
        </div>

        <div className="careers-culture__values">
          {VALUES.map((value, index) => (
            <span
              key={value}
              className={`careers-culture__pill blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
              style={{ transitionDelay: `${0.08 * index}s` }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersCulture
