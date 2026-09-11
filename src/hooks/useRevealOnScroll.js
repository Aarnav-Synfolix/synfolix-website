import { useInViewOnce } from './useInViewOnce'

// Reverted from the Hero-synced version: each section now reveals
// independently when it scrolls into view, once. The synced "everything pops
// in with Hero" rule has been retired in favor of real per-section (and
// per-card, via stagger) scroll-triggered entrance animation. Same underlying
// implementation Footer already uses.
export function useRevealOnScroll(options) {
  return useInViewOnce(options)
}
