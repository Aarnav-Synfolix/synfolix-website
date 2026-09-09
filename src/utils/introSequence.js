export const LOGO_ANIMATION_MS = 1100
export const HOLD_MS = 700
export const NAVBAR_EXTRA_DELAY_MS = 300

let isRevealed = false
let started = false
const listeners = new Set()

function reveal() {
  if (isRevealed) return
  isRevealed = true
  document.body.style.overflow = ''
  listeners.forEach((listener) => listener(true))
}

export function getIntroRevealed() {
  return isRevealed
}

export function subscribeIntroReveal(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function startIntroSequence() {
  if (started) return
  started = true

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    reveal()
    return
  }

  document.body.style.overflow = 'hidden'
  setTimeout(reveal, LOGO_ANIMATION_MS + HOLD_MS)
}
