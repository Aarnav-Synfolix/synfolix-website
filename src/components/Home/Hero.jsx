import LogoIntro from './LogoIntro'
import GhostFibers from '../ghostFibres/ghostFibres'
import { useIntroRevealed } from '../../hooks/useIntroRevealed'
import './Hero.css'

function Hero() {
  const isRevealed = useIntroRevealed()

  return (
    <section className="hero" id="home">
      <LogoIntro />

      <div className={`hero__reveal ${isRevealed ? 'hero__reveal--visible' : ''}`}>
        <div className="hero__bg" aria-hidden="true">
          <GhostFibers
            lineColor="#0f7c86"
            glowColor="#0b5c63"
            speed={0.2}
            scale={2}
            rotation={0}
            rotationSpeed={0.14}
            layers={4}
            waveAmplitude={0.015}
            waveFrequency={3}
            waveSpeed={0.15}
            layerSpeed={0.08}
            twist={0.1}
            twistFrequency={5}
            twistSpeed={0.1}
            lineFrequency={5}
            lineSpacing={2}
            lineSharpness={16}
            glowFalloff={10}
            glowIntensity={0.7}
            brightness={0.5}
            blueBoost={1.25}
            vignette={0.71}
            grain={0.05}
            dpr={1}
            lightMode={false}
            fps={30}
            paused={false}
          />
        </div>

        <div className="hero__nav-spacer" aria-hidden="true" />

        <div className="hero__reveal-body">
          <div className="container">
            <div className="hero__content">
              <span className="hero__eyebrow">Software, Strategy &amp; Scale</span>

              <h1 className="hero__headline">
                <span className="hero__headline-line hero__headline-line--accent">We Build</span>
                <span className="hero__headline-line hero__headline-line--bold">Digital Products</span>
                <span className="hero__headline-line hero__headline-line--italic">That Scale With You</span>
              </h1>

              <p className="hero__subtext">
                From our own software products to custom platforms built for businesses, Synfolix
                designs, develops and scales digital solutions across industries.
              </p>

              <div className="hero__actions">
                <a href="#products" className="hero__cta hero__cta--primary">
                  Explore Our Products
                </a>
                <a href="#contact" className="hero__cta hero__cta--secondary">
                  Build With Synfolix
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
