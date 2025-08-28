import styles from "../styles/contact.module.css";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRegCopy,
  FaCheckCircle,
  FaPaperPlane,
  FaSpinner,
  FaUser,
  FaAt,
  FaComment,
  FaHeart,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// NOTE: Make sure your backend server.js is running and configured with your email.

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [fieldErrors, setFieldErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }

    // Update character count for message field
    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("rameshwarbhagwat019@gmail.com");
    setCopied(true);
    toast.info("Email copied!");
    setTimeout(() => setCopied(false), 1200);
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    // Subject validation
    if (!form.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (form.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!form.message.trim()) {
      errors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (form.message.trim().length > 1000) {
      errors.message = "Message must be less than 1000 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 2000);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.message ||
            "Message sent successfully! Check your email for confirmation."
        );
        setForm({ name: "", email: "", subject: "", message: "" });
        setCharCount(0);
        setSubmitStatus("success");
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Network error. Please check your connection and try again.");
      setSubmitStatus("error");
    }

    setLoading(false);
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitStatus(null);
    setFieldErrors({});
    setCharCount(0);
  };

  // Initialize character count
  useEffect(() => {
    setCharCount(form.message.length);
  }, [form.message]);

  return (
    <section id="contact" className={styles.contactSection} data-aos="fade-up">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Let&apos;s Connect</h2>
        <p className={styles.subtitle}>
          Have a project in mind? Let&apos;s discuss how we can work together to
          bring your ideas to life.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.info} data-aos="fade-right">
          <div className={styles.infoHeader}>
            <h3>Get In Touch</h3>
            <p>Feel free to reach out through any of these channels</p>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <FaEnvelope />
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>
                rameshwarbhagwat019@gmail.com
              </span>
            </div>
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

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <FaPhoneAlt />
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactValue}>+91-9699245170</span>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <FaMapMarkerAlt />
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactValue}>
                Yeola, Maharashtra, India
              </span>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h4>Follow Me</h4>
            <div className={styles.socialRow}>
              <a
                href="https://github.com/rameshwar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialLink}
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/rameshwar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/rameshwar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <FaTwitter />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className={styles.mapWrap}>
            <div className={styles.mapHeader}>
              <h4>Find Me Here</h4>
              <p>Yeola, Maharashtra, India</p>
            </div>
            <iframe
              title="Yeola, Maharashtra, India"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60267.89234567890!2d74.4897!3d20.0437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc3e7d6e7e7e7b%3A0x7e7e7e7e7e7e7e7e!2sYeola%2C%20Maharashtra%20423401%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          data-aos="fade-left"
        >
          <div className={styles.formHeader}>
            <h3>Send Message</h3>
            <p>Let&apos;s start a conversation</p>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder=" "
                className={fieldErrors.name ? styles.errorInput : ""}
              />
              <label>Full Name *</label>
            </div>
            {fieldErrors.name && (
              <span className={styles.errorText}>{fieldErrors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaAt className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder=" "
                className={fieldErrors.email ? styles.errorInput : ""}
              />
              <label>Email Address *</label>
            </div>
            {fieldErrors.email && (
              <span className={styles.errorText}>{fieldErrors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaComment className={styles.inputIcon} />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder=" "
                className={fieldErrors.subject ? styles.errorInput : ""}
              />
              <label>Subject *</label>
            </div>
            {fieldErrors.subject && (
              <span className={styles.errorText}>{fieldErrors.subject}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder=" "
                rows="6"
                maxLength="1000"
                className={fieldErrors.message ? styles.errorInput : ""}
              />
              <label>Your Message *</label>
            </div>
            <div className={styles.messageInfo}>
              <span className={styles.charCount}>
                {charCount}/1000 characters
              </span>
              {charCount < 10 && charCount > 0 && (
                <span className={styles.minChars}>
                  Minimum 10 characters required
                </span>
              )}
            </div>
            {fieldErrors.message && (
              <span className={styles.errorText}>{fieldErrors.message}</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.submitBtn} ${
                loading ? styles.loading : ""
              } ${submitStatus === "success" ? styles.success : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Sending Message...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <FaCheckCircle />
                  Message Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>

            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
              disabled={loading}
            >
              Clear Form
            </button>
          </div>

          <div className={styles.formFooter}>
            <p className={styles.formNote}>
              <FaHeart className={styles.heartIcon} />* Required fields.
              I&apos;ll respond within 24-48 hours.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
