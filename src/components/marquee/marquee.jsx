import './marquee.css'

// Infinite horizontal auto-scroll strip. Content is duplicated once so the
// loop is seamless; the duplicate is aria-hidden so screen readers only see
// the list once. Pauses on hover, and under prefers-reduced-motion falls back
// to a static wrapped row (no animation, no duplicate).
export function Marquee({ items, renderItem, duration = 24, className = '' }) {
  const renderContent = renderItem ?? ((item) => item)

  return (
    <div className={`marquee ${className}`.trim()}>
      <div className="marquee__track" style={{ animationDuration: `${duration}s` }}>
        {items.map((item, index) => (
          <span className="marquee__item" key={`a-${index}`}>
            {renderContent(item)}
          </span>
        ))}
        {items.map((item, index) => (
          <span className="marquee__item" key={`b-${index}`} aria-hidden="true">
            {renderContent(item)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
