import { useEffect, useRef, useState } from 'react'
import { getHeroProgress, HERO_REVEAL_AT } from '../utils/heroScroll'

export function useRevealOnScroll() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    let ticking = false
    let revealed = false

    const check = () => {
      ticking = false
      if (revealed) return
      if (getHeroProgress() >= HERO_REVEAL_AT) {
        revealed = true
        setIsVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(check)
      }
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [ref, isVisible]
}
