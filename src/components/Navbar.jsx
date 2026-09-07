import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import { InteractiveHoverButton } from './hoverButton/hoverButton'
import { getHeroProgress, HERO_REVEAL_AT } from '../utils/heroScroll'
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
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const [isRevealed, setIsRevealed] = useState(false)
  const linkRefs = useRef({})
  const indicatorRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let revealed = false
    let timeoutId = null

    const check = () => {
      ticking = false
      if (revealed) return
      if (getHeroProgress() >= HERO_REVEAL_AT) {
        revealed = true
        window.removeEventListener('scroll', onScroll)
        timeoutId = setTimeout(() => setIsRevealed(true), 900)
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
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
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
  }, [])

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
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    setActiveHref('#contact')
  }

  return (
    <header className={`navbar ${isRevealed ? 'navbar--revealed' : ''}`}>
      <a href="#home" className="navbar__brand" onClick={() => setIsOpen(false)}>
        <img src={logo} alt="Synfolix" className="navbar__logo" />
      </a>

      <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            ref={(el) => {
              linkRefs.current[link.href] = el
            }}
            className={`navbar__link ${activeHref === link.href ? 'navbar__link--active' : ''}`}
            onClick={() => {
              setActiveHref(link.href)
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
