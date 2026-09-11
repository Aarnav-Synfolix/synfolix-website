import { useRef } from 'react'
import './spotlightCard.css'

// A card that follows the cursor with a soft glow and a subtle 3D tilt.
// Use alongside the plain `.card` class (not `.card--interactive` — both set
// `transform`, so they'd fight each other). `as` picks the rendered tag so
// this works for a plain informational div, an <article>, or a link <a>.
export function SpotlightCard({ as: Component = 'div', className = '', tilt = true, children, ...props }) {
  const ref = useRef(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return
    const node = ref.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    node.style.setProperty('--spot-x', `${x}px`)
    node.style.setProperty('--spot-y', `${y}px`)

    if (tilt) {
      const rotateX = (y / rect.height - 0.5) * -6
      const rotateY = (x / rect.width - 0.5) * 6
      node.style.setProperty('--tilt-x', `${rotateX}deg`)
      node.style.setProperty('--tilt-y', `${rotateY}deg`)
    }
  }

  const handleMouseLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--tilt-x', '0deg')
    node.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Component
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="spotlight-card__glow" aria-hidden="true" />
      {children}
    </Component>
  )
}

export default SpotlightCard
