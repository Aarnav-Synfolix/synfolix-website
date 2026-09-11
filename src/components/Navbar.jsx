import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { InteractiveHoverButton } from './hoverButton/hoverButton'
import { useIntroRevealed } from '../hooks/useIntroRevealed'
import { NAVBAR_EXTRA_DELAY_MS } from '../utils/introSequence'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const isIntroRevealed = useIntroRevealed()
  const [isRevealed, setIsRevealed] = useState(false)
  const linkRefs = useRef({})
  const indicatorRef = useRef(null)
  const isNavigatingRef = useRef(false)
  const navDebounceRef = useRef(null)

  const beginNavGuard = () => {
    isNavigatingRef.current = true
    if (navDebounceRef.current) clearTimeout(navDebounceRef.current)
    navDebounceRef.current = setTimeout(() => {
      isNavigatingRef.current = false
    }, 150)
  }

  useEffect(() => {
    const onScroll = () => {
      if (isNavigatingRef.current) beginNavGuard()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (navDebounceRef.current) clearTimeout(navDebounceRef.current)
    }
  }, [])

  useEffect(() => {
    // The intro sequence only ever runs on the Home page (LogoIntro/Hero start
    // it) — on any other route there's nothing to wait for, so show the navbar
    // immediately instead of staying hidden forever.
    if (!isHome) {
      setIsRevealed(true)
      return
    }
    if (!isIntroRevealed) return
    const timeoutId = setTimeout(() => setIsRevealed(true), NAVBAR_EXTRA_DELAY_MS)
    return () => clearTimeout(timeoutId)
  }, [isHome, isIntroRevealed])

  useEffect(() => {
    // No section anchors exist outside the Home page, so there's nothing to spy on.
    if (!isHome) return

    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeLink = linkRefs.current[activeHref]
      const indicator = indicatorRef.current
      if (activeLink && indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`
        indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`
        indicator.style.opacity = '1'
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeHref])

  const scrollToContact = () => {
    if (!isHome) {
      window.location.href = '/#contact'
      return
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    setActiveHref('#contact')
    beginNavGuard()
  }

  if (!isHome) {
    return (
      <header className={`navbar ${isRevealed ? 'navbar--revealed' : ''}`}>
        <div className="navbar__left">
          <a href="/#home" className="navbar__brand">
            <img src={logo} alt="Synfolix" className="navbar__logo" />
          </a>
          <a href="/" className="navbar__back">
            ← Home
          </a>
        </div>

        <div className="navbar__actions">
          <InteractiveHoverButton onClick={scrollToContact}>Build With Synfolix</InteractiveHoverButton>
        </div>
      </header>
    )
  }

  return (
    <header className={`navbar ${isRevealed ? 'navbar--revealed' : ''}`}>
      <a
        href="/#home"
        className="navbar__brand"
        onClick={() => {
          setActiveHref('#home')
          beginNavGuard()
          setIsOpen(false)
        }}
      >
        <img src={logo} alt="Synfolix" className="navbar__logo" />
      </a>

      <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={`/${link.href}`}
            ref={(el) => {
              linkRefs.current[link.href] = el
            }}
            className={`navbar__link ${activeHref === link.href ? 'navbar__link--active' : ''}`}
            onClick={() => {
              setActiveHref(link.href)
              beginNavGuard()
              setIsOpen(false)
            }}
          >
            {link.label}
          </a>
        ))}
        <span className="navbar__indicator" ref={indicatorRef} />
        <InteractiveHoverButton
          className="navbar__cta--mobile"
          onClick={() => {
            scrollToContact()
            setIsOpen(false)
          }}
        >
          Build With Synfolix
        </InteractiveHoverButton>
      </nav>

      <div className="navbar__actions">
        <InteractiveHoverButton className="navbar__cta--desktop" onClick={scrollToContact}>
          Build With Synfolix
        </InteractiveHoverButton>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar
