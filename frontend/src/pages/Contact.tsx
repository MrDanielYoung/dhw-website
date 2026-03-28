import { useState } from 'react'

const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.detail || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Connection error. Please try again.')
    }
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">Contact</p>
          <h1 className="page-hero__title">Let's start a conversation</h1>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-section__grid">
            <div className="contact-section__left fade-in">
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title">Let's start a conversation.</h2>
              <p className="section-desc" style={{ marginBottom: 'var(--space-6)' }}>
                We have years of experience with digital health and medical technology ventures.
              </p>
              <p className="section-desc">
                Have a question about commercialization, market access, or how to bring a product to market? Get in touch to schedule a time for a call.
              </p>
            </div>
            <div className="contact-section__right fade-in">
              {status === 'success' ? (
                <div className="native-form__success">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3 className="native-form__success-title">Thank you.</h3>
                  <p className="native-form__success-text">We'll be in touch shortly.</p>
                  <button
                    className="native-form__reset"
                    onClick={() => setStatus('idle')}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="native-form" onSubmit={handleSubmit}>
                  <div className="native-form__row">
                    <div className="native-form__field">
                      <label className="native-form__label" htmlFor="cp-name">Full name *</label>
                      <input
                        className="native-form__input"
                        type="text"
                        id="cp-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>
                    <div className="native-form__field">
                      <label className="native-form__label" htmlFor="cp-email">Email *</label>
                      <input
                        className="native-form__input"
                        type="email"
                        id="cp-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="native-form__row">
                    <div className="native-form__field">
                      <label className="native-form__label" htmlFor="cp-phone">Phone</label>
                      <input
                        className="native-form__input"
                        type="tel"
                        id="cp-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+0 000 000 0000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="native-form__field">
                      <label className="native-form__label" htmlFor="cp-company">Company</label>
                      <input
                        className="native-form__input"
                        type="text"
                        id="cp-company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        autoComplete="organization"
                      />
                    </div>
                  </div>
                  <div className="native-form__field">
                    <label className="native-form__label" htmlFor="cp-message">What can we do for you?</label>
                    <textarea
                      className="native-form__textarea"
                      id="cp-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, product, or question..."
                      rows={5}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="native-form__error">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className="native-form__submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
              <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
                  Or schedule a call directly
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
