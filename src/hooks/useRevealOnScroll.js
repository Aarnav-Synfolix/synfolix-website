import { useRef } from 'react'
import { useIntroRevealed } from './useIntroRevealed'

export function useRevealOnScroll() {
  const ref = useRef(null)
  const isVisible = useIntroRevealed()
  return [ref, isVisible]
}
