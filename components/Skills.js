import styles from '../styles/skills.module.css';
import { useEffect, useState, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaNodeJs, FaPython, FaDatabase, FaGitAlt, FaDocker, FaAws
} from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiRedux, SiFigma, SiTailwindcss } from 'react-icons/si';
// 3D Cube component (to be created)
import { ThemeContext } from '../context/ThemeContext';

export default function Skills() {
  // Use theme from context for global dark mode support
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const skillCategories = [
    {
      label: 'Frontend',
      skills: [
        { name: 'HTML5', icon: <FaHtml5 color="#e44d26" />, level: 90, description: 'Semantic HTML for accessibility.', tip: 'Used in 10+ projects', top: true },
        { name: 'CSS3', icon: <FaCss3Alt color="#264de4" />, level: 85, description: 'Modern layout systems.', tip: 'Built custom responsive designs', top: true },
        { name: 'JavaScript', icon: <FaJs color="#f7df1e" />, level: 80, description: 'DOM, ES6+, async patterns.', tip: 'Used in frontend validations', top: true },
        { name: 'React.js', icon: <FaReact color="#61dafb" />, level: 75, description: 'SPA, hooks, context.', tip: 'Dynamic UIs with API integration', top: true },
        { name: 'Next.js', icon: <SiNextdotjs color={theme === 'dark' ? "#fff" : "#000"} />, level: 70, description: 'SSR, dynamic routes.', tip: 'Built portfolio, login app', top: false },
        { name: 'Redux', icon: <SiRedux color="#764abc" />, level: 65, description: 'State management.', tip: 'Complex state flows', top: false },
        { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06b6d4" />, level: 70, description: 'Utility-first CSS.', tip: 'Rapid prototyping', top: false },
      ]
    },
    {
      label: 'Backend',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs color="#3c873a" />, level: 65, description: 'REST APIs, Express.', tip: 'Backends for auth systems', top: true },
        { name: 'MongoDB', icon: <SiMongodb color="#4db33d" />, level: 60, description: 'NoSQL design.', tip: 'Login & marketplace DB', top: true },
        { name: 'Python', icon: <FaPython color="#3776ab" />, level: 70, description: 'Automation & backends.', tip: 'Data handling + scripts', top: false },
        { name: 'SQL', icon: <FaDatabase color="#0070f3" />, level: 55, description: 'Relational DBs.', tip: 'Reporting & analytics', top: false },
      ]
    },
    {
      label: 'Tools & Cloud',
      skills: [
        { name: 'Git', icon: <FaGitAlt color="#f34f29" />, level: 80, description: 'Version control.', tip: 'Team collaboration', top: true },
        { name: 'Docker', icon: <FaDocker color="#2496ed" />, level: 60, description: 'Containerization.', tip: 'DevOps & deployment', top: true },
        { name: 'AWS', icon: <FaAws color="#ff9900" />, level: 50, description: 'Cloud services.', tip: 'Hosting & storage', top: false },
        { name: 'Figma', icon: <SiFigma color="#a259ff" />, level: 65, description: 'UI/UX design.', tip: 'Wireframes & prototypes', top: false },
      ]
    }
  ];

  // Only show one category at a time
  const [activeCat, setActiveCat] = useState('Frontend');
  const [search, setSearch] = useState('');

  // Filtered skills by search
  const getFilteredSkills = (skills) =>
    skills.filter(skill =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div
      className={`${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}
    >
      <section id="skills" className={styles.skillsSection}>
        <h2 className={styles.title}>My Skills</h2>
        {/* 3D Skill Cube */}
        
        {/* Search/filter input */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {/* Navlinks for categories */}
        <div className={styles.skillNavLinks}>
          {['Frontend', 'Backend', 'Tools & Cloud'].map((cat) => (
            <button
              key={cat}
              className={`${styles.skillNavLink} ${activeCat === cat ? styles.activeSkillNav : ''}`}
              onClick={() => setActiveCat(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.categories}>
          {['Frontend', 'Backend', 'Tools & Cloud'].map((cat, idx) => (
            activeCat === cat && (
              <div className={styles.category} key={cat}>
                <h3 className={styles.categoryTitle}>{cat}</h3>
                <div className={styles.grid}>
                  {getFilteredSkills(skillCategories[idx].skills).map((skill) => (
                    <motion.div
                      key={skill.name}
                      className={styles.card}
                      data-aos="fade-up"
                      data-tip={skill.tip}
                    >
                      <div className={styles.iconWrapper}>
                        <div className={styles.icon}>{skill.icon}</div>
                        <div className={styles.label}>{skill.name}</div>
                      </div>
                      {/* Circular progress bar for all skills */}
                      <div className={styles.progressCircle}>
                        <CircularProgressbar
                          value={skill.level}
                          text={`${skill.level}%`}
                          styles={buildStyles({
                            pathColor: theme === 'dark' ? '#38bdf8' : '#0070f3',
                            textColor: theme === 'dark' ? '#e2e8f0' : '#111',
                            trailColor: theme === 'dark' ? '#334155' : '#e1e4e8',
                            textSize: '18px'
                          })}
                        />
                      </div>
                      <div className={styles.info}>
                        {skill.description}
                        {/* Popover for live preview or badge */}
                        <span
                          data-tip={`<b>${skill.name}</b><br/>${skill.tip}`}
                          data-html={true}
                          className={styles.infoIcon}
                        >&#9432;</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          ))}
          <Tooltip effect="solid" place="top" html={true} />
        </div>
      </section>
    </div>
  );
}


