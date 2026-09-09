import { useState } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './Contact.css'

const INDUSTRIES = ['Healthcare', 'Legal', 'Education', 'Finance', 'Retail', 'Business', 'Startup', 'Enterprise', 'Other']
const TIMELINES = ['ASAP', '1-3 months', '3-6 months', '6+ months', 'Not sure yet']

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  buildDescription: '',
  budget: '',
  timeline: '',
  message: '',
}

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [ref, isVisible] = useRevealOnScroll()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={ref} className={`contact reveal-left ${isVisible ? 'reveal-left--visible' : ''}`} id="contact">
      <div className="container">
        <div className="contact__card">
          <div className="contact__inner">
            <div className="contact__form-col">
              <h2 className="contact__heading">Build With Synfolix</h2>
              <p className="contact__subtext">
                Tell us what you&rsquo;re working on and we&rsquo;ll get back to you within one
                business day.
              </p>

              {submitted ? (
                <div className="contact__success">
                  Thanks — your message has been received. Our team will reach out shortly.
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="contact__row">
                    <div className="contact__field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="contact__field">
                      <label htmlFor="company">Company</label>
                      <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="contact__row">
                    <div className="contact__field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="contact__field">
                      <label htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="contact__row">
                    <div className="contact__field">
                      <label htmlFor="industry">Industry</label>
                      <select id="industry" name="industry" value={formData.industry} onChange={handleChange}>
                        <option value="">Select an industry</option>
                        {INDUSTRIES.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="contact__field">
                      <label htmlFor="timeline">Timeline</label>
                      <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}>
                        <option value="">Select a timeline</option>
                        {TIMELINES.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="contact__field">
                    <label htmlFor="buildDescription">What do you want to build?</label>
                    <textarea
                      id="buildDescription"
                      name="buildDescription"
                      rows={3}
                      value={formData.buildDescription}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="budget">Estimated budget (optional)</label>
                    <input id="budget" name="budget" type="text" placeholder="e.g. $10k - $50k" value={formData.budget} onChange={handleChange} />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} />
                  </div>

                  <button type="submit" className="contact__submit">
                    Build With Synfolix
                  </button>
                </form>
              )}
            </div>

            <div className="contact__info-col">
              <div className="contact__info-block">
                <span className="contact__info-label">Email</span>
                <a href="mailto:hello@synfolix.com" className="contact__info-value">
                  hello@synfolix.com
                </a>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-label">Phone</span>
                <a href="tel:+15550100100" className="contact__info-value">
                  +1 (555) 010-0100
                </a>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-label">Office</span>
                <p className="contact__info-value">
                  123 Market Street, Suite 400
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-label">Follow Us</span>
                <div className="contact__social">
                  <a href="#" onClick={(event) => event.preventDefault()}>LinkedIn</a>
                  <a href="#" onClick={(event) => event.preventDefault()}>X / Twitter</a>
                  <a href="#" onClick={(event) => event.preventDefault()}>Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
