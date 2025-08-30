import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
// Install with: npm install react-intersection-observer
import { useInView } from "react-intersection-observer";
import {
  FaDownload,
  FaCode,
  FaRocket,
  FaUsers,
  FaStar,
  FaTrophy,
  FaCoffee,
  FaMusic,
  FaCamera,
  FaGithub,
  FaHeart,
  FaLaptopCode,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../styles/about.module.css";

// Simple useCountUp hook
function useCountUp(end, duration = 1.5) {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / (duration * 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [end, duration]);
  return count;
}

// Enhanced skills with icons and detailed information
const skills = [
  {
    name: "React",
    percent: 95,
    color: "linear-gradient(135deg, #61dafb, #21d4fd)",
    icon: <SiReact />,
    category: "Frontend",
    level: "Expert",
    experience: "3+ years",
    projects: [
      "E-commerce Platform",
      "Portfolio Website",
      "Task Management App",
    ],
    description:
      "Building dynamic UIs with hooks, context, and modern patterns",
  },
  {
    name: "Next.js",
    percent: 90,
    color: "linear-gradient(135deg, #000000, #434343)",
    icon: <SiNextdotjs />,
    category: "Frontend",
    level: "Advanced",
    experience: "2+ years",
    projects: ["Portfolio Site", "Blog Platform", "SaaS Dashboard"],
    description: "Full-stack React framework with SSR and API routes",
  },
  {
    name: "Node.js",
    percent: 85,
    color: "linear-gradient(135deg, #68a063, #8cc84b)",
    icon: <SiNodedotjs />,
    category: "Backend",
    level: "Advanced",
    experience: "2+ years",
    projects: ["REST APIs", "Authentication Systems", "Real-time Chat"],
    description: "Server-side JavaScript with Express and microservices",
  },
  {
    name: "MongoDB",
    percent: 80,
    color: "linear-gradient(135deg, #4db33d, #3fa037)",
    icon: <SiMongodb />,
    category: "Database",
    level: "Advanced",
    experience: "2+ years",
    projects: ["User Management", "Content Management", "Analytics Dashboard"],
    description: "NoSQL database design and optimization",
  },
  {
    name: "Python",
    percent: 75,
    color: "linear-gradient(135deg, #3776ab, #ffd43b)",
    icon: <SiPython />,
    category: "Backend",
    level: "Intermediate",
    experience: "1+ years",
    projects: ["Data Analysis", "Web Scraping", "API Development"],
    description: "Backend development and data processing scripts",
  },
  {
    name: "TypeScript",
    percent: 78,
    color: "linear-gradient(135deg, #3178c6, #235a97)",
    icon: <SiTypescript />,
    category: "Frontend",
    level: "Intermediate",
    experience: "1+ years",
    projects: ["Type-safe Applications", "Large Scale Projects"],
    description: "Type-safe JavaScript for better development experience",
  },
];

// Achievement badges data
const achievements = [
  {
    id: 1,
    title: "React Expert",
    description: "Mastered React ecosystem",
    icon: <SiReact />,
    color: "#61dafb",
    date: "2023",
    type: "skill",
  },
  {
    id: 2,
    title: "100+ Projects",
    description: "Completed over 100 projects",
    icon: <FaRocket />,
    color: "#ff6b6b",
    date: "2024",
    type: "milestone",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    description: "End-to-end development expertise",
    icon: <FaLaptopCode />,
    color: "#4ecdc4",
    date: "2023",
    type: "certification",
  },
  {
    id: 4,
    title: "Client Satisfaction",
    description: "5-star rating from clients",
    icon: <FaStar />,
    color: "#ffd93d",
    date: "2024",
    type: "achievement",
  },
  {
    id: 5,
    title: "Open Source",
    description: "Active contributor",
    icon: <FaGithub />,
    color: "#333",
    date: "2023",
    type: "contribution",
  },
  {
    id: 6,
    title: "Fast Delivery",
    description: "Always on-time delivery",
    icon: <FaTrophy />,
    color: "#ff9f43",
    date: "2024",
    type: "performance",
  },
];

// Fun facts data
const funFacts = [
  {
    icon: <FaCoffee />,
    text: "1000+ cups of coffee consumed",
    color: "#8b4513",
  },
  {
    icon: <FaMusic />,
    text: "Codes while listening to Lo-fi music",
    color: "#ff6b6b",
  },
  {
    icon: <FaCamera />,
    text: "Photography enthusiast in free time",
    color: "#4ecdc4",
  },
  {
    icon: <FaHeart />,
    text: "Passionate about clean, readable code",
    color: "#ff3838",
  },
];

export default function About() {
  const { theme } = useContext(ThemeContext);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  // State for fun facts rotation
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Animated counters
  const exp = useCountUp(inView ? 3 : 0, 1.2);
  const projects = useCountUp(inView ? 24 : 0, 1.2);
  const clients = useCountUp(inView ? 8 : 0, 1.2);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Rotate fun facts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get skill level color
  const getSkillLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "#00d4aa";
      case "Advanced":
        return "#0984e3";
      case "Intermediate":
        return "#fdcb6e";
      default:
        return "#6c5ce7";
    }
  };

  return (
    <div
      className={`${theme === "dark" ? styles.darkTheme : styles.lightTheme}`}
    >
      <section id="about" className={styles.advancedAbout} ref={ref}>
        <div className={styles.aboutContainer}>
          {/* Left Side: Profile Image */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className={styles.imgWrapper}>
              <div className={styles.imageContainer}>
                <div className={styles.floatingElements}>
                  <div
                    className={styles.floatingIcon}
                    style={{ top: "10%", left: "10%" }}
                  >
                    <FaCode />
                  </div>
                  <div
                    className={styles.floatingIcon}
                    style={{ top: "20%", right: "15%" }}
                  >
                    <FaRocket />
                  </div>
                  <div
                    className={styles.floatingIcon}
                    style={{ bottom: "25%", left: "5%" }}
                  >
                    <FaStar />
                  </div>
                  <div
                    className={styles.floatingIcon}
                    style={{ bottom: "15%", right: "10%" }}
                  >
                    <FaUsers />
                  </div>
                </div>
                <motion.div
                  className={styles.imageGlow}
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/assets/Ram.jpg"
                  alt="Rameshwar Bhagwat"
                  width={250}
                  height={250}
                  className={styles.profileImgAdv}
                  priority
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayContent}>
                    <h3>Full Stack Developer</h3>
                    <p>Passionate about creating amazing web experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side: Content Section */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 80,
            }}
          >
            <h2 className={styles.gradientTitle}>About Me</h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className={styles.intro}>
                I&apos;m Rameshwar, a passionate full-stack developer who builds
                scalable web applications for real-world users.
              </p>
              <p className={styles.intro}>
                I love solving problems, collaborating with teams, and learning
                new technologies to deliver impactful solutions.
              </p>
            </motion.div>

            {/* Enhanced Counters */}
            <motion.div
              className={styles.counters}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className={styles.counterBox}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.counterIcon}>
                  <FaRocket />
                </div>
                <span className={styles.counterNum}>{exp}+</span>
                <span className={styles.counterLabel}>Years Experience</span>
              </motion.div>
              <motion.div
                className={styles.counterBox}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.counterIcon}>
                  <FaCode />
                </div>
                <span className={styles.counterNum}>{projects}+</span>
                <span className={styles.counterLabel}>Projects</span>
              </motion.div>
              <motion.div
                className={styles.counterBox}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.counterIcon}>
                  <FaUsers />
                </div>
                <span className={styles.counterNum}>{clients}+</span>
                <span className={styles.counterLabel}>Clients</span>
              </motion.div>
            </motion.div>
            {/* Enhanced Info Grid */}
            <motion.div
              className={styles.infoGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className={styles.infoItem}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={styles.infoLabel}>Name:</span>
                <span className={styles.infoValue}>Rameshwar Bhagwat</span>
              </motion.div>
              <motion.div
                className={styles.infoItem}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>
                  rameshwarbhagwat019@gmail.com
                </span>
              </motion.div>
              <motion.div
                className={styles.infoItem}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={styles.infoLabel}>Experience:</span>
                <span className={styles.infoValue}>3+ Years</span>
              </motion.div>
              <motion.div
                className={styles.infoItem}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={styles.infoLabel}>Location:</span>
                <span className={styles.infoValue}>Yeola, Maharashtra</span>
              </motion.div>
            </motion.div>
            {/* Achievement Badges Section - Compact */}
            <motion.div
              className={styles.achievementsSection}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <h3 className={styles.sectionTitle}>
                <FaTrophy className={styles.sectionIcon} />
                Achievements
              </h3>
              <div className={styles.achievementsGrid}>
                {achievements.slice(0, 4).map((achievement, idx) => (
                  <motion.div
                    key={achievement.id}
                    className={styles.achievementBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.8 + idx * 0.1,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                    style={{ "--badge-color": achievement.color }}
                  >
                    <div
                      className={styles.badgeIcon}
                      style={{ color: achievement.color }}
                    >
                      {achievement.icon}
                    </div>
                    <div className={styles.badgeContent}>
                      <h4 className={styles.badgeTitle}>{achievement.title}</h4>
                      <p className={styles.badgeDescription}>
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Skills Section */}
            <motion.div
              className={styles.skillsSection}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className={styles.sectionTitle}>
                <FaCode className={styles.sectionIcon} />
                Technical Skills
              </h3>
              <div className={styles.skillsGrid}>
                {skills.slice(0, 6).map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.9 + idx * 0.1,
                    }}
                    whileHover={{
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className={styles.skillHeader}>
                      <div className={styles.skillNameWrapper}>
                        <motion.div
                          className={styles.skillIcon}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            color: skill.color.includes("gradient")
                              ? "#7f5af0"
                              : skill.color,
                          }}
                        >
                          {skill.icon}
                        </motion.div>
                        <div className={styles.skillInfo}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span
                            className={styles.skillLevel}
                            style={{ color: getSkillLevelColor(skill.level) }}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      <span className={styles.skillPercent}>
                        {inView ? skill.percent : 0}%
                      </span>
                    </div>

                    <div className={styles.skillBarWrapper}>
                      <div className={styles.skillBarTrack} />
                      <motion.div
                        className={styles.skillBarFill}
                        initial={{ width: 0 }}
                        animate={
                          inView ? { width: `${skill.percent}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: 1 + idx * 0.1,
                          ease: "easeOut",
                        }}
                        style={{
                          background: skill.color,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fun Facts Section - Compact */}
            <motion.div
              className={styles.funFactsSection}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className={styles.sectionTitle}>
                <FaStar className={styles.sectionIcon} />
                Fun Facts
              </h3>
              <div className={styles.funFactsContainer}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFactIndex}
                    className={styles.funFactCard}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={styles.funFactIcon}
                      style={{ color: funFacts[currentFactIndex].color }}
                    >
                      {funFacts[currentFactIndex].icon}
                    </div>
                    <p className={styles.funFactText}>
                      {funFacts[currentFactIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className={styles.funFactIndicators}>
                  {funFacts.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.indicator} ${
                        idx === currentFactIndex ? styles.active : ""
                      }`}
                      onClick={() => setCurrentFactIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Enhanced Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <motion.a
                href="/assets/Rameshwar_Bhagwat_CV.pdf"
                className={styles.cvBtn}
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 30px rgba(127, 90, 240, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaDownload className={styles.cvIcon} />
                Download CV
                <div className={styles.btnRipple} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
