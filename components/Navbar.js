import { useState, useContext, useEffect, useMemo } from "react";
import styles from "../styles/navbar.module.css";
import { FiMenu, FiX, FiUsers } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";
import themeToggleStyles from "../styles/ThemeToggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGg } from "@fortawesome/free-brands-svg-icons";
import { useVisitorTracking } from "../hooks/useVisitorTracking";

export default function Navbar() {
  const navItems = useMemo(
    () => ["Home", "About", "Skills", "Projects", "Experience", "Contact"],
    []
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeNav, setActiveNav] = useState("Home");
  const [showVisitorCounter, setShowVisitorCounter] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  
  // Use real visitor tracking
  const { totalVisitors, isNewVisitor, loading, error } = useVisitorTracking();

  // Animate visitor counter when data loads
  useEffect(() => {
    if (!loading && totalVisitors > 0) {
      let currentCount = 0;
      const targetCount = totalVisitors;
      const increment = Math.max(1, Math.ceil(targetCount / 50));
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          currentCount = targetCount;
          clearInterval(timer);
        }
        setAnimatedCount(currentCount);
      }, 30);
      
      // Show counter after animation starts
      setTimeout(() => setShowVisitorCounter(true), 500);
      
      return () => clearInterval(timer);
    }
  }, [loading, totalVisitors]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => {
      const sections = navItems
        .map((item) => ({
          name: item,
          element: document.getElementById(item.toLowerCase()),
        }))
        .filter((section) => section.element);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          setActiveNav(section.name);
          break;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Close menu if resizing to desktop
    if (windowWidth > 768 && isMenuOpen) setIsMenuOpen(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowWidth, isMenuOpen, navItems]);

  const handleLinkClick = (item) => {
    setActiveNav(item);
    if (windowWidth <= 768) setIsMenuOpen(false);
  };

  return (
    <nav
      className={`${styles.navbar} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <FontAwesomeIcon icon={faGg} />
        </span>
        PortOfRam
      </div>

      {/* Real Visitor Counter */}
      {showVisitorCounter && !loading && (
        <div className={`${styles.visitorCounter} ${isNewVisitor ? styles.newVisitor : ''}`}>
          <FiUsers className={styles.visitorIcon} />
          <span className={styles.visitorText}>
            {isNewVisitor ? 'Welcome! You\'re visitor' : 'Visitor'} #{animatedCount.toLocaleString()}
          </span>
          {error && (
            <span className={styles.offlineIndicator} title="Offline mode">
              📡
            </span>
          )}
        </div>
      )}

      {windowWidth <= 768 && (
        <div
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      )}

      {(windowWidth > 768 || isMenuOpen) && (
        <ul
          className={
            windowWidth <= 768
              ? `${styles.navLinks} ${isMenuOpen ? styles.open : ""}`
              : styles.navLinks
          }
        >
          {navItems.map((item) => (
            <li key={item} onClick={() => handleLinkClick(item)}>
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
                {theme === "dark" ? <BsSun /> : <BsMoon />}
              </span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
