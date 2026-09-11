import { useEffect, useState } from 'react'

// Animates the leading number in a value like "100%" or "4+" from 0 up to its
// target once `isActive` flips true, preserving whatever suffix follows it.
export function useCountUp(value, isActive, duration = 1200) {
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive || !match) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    let frameId
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(target * progress))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isActive, target, duration])

  return match ? `${count}${suffix}` : suffix
}
