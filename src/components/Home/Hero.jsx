import { useEffect, useState } from 'react'
import LogoIntro from './LogoIntro'
import { HERO_PIN_VH, HERO_REVEAL_AT, getHeroProgress } from '../../utils/heroScroll'
import './Hero.css'

function Hero() {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    let ticking = false
    let revealed = false

    const check = () => {
      ticking = false
      if (revealed) return
      if (getHeroProgress() >= HERO_REVEAL_AT) {
        revealed = true
        window.removeEventListener('scroll', onScroll)
        setIsRevealed(true)
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

  return (
    <section className="hero" id="home">
      <div className="hero__pin-wrapper" style={{ height: `${HERO_PIN_VH}vh` }}>
        <div className="hero__pin-frame">
          <LogoIntro />

          <div className={`hero__reveal ${isRevealed ? 'hero__reveal--visible' : ''}`}>
            <div className="hero__nav-spacer" aria-hidden="true" />

            <div className="hero__reveal-body">
              <div className="container hero__inner">
                <div className="hero__content">
                  <h1 className="hero__headline">
                    We build digital products that solve real business problems.
                  </h1>
                  <p className="hero__subtext">
                    From our own software products to custom platforms built for businesses, Synfolix
                    designs, develops and scales digital solutions across industries.
                  </p>
                  <div className="hero__actions">
                    <a href="#" className="hero__cta hero__cta--primary">
                      Explore Our Products
                    </a>
                    <a href="#" className="hero__cta hero__cta--secondary">
                      Build With Synfolix
                    </a>
                  </div>
                </div>

                <div className="hero__visual" aria-hidden="true">
                  <div className="hero__glow hero__glow--one" />
                  <div className="hero__glow hero__glow--two" />

                  <div className="hero__panel">
                    <div className="hero__panel-bar">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="hero__panel-body">
                      <div className="hero__chart">
                        <div className="hero__bar" style={{ height: '40%' }} />
                        <div className="hero__bar" style={{ height: '65%' }} />
                        <div className="hero__bar" style={{ height: '50%' }} />
                        <div className="hero__bar" style={{ height: '85%' }} />
                        <div className="hero__bar" style={{ height: '60%' }} />
                      </div>
                      <div className="hero__lines">
                        <span className="hero__line hero__line--full" />
                        <span className="hero__line" />
                        <span className="hero__line hero__line--short" />
                      </div>
                    </div>
                  </div>

                  <div className="hero__chip hero__chip--top">{'</>'}</div>
                  <div className="hero__chip hero__chip--bottom">API</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
