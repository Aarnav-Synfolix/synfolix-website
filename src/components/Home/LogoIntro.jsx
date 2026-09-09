import { useEffect, useRef } from 'react'
import logo from '../../assets/logo2.png'
import { LOGO_ANIMATION_MS, startIntroSequence } from '../../utils/introSequence'
import './LogoIntro.css'

function LogoIntro() {
  const logoRef = useRef(null)

  useEffect(() => {
    startIntroSequence()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const frame = requestAnimationFrame(() => {
      logoRef.current?.classList.add('logo-intro__logo--in')
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="logo-intro">
      <img
        ref={logoRef}
        src={logo}
        alt="Synfolix"
        className="logo-intro__logo"
        style={{ transitionDuration: `${LOGO_ANIMATION_MS}ms` }}
      />
    </div>
  )
}

export default LogoIntro
