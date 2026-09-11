import logo from '../assets/logo3.png'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './Footer.css'

const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: [{ label: 'About' }, { label: 'Careers', href: '/careers' }, { label: 'Contact' }],
  },
  {
    title: 'Products',
    links: [{ label: 'All Products' }, { label: 'Product Categories' }],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Custom Software' },
      { label: 'SaaS Development' },
      { label: 'Mobile Development' },
      { label: 'Web Development' },
      { label: 'AI Solutions' },
      { label: 'Business Automation' },
    ],
  },
  {
    title: 'Industries',
    links: [{ label: 'Healthcare' }, { label: 'Legal' }, { label: 'Education' }],
  },
  {
    title: 'Resources',
    links: [{ label: 'Case Studies' }, { label: 'Blog' }, { label: 'Insights' }],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy Policy' }, { label: 'Terms & Conditions' }, { label: 'Cookie Policy' }],
  },
]

function Footer() {
  const [ref, isVisible] = useInViewOnce()

  return (
    <footer ref={ref} className="footer">
      <span className="footer__glow" aria-hidden="true" />

      <div className="footer__inner">
        <div className={`footer__brand-col blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}>
          <img src={logo} alt="Synfolix" className="footer__logo" />
          <p className="footer__tagline">Digital products and platforms built by Synfolix.</p>
        </div>

        <div className="footer__columns">
          {FOOTER_SECTIONS.map((section) => (
            <div
              key={section.title}
              className={`footer__column blur-fade ${isVisible ? 'blur-fade--visible' : ''}`}
            >
              <h3 className="footer__title">{section.title}</h3>
              <ul className="footer__list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className="footer__link">
                        {link.label}
                      </a>
                    ) : (
                      <a href="#" className="footer__link" onClick={(event) => event.preventDefault()}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <span className="footer__copyright">© {new Date().getFullYear()} Synfolix. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
