import { useState, useContext, useEffect } from 'react';
import styles from '../styles/navbar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';
import themeToggleStyles from '../styles/ThemeToggle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGg } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Close menu if resizing to desktop
    if (windowWidth > 768 && isMenuOpen) setIsMenuOpen(false);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, isMenuOpen]);

  const handleLinkClick = (item) => {
    setActiveNav(item);
    if (windowWidth <= 768) setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <FontAwesomeIcon icon={faGg} />
        </span>
        PortOfRam
      </div>

      {windowWidth <= 768 && (
        <div
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      )}

      {(windowWidth > 768 || isMenuOpen) && (
        <ul
          className={
            windowWidth <= 768
              ? `${styles.navLinks} ${isMenuOpen ? styles.open : ''}`
              : styles.navLinks
          }
        >
          {navItems.map(item => (
            <li
              key={item}
              onClick={() => handleLinkClick(item)}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className={activeNav === item ? styles.activeNav : ""}
              >
                {item}
              </a>
            </li>
          ))}
          
          <li>
            <button
              onClick={toggleTheme}
              className={themeToggleStyles.themeSwitch}
              data-theme={theme}
              aria-label="Toggle theme"
              type="button"
            >
              <span className={themeToggleStyles.themeSwitchIcon}>
                {theme === 'dark' ? <BsSun /> : <BsMoon />}
              </span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
