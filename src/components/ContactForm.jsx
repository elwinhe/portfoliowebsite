import { useState } from 'react'
import PropTypes from 'prop-types'

export default function ContactForm({ action = 'https://formspree.io/f/xpwjldgo' }) {
  const [formState, setFormState] = useState({ submitting: false, succeeded: false, error: null })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormState({ submitting: true, succeeded: false, error: null })
    const form = e.target
    const data = new FormData(form)

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) {
        setFormState({ submitting: false, succeeded: true, error: null })
        form.reset()
      } else {
        const responseData = await response.json()
        const errorMessage = responseData?.errors
          ? responseData.errors.map((err) => err.message).join(', ')
          : 'Oops! There was a problem submitting your form'
        setFormState({ submitting: false, succeeded: false, error: errorMessage })
      }
    } catch (_err) {
      setFormState({ submitting: false, succeeded: false, error: 'Oops! There was a problem submitting your form' })
    }
  }

  if (formState.succeeded) {
    return (
      <div className="form-success">
        <h3>Thanks for reaching out!</h3>
        <p>I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" action={action} onSubmit={handleFormSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="name" required></input>
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" required></input>
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" rows="5" required></textarea>
      </label>

      <div className="form-footer">
        <button type="submit" className="btn-primary" disabled={formState.submitting}>
          {formState.submitting ? 'Sending...' : 'Send'}
        </button>

        <div className="social-links">
          <a href="https://instagram.com/elwin.he" target="_blank" rel="noreferrer">
            <img src={new URL('../assets/instagram.webp', import.meta.url).href} alt="Instagram" />
          </a>
          <a href="https://linkedin.com/in/elwinhe" target="_blank" rel="noreferrer">
            <img src={new URL('../assets/linkedin.webp', import.meta.url).href} alt="LinkedIn" />
          </a>
        </div>
      </div>
      {formState.error && <p className="form-error">{formState.error}</p>}
    </form>
  )
}

ContactForm.propTypes = {
  action: PropTypes.string,
}


