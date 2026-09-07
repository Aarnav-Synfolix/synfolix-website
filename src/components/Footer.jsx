import './Footer.css'

const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact'],
  },
  {
    title: 'Products',
    links: ['All Products', 'Product Categories'],
  },
  {
    title: 'Solutions',
    links: [
      'Custom Software',
      'SaaS Development',
      'Mobile Development',
      'Web Development',
      'AI Solutions',
      'Business Automation',
    ],
  },
  {
    title: 'Industries',
    links: ['Healthcare', 'Legal', 'Education'],
  },
  {
    title: 'Resources',
    links: ['Case Studies', 'Blog', 'Insights'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'],
  },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columns">
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="footer__column">
            <h3 className="footer__title">{section.title}</h3>
            <ul className="footer__list">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <span className="footer__brand">Synfolix</span>
        <span className="footer__copyright">
          © {new Date().getFullYear()} Synfolix. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
