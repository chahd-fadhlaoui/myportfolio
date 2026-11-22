
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import useAlert from "../hooks/useAlert.js";
import Alert from "../components/Alert.jsx";

const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.ct-root {
  --ct-paper: #f5f0e6;
  --ct-ink: #141414;
  --ct-pink: #ff4fa3;
  --ct-yellow: #ffe45c;
  --ct-line: 2.5px;
  --ct-pad: clamp(1rem, 3vw, 2.25rem);
  --ct-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ct-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* Main shell */
.ct-shell {
  position: relative;
  overflow: hidden;
  overflow: clip;
  padding: var(--ct-pad);
  border: var(--ct-line) solid var(--ct-ink);
  border-radius: 36px;
  color: var(--ct-ink);
  font-family: var(--ct-display);
  background-color: var(--ct-paper);
  background-image: radial-gradient(rgba(20, 20, 20, 0.12) 1px, transparent 1px);
  background-size: 22px 22px;
  box-shadow: 10px 10px 0 var(--ct-pink);
}

/* Header */
.ct-head {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.ct-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ct-mono);
  font-size: 20px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ct-eyebrow::before {
  content: "";
  width: 28px;
  height: var(--ct-line);
  background: var(--ct-ink);
}

.ct-title {
  font-size: clamp(2.3rem, 6vw, 4.2rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.ct-mark {
  background: linear-gradient(transparent 58%, var(--ct-yellow) 58%);
  padding: 0 0.1em;
}

.ct-intro {
  max-width: 55ch;
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.86;
}

/* Contact layout */
.ct-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
}

@media (min-width: 900px) {
  .ct-content {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 3rem;
    align-items: start;
  }
}

/* Contact information */
.ct-info {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.ct-info-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  line-height: 1.1;
}

.ct-info-text {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.82;
}

.ct-info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: var(--ct-line) solid var(--ct-ink);
  border-radius: 18px;
  background: #fff;
  box-shadow: 4px 4px 0 var(--ct-ink);
}

.ct-info-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 2px solid var(--ct-ink);
  border-radius: 13px;
  background: var(--ct-yellow);
  font-size: 1.25rem;
}

.ct-info-label {
  margin-bottom: 0.2rem;
  font-family: var(--ct-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
}

.ct-info-value {
  overflow-wrap: anywhere;
  font-size: 0.95rem;
  font-weight: 700;
}

/* Form card */
.ct-form-card {
  padding: clamp(1.1rem, 3vw, 1.8rem);
  border: var(--ct-line) solid var(--ct-ink);
  border-radius: 24px;
  background: #fff;
  box-shadow: 7px 7px 0 var(--ct-ink);
}

.ct-form-heading {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: 800;
}

.ct-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ct-field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.ct-label {
  font-family: var(--ct-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.ct-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid var(--ct-ink);
  border-radius: 12px;
  outline: none;
  background: var(--ct-paper);
  color: var(--ct-ink);
  font-family: var(--ct-display);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.ct-input::placeholder {
  color: #777;
  opacity: 0.8;
}

.ct-input:focus {
  border-color: var(--ct-pink);
  background: #fff;
  box-shadow: 3px 3px 0 var(--ct-pink);
}

.ct-textarea {
  min-height: 145px;
  resize: vertical;
}

/* Submit button */
.ct-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.95rem 1.2rem;
  border: var(--ct-line) solid var(--ct-ink);
  border-radius: 14px;
  background: var(--ct-yellow);
  box-shadow: 4px 4px 0 var(--ct-ink);
  color: var(--ct-ink);
  font-family: var(--ct-display);
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.2s ease;
}

.ct-submit:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ct-ink);
}

.ct-submit:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--ct-ink);
}

.ct-submit:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.ct-submit-arrow {
  font-size: 1.2rem;
}

.ct-root :is(input, textarea, button):focus-visible {
  outline: 3px solid var(--ct-pink);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .ct-input,
  .ct-submit {
    transition: none;
  }
}
`;

const Contact = () => {
  const { alert, showAlert, hideAlert } = useAlert();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await emailjs.send(
        "service_2fw2vpb",
        "template_mg72c7s",
        {
          from_name: form.name,
          to_name: "chahd",
          from_email: form.email,
          to_email: "chahdfadhlaoui87@gmail.com",
          message: form.message,
        },
        "DLh67fsnRuqouc5c6"
      );

      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        hideAlert(false);
      }, 3000);
    } catch (error) {
      console.error("EmailJS error:", error);

      showAlert({
        show: true,
        text: "I didn't receive your message 😢",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20 ct-root" id="contact">
      <style>{STYLES}</style>

      <div className="ct-shell">
        <header className="ct-head">
          <span className="ct-eyebrow">Get in touch</span>

          <h2 className="ct-title">
            Let's <span className="ct-mark">Talk</span>
          </h2>

          <p className="ct-intro">
            Have a project in mind, an opportunity to discuss, or
            simply want to connect? I'd love to hear from you.
          </p>
        </header>

        {alert.show && <Alert {...alert} />}

        <div className="ct-content">
          {/* Contact information */}
          <div className="ct-info">
            <h3 className="ct-info-title">
              Let's build something meaningful together.
            </h3>

            <p className="ct-info-text">
              Whether it's web development, mobile applications,
              DevOps, or Site Reliability Engineering, I'm always
              interested in discussing ideas, sharing knowledge,
              and exploring new opportunities.
            </p>

            <div className="ct-info-card">
              <span className="ct-info-icon" aria-hidden="true">
                ✉
              </span>

              <div>
                <p className="ct-info-label">Email address</p>
                <p className="ct-info-value">
                  chahdfadhlaoui87@gmail.com
                </p>
              </div>
            </div>

            <div className="ct-info-card">
              <span className="ct-info-icon" aria-hidden="true">
                ↗
              </span>

              <div>
                <p className="ct-info-label">Availability</p>
                <p className="ct-info-value">
                  Open to opportunities and collaborations
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="ct-form-card">
            <h3 className="ct-form-heading">Send me a message</h3>

            <form onSubmit={handleSubmit} className="ct-form">
              <label className="ct-field">
                <span className="ct-label">Full Name</span>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="ct-input"
                  placeholder="e.g. Chahd"
                />
              </label>

              <label className="ct-field">
                <span className="ct-label">Email Address</span>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="ct-input"
                  placeholder="e.g. name@example.com"
                />
              </label>

              <label className="ct-field">
                <span className="ct-label">Your Message</span>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="ct-input ct-textarea"
                  placeholder="Share your thoughts or inquiries..."
                />
              </label>

              <button
                className="ct-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}

                <span className="ct-submit-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
