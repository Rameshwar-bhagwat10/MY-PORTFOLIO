import styles from '../styles/contact.module.css';
import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaRegCopy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// NOTE: Make sure your backend server.js is running and configured with your email.

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('rameshwarbhagwat019@gmail.com');
    setCopied(true);
    toast.info('Email copied!');
    setTimeout(() => setCopied(false), 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 1200);
      return;
    }
    setLoading(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('success');
      } else {
        toast.error('Failed to send message. Try again later.');
        setSubmitStatus('error');
      }
    } catch {
      toast.error('Failed to send message. Try again later.');
      setSubmitStatus('error');
    }
    setLoading(false);
    setTimeout(() => setSubmitStatus(null), 1200);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitStatus(null);
  };

  return (
    <section id="contact" className={styles.contactSection} data-aos="fade-up">
      <ToastContainer />
      <h2 className={styles.title}>Contact Me</h2>
      <div className={styles.container}>
        <div className={styles.info}>
          <div>
            <FaEnvelope /> rameshwarbhagwat019@gmail.com
            <button
              className={styles.copyBtn}
              onClick={handleCopy}
              title="Copy email"
              type="button"
            >
              <FaRegCopy />
              {copied && <span className={styles.copiedText}>Copied!</span>}
            </button>
          </div>
          <div><FaPhoneAlt /> +91-9699245170</div>
          <div><FaMapMarkerAlt /> Yeola, Maharashtra, India</div>
          {/* Social links */}
          <div className={styles.socialRow}>
            <a href="https://github.com/rameshwar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/rameshwar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/rameshwar" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
          {/* Map embed */}
          <div className={styles.mapWrap}>
            <iframe
              title="Yeola, Maharashtra, India"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.682366342039!2d74.4897!3d20.0437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc3e7d6e7e7e7b%3A0x7e7e7e7e7e7e7e7e!2sYeola%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="120"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} data-aos="zoom-in">
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Name</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Email</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Subject</label>
          </div>
          <div className={styles.inputGroup}>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Message</label>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                pointerEvents: loading ? 'none' : 'auto',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
              {submitStatus === 'success' && (
                <FaCheckCircle style={{ color: '#22c55e', marginLeft: 8, fontSize: 18, verticalAlign: 'middle', animation: 'popIn 0.5s' }} />
              )}
              {submitStatus === 'error' && (
                <FaTimesCircle style={{ color: '#ef4444', marginLeft: 8, fontSize: 18, verticalAlign: 'middle', animation: 'popIn 0.5s' }} />
              )}
            </button>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
        