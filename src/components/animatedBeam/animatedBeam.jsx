import { useEffect, useId, useState } from 'react'
import './animatedBeam.css'

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = '#374151',
  pathWidth = 2,
  pathOpacity = 0.4,
  gradientStartColor = 'var(--color-teal-light)',
  gradientStopColor = 'var(--color-teal)',
}) {
  const id = useId()
  const [pathD, setPathD] = useState('')
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const rectA = fromRef.current.getBoundingClientRect()
      const rectB = toRef.current.getBoundingClientRect()

      setSvgDimensions({ width: containerRect.width, height: containerRect.height })

      const startX = rectA.left - containerRect.left + rectA.width / 2
      const startY = rectA.top - containerRect.top + rectA.height / 2
      const endX = rectB.left - containerRect.left + rectB.width / 2
      const endY = rectB.top - containerRect.top + rectB.height / 2
      const controlY = startY - curvature

      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`)
    }

    updatePath()

    const resizeObserver = new ResizeObserver(updatePath)
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    window.addEventListener('resize', updatePath)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePath)
    }
  }, [containerRef, fromRef, toRef, curvature])

  return (
    <svg
      className="animated-beam"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} stroke={`url(#${id})`} strokeWidth={pathWidth} strokeLinecap="round" />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="10%" x2="0%" y1="0%" y2="0%">
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          {!prefersReducedMotion && (
            <>
              <animate
                attributeName="x1"
                from={reverse ? '90%' : '10%'}
                to={reverse ? '-10%' : '110%'}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from={reverse ? '100%' : '0%'}
                to={reverse ? '0%' : '100%'}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  )
}

export default AnimatedBeam
