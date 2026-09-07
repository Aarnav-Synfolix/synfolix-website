import { useEffect, useRef } from 'react'
import logo from '../../assets/logo2.png'
import { getHeroProgress, LOGO_REVEAL_END } from '../../utils/heroScroll'
import './LogoIntro.css'

function LogoIntro() {
  const logoRef = useRef(null)
  const cueRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (logoRef.current) {
        logoRef.current.style.transform = 'none'
        logoRef.current.style.opacity = '1'
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = '0'
      }
      return
    }

    let ticking = false

    const update = () => {
      const overall = getHeroProgress()
      const reveal = Math.min(overall / LOGO_REVEAL_END, 1)

      if (logoRef.current) {
        const translateY = 45 * (1 - reveal)
        const scale = 0.85 + 0.15 * reveal
        const opacity = 0.25 + 0.75 * reveal
        logoRef.current.style.transform = `translateY(${translateY}vh) scale(${scale})`
        logoRef.current.style.opacity = opacity
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = Math.max(1 - overall / 0.08, 0)
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="logo-intro">
      <img ref={logoRef} src={logo} alt="Synfolix" className="logo-intro__logo" />

      <div ref={cueRef} className="logo-intro__cue">
        <span className="logo-intro__cue-text">Scroll</span>
        <span className="logo-intro__chevron-wrap">
          <span className="logo-intro__chevron" />
        </span>
      </div>
    </div>
  )
}

export default LogoIntro
