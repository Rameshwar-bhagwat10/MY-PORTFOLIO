import styles from '../styles/footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        © {new Date().getFullYear()} Rameshwar Bhagwat
        <span style={{ marginLeft: 16, fontSize: 13, color: "#cbd5e1" }}>
          <FaEnvelope style={{ verticalAlign: 'middle', marginRight: 4 }} />
          rameshwarbhagwat019@gmail.com
        </span>
        <span style={{ marginLeft: 16, fontSize: 13, color: "#cbd5e1" }}>
          <FaPhoneAlt style={{ verticalAlign: 'middle', marginRight: 4 }} />
          +91-9699245170
        </span>
        <span style={{ marginLeft: 16, fontSize: 13, color: "#cbd5e1" }}>
          <FaMapMarkerAlt style={{ verticalAlign: 'middle', marginRight: 4 }} />
          Yeola, Maharashtra
        </span>
      </div>
      <div className={styles.socials}>
        <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://twitter.com/yourname" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </div>
    </footer>
  );
}
