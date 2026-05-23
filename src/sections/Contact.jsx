import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await emailjs
      .send(
        'service_2fw2vpb',
        'template_mg72c7s',
        {
          from_name: form.name,
          to_name: 'chahd',
          from_email: form.email,
          to_email: 'chahdfadhlaoui87@gmail.com',
          message: form.message,
        },
        'DLh67fsnRuqouc5c6',
      )
      .then(
        () => {
          setLoading(false);
          showAlert({ show: true, text: 'Thank you for your message 😃', type: 'success' });
          setTimeout(() => {
            hideAlert(false);
            setForm({ name: '', email: '', message: '' });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({ show: true, text: "I didn't receive your message 😢", type: 'danger' });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        {/* Background terminal image */}
        <img
          src="/assets/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 min-h-screen"
        />

        <div className="contact-container">
          {alert.show && <Alert {...alert} />}

          <h3 className="head-text mt-10">Let's talk</h3>

          {/* ↓ contact-body-text class lets CSS target this in light mode */}
          <p className="text-lg text-white-600 mt-3 contact-body-text">
            Whether you're looking to build a new website, improve your existing platform, or bring a
            unique project to life, I'm here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., Chahd"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., chahdfadhlaoui87@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;