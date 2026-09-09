import { useInViewOnce } from '../../hooks/useInViewOnce'
import './CareersCulture.css'

const VALUES = ['Craftsmanship', 'Ownership', 'Collaboration', 'Curiosity']

function CareersCulture() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <section
      ref={ref}
      className={`careers-culture reveal-left ${isVisible ? 'reveal-left--visible' : ''}`}
      id="culture"
    >
      <div className="container careers-culture__inner">
        <div className="careers-culture__text-col">
          <h2 className="careers-culture__heading">Culture</h2>
          <p className="careers-culture__text">
            We&rsquo;re a small team that cares about doing the work well — not just shipping
            something that technically works. Decisions are made close to the people doing the
            work, and everyone is expected to speak up when something doesn&rsquo;t feel right.
          </p>
        </div>

        <div className="careers-culture__values">
          {VALUES.map((value) => (
            <span key={value} className="careers-culture__pill">
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CareersCulture
