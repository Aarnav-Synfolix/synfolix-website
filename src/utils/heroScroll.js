export const HERO_PIN_VH = 300
export const LOGO_REVEAL_END = 0.5
export const HERO_REVEAL_AT = 1

export function getHeroPinDistance() {
  return ((HERO_PIN_VH - 100) / 100) * window.innerHeight
}

export function getHeroProgress() {
  const distance = getHeroPinDistance()
  if (distance <= 0) return 1
  return Math.min(Math.max(window.scrollY / distance, 0), 1)
}
