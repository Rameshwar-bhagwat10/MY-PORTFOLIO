import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
// Install with: npm install react-intersection-observer
import { useInView } from "react-intersection-observer";
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

const skills = [
  {
    name: "React",
    percent: 95,
    color: "linear-gradient(90deg,#7f5af0,#2cb67d)",
  },
  {
    name: "Next.js",
    percent: 90,
    color: "linear-gradient(90deg,#ff6ac1,#1982c4)",
  },
  {
    name: "Node.js",
    percent: 85,
    color: "linear-gradient(90deg,#43e97b,#38f9d7)",
  },
  {
    name: "MongoDB",
    percent: 80,
    color: "linear-gradient(90deg,#f7971e,#ffd200)",
  },
  {
    name: "Python",
    percent: 75,
    color: "linear-gradient(90deg,#f857a6,#ff5858)",
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  // Animated counters
  const exp = useCountUp(inView ? 3 : 0, 1.2);
  const projects = useCountUp(inView ? 24 : 0, 1.2);
  const clients = useCountUp(inView ? 8 : 0, 1.2);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section id="about" className={styles.advancedAbout} ref={ref}>
      <div className={styles.aboutContainer}>
        {/* Left: Profile Image */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className={styles.imgWrapper}>
            <Image
              src="/assets/Ram.jpg"
              alt="Rameshwar Bhagwat"
              width={340}
              height={340}
              className={styles.profileImgAdv}
              priority
            />
          </div>
        </motion.div>
        {/* Right: Content */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className={styles.gradientTitle}>About Me</h2>
          <p className={styles.intro}>
            I&apos;m Rameshwar, a passionate full-stack developer who builds
            scalable web applications for real-world users.
          </p>
          <p className={styles.intro}>
            I love solving problems, collaborating with teams, and learning new
            technologies to deliver impactful solutions.
          </p>
          {/* Counters */}
          <div className={styles.counters}>
            <div className={styles.counterBox}>
              <span className={styles.counterNum}>{exp}+</span>
              <span className={styles.counterLabel}>Years Experience</span>
            </div>
            <div className={styles.counterBox}>
              <span className={styles.counterNum}>{projects}+</span>
              <span className={styles.counterLabel}>Projects</span>
            </div>
            <div className={styles.counterBox}>
              <span className={styles.counterNum}>{clients}+</span>
              <span className={styles.counterLabel}>Clients</span>
            </div>
          </div>
          {/* Info Grid */}
          <div className={styles.infoGrid}>
            <div>
              <span className={styles.infoLabel}>Name:</span>
              <span className={styles.infoValue}>Rameshwar Bhagwat</span>
            </div>
            <div>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>
                rameshwarbhagwat019@gmail.com
              </span>
            </div>
            <div>
              <span className={styles.infoLabel}>Experience:</span>
              <span className={styles.infoValue}>3+ Years</span>
            </div>
            <div>
              <span className={styles.infoLabel}>Location:</span>
              <span className={styles.infoValue}>Yeola, Maharashtra</span>
            </div>
          </div>
          {/* Skills */}
          <div className={styles.skillsSection}>
            {skills.map((skill, idx) => (
              <div key={skill.name} className={styles.skillRow}>
                <div className={styles.skillLabelRow}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercent}>
                    {inView ? skill.percent : 0}%
                  </span>
                </div>
                <motion.div
                  className={styles.skillBarBg}
                  initial={{ width: 0 }}
                  animate={
                    inView ? { width: `${skill.percent}%` } : { width: 0 }
                  }
                  transition={{ duration: 1, delay: 0.3 + idx * 0.15 }}
                  style={{
                    background: skill.color,
                  }}
                />
              </div>
            ))}
          </div>
          {/* Download CV Button */}
          <a
            href="/assets/Rameshwar_Bhagwat_CV.pdf"
            className={styles.cvBtn}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
