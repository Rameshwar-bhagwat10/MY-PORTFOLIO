import React, { useState, useRef } from "react";
import styles from "../styles/resume.module.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaDownload, FaMoon, FaSun, FaCode, FaLanguage, FaAward, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaChevronDown, FaChevronUp, FaFileCode, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Dummy data (replace with your real data)
const resumeData = {
  name: "Rameshwar Bhagat",
  title: "Full Stack Developer",
  photo: "", // Optional: "/profile.jpg"
  contact: {
    email: "rameshwar@example.com",
    phone: "+91-1234567890",
    linkedin: "https://linkedin.com/in/rameshwar",
    github: "https://github.com/rameshwar",
    portfolio: "https://your-portfolio.com"
  },
  techStack: [
    { name: "React", icon: <FaCode /> },
    { name: "Node.js", icon: <FaCode /> },
    { name: "MongoDB", icon: <FaCode /> },
    { name: "Express", icon: <FaCode /> },
    { name: "JavaScript", icon: <FaCode /> },
    { name: "TypeScript", icon: <FaCode /> },
    // ...add more
  ],
  languages: [
    { name: "English", level: 5 },
    { name: "Hindi", level: 4 },
    { name: "Marathi", level: 4 }
  ],
  experience: [
    {
      company: "Tech Solutions",
      role: "Senior Developer",
      timeline: "2022 - Present",
      responsibilities: [
        "Led a team of 5 developers for enterprise projects.",
        "Architected scalable REST APIs.",
        "Mentored junior engineers."
      ]
    },
    {
      company: "Web Innovators",
      role: "Frontend Developer",
      timeline: "2020 - 2022",
      responsibilities: [
        "Built responsive UIs with React.",
        "Collaborated with designers and backend teams."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institute: "XYZ University",
      years: "2016 - 2020",
      gpa: "8.7/10"
    }
  ],
  projects: [
    {
      name: "Portfolio Website",
      link: "https://your-portfolio.com",
      github: "https://github.com/rameshwar/portfolio",
      tech: ["React", "Framer Motion", "CSS Modules"]
    },
    {
      name: "E-commerce API",
      github: "https://github.com/rameshwar/ecommerce-api",
      tech: ["Node.js", "Express", "MongoDB"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon",
      date: "2023"
    }
  ],
  achievements: [
    {
      name: "Hackathon Winner",
      issuer: "CodeFest",
      date: "2022"
    }
  ]
};

const getStars = (level) => "⭐".repeat(level);

const Resume = () => {
  const [dark, setDark] = useState(true); // Set dark theme as default
  const [detailed, setDetailed] = useState(true);
  const [viewMode, setViewMode] = useState("web"); // web | json | md
  const [pdfError, setPdfError] = useState("");
  const resumeRef = useRef(null); // Add ref for PDF export

  const handleDownload = () => {
    // Instead of PDF, open portfolio as per prompt
    window.open(resumeData.contact.portfolio, "_blank");
  };

  const handlePDF = async () => {
    setPdfError("");
    try {
      // Dynamically load html2pdf.js from CDN
      if (!window.html2pdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      // Wait for a tick to ensure rendering is complete
      await new Promise(res => setTimeout(res, 100));
      const element = resumeRef.current;
      // Set PDF options for better output
      const opt = {
        margin:       0,
        filename:     "resume.pdf",
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      window.html2pdf().set(opt).from(element).save();
    } catch {
      setPdfError("PDF export failed. Please try again.");
    }
  };

  const renderJSON = () => (
    <pre style={{ fontSize: 12, background: "#222", color: "#fff", padding: 16, borderRadius: 8, overflow: "auto" }}>
      {JSON.stringify(resumeData, null, 2)}
    </pre>
  );

  const renderMarkdown = () => {
    // Simple markdown representation
    let md = `# ${resumeData.name}\n**${resumeData.title}**\n\n`;
    md += `## Contact\n- Email: ${resumeData.contact.email}\n- Phone: ${resumeData.contact.phone}\n- [LinkedIn](${resumeData.contact.linkedin})\n- [GitHub](${resumeData.contact.github})\n- [Portfolio](${resumeData.contact.portfolio})\n\n`;
    md += `## Technical Skills\n${resumeData.techStack.map(t => `- ${t.name}`).join("\n")}\n\n`;
    md += `## Experience\n${resumeData.experience.map(e => `- **${e.role}**, ${e.company} (${e.timeline})\n  ${e.responsibilities.map(r => `- ${r}`).join("\n  ")}`).join("\n")}\n\n`;
    md += `## Education\n${resumeData.education.map(ed => `- ${ed.degree}, ${ed.institute} (${ed.years}) GPA: ${ed.gpa}`).join("\n")}\n\n`;
    md += `## Projects\n${resumeData.projects.map(p => `- [${p.name}](${p.link || p.github}) (${p.tech.join(", ")})`).join("\n")}\n\n`;
    md += `## Certifications\n${resumeData.certifications.map(c => `- ${c.name}, ${c.issuer} (${c.date})`).join("\n")}\n\n`;
    md += `## Achievements\n${resumeData.achievements.map(a => `- ${a.name}, ${a.issuer} (${a.date})`).join("\n")}\n\n`;
    md += `## Languages\n${resumeData.languages.map(l => `- ${l.name}: ${getStars(l.level)}`).join("\n")}\n`;
    return <pre style={{ fontSize: 12, background: "#222", color: "#fff", padding: 16, borderRadius: 8, overflow: "auto" }}>{md}</pre>;
  };

  return (
    <div className={`${styles.resumeWrapper} ${dark ? styles.dark : ""}`}>
      <div className={styles.resumeHeader}>
        <div className={styles.headerLeft}>
          <h1>{resumeData.name}</h1>
          <span className={styles.title}>{resumeData.title}</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn} onClick={() => setDark(!dark)} title={dark ? "Light Mode" : "Dark Mode"}>
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button className={styles.iconBtn} onClick={() => setDetailed(!detailed)} title={detailed ? "Compact View" : "Detailed View"}>
            {detailed ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button className={styles.iconBtn} onClick={() => setViewMode("web")} title="Web View">
            <FaFileAlt />
          </button>
          <button className={styles.iconBtn} onClick={() => setViewMode("json")} title="JSON View">
            <FaFileCode />
          </button>
          <button className={styles.iconBtn} onClick={() => setViewMode("md")} title="Markdown View">
            <FaFileAlt />
          </button>
          <button className={styles.downloadBtn} onClick={handleDownload}>
            <FaDownload /> Open Portfolio
          </button>
          <button className={styles.downloadBtn} onClick={handlePDF}>
            <FaDownload /> Download Resume
          </button>
        </div>
      </div>
      {pdfError && (
        <div style={{ color: "red", margin: "8px 0", fontSize: 14 }}>{pdfError}</div>
      )}
      {viewMode === "json" && renderJSON()}
      {viewMode === "md" && renderMarkdown()}
      {viewMode === "web" && (
        // Remove Framer Motion from this wrapper for PDF reliability
        <div
          id="resume-main"
          ref={resumeRef}
          className={styles.resumeMain}
        >
          <div className={styles.leftCol}>
            {resumeData.photo && (
              <motion.img
                src={resumeData.photo}
                alt="Profile"
                className={styles.profilePhoto}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <div className={styles.sectionCard}>
              <h3>Contact</h3>
              <div className={styles.contactInfo}>
                <a href={`mailto:${resumeData.contact.email}`}><FaEnvelope /> {resumeData.contact.email}</a>
                <a href={`tel:${resumeData.contact.phone}`}><FaPhone /> {resumeData.contact.phone}</a>
                <a href={resumeData.contact.linkedin} target="_blank" rel="noopener"><FaLinkedin /> LinkedIn</a>
                <a href={resumeData.contact.github} target="_blank" rel="noopener"><FaGithub /> GitHub</a>
                <a href={resumeData.contact.portfolio} target="_blank" rel="noopener"><FaGlobe /> Portfolio</a>
              </div>
            </div>
            <div className={styles.sectionCard}>
              <h3>Technical Skills</h3>
              <div className={styles.techStack}>
                {resumeData.techStack.map((tech, i) => (
                  <span className={styles.techBadge} key={i} title={tech.name}>
                    {tech.icon} {tech.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.sectionCard}>
              <h3>Languages</h3>
              <div className={styles.languages}>
                {resumeData.languages.map((lang, i) => (
                  <span className={styles.langBadge} key={i}>
                    <FaLanguage /> {lang.name} <span className={styles.stars}>{getStars(lang.level)}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightCol}>
            <motion.div className={styles.sectionCard} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h3><FaBriefcase /> Experience</h3>
              <div className={styles.timeline}>
                {resumeData.experience.map((exp, i) => (
                  <div className={styles.timelineItem} key={i}>
                    <div className={styles.timelineIcon}><FaBriefcase /></div>
                    <div>
                      <strong>{exp.role}</strong> <span className={styles.company}>{exp.company}</span>
                      <span className={styles.timelineDate}>{exp.timeline}</span>
                      {detailed && (
                        <ul>
                          {exp.responsibilities.map((r, j) => <li key={j}>{r}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className={styles.sectionCard} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3><FaGraduationCap /> Education</h3>
              <div className={styles.timeline}>
                {resumeData.education.map((ed, i) => (
                  <div className={styles.timelineItem} key={i}>
                    <div className={styles.timelineIcon}><FaGraduationCap /></div>
                    <div>
                      <strong>{ed.degree}</strong> <span className={styles.company}>{ed.institute}</span>
                      <span className={styles.timelineDate}>{ed.years}</span>
                      {detailed && <div>GPA: {ed.gpa}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className={styles.sectionCard} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3><FaProjectDiagram /> Projects</h3>
              <div className={styles.projects}>
                {resumeData.projects.map((proj, i) => (
                  <div className={styles.projectItem} key={i}>
                    <strong>{proj.name}</strong>
                    <div className={styles.projectLinks}>
                      {proj.link && <a href={proj.link} target="_blank" rel="noopener">Demo</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener">GitHub</a>}
                    </div>
                    <div className={styles.projectTech}>{proj.tech.join(", ")}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className={styles.sectionCard} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3><FaAward /> Certifications & Achievements</h3>
              <div className={styles.certAchievements}>
                {resumeData.certifications.map((cert, i) => (
                  <div className={styles.certItem} key={i}>
                    <strong>{cert.name}</strong> <span className={styles.issuer}>{cert.issuer}</span> <span className={styles.timelineDate}>{cert.date}</span>
                  </div>
                ))}
                {resumeData.achievements.map((ach, i) => (
                  <div className={styles.certItem} key={i}>
                    <strong>{ach.name}</strong> <span className={styles.issuer}>{ach.issuer}</span> <span className={styles.timelineDate}>{ach.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
