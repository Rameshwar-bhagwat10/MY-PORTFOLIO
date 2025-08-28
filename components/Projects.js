import React, { useState, useEffect, useMemo, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";
import { projectsData, categories } from "../data/projects";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../styles/projects.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// Tech stack icons mapping
const techIcons = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
};

export default function Projects() {
  const { theme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    try {
      AOS.init({ duration: 800, once: true });
      if (inView) controls.start("visible");
    } catch (error) {
      console.warn("AOS initialization failed:", error);
    }
  }, [inView, controls]);

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          (project.techStack &&
            project.techStack.some((tech) =>
              tech.toLowerCase().includes(searchLower)
            ))
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  const openModal = (project) => {
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div
      className={`${theme === "dark" ? styles.darkTheme : styles.lightTheme}`}
    >
      <section id="projects" className={styles.projectsSection} ref={ref}>
        <div className={styles.container}>
          {/* Title - matching Skills section */}
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            My Projects
          </motion.h2>

          {/* Search and Filter Controls - matching Skills section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.searchWrapper}
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={styles.skillNavLinks}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.skillNavLink} ${
                  selectedCategory === category ? styles.activeSkillNav : ""
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid with Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.projectsContainer}
          >
            {filteredProjects.length > 0 ? (
              <Swiper
                modules={[FreeMode, Mousewheel]}
                spaceBetween={28}
                slidesPerView="auto"
                freeMode={true}
                mousewheel={true}
                grabCursor={true}
                className={styles.projectsSwiper}
              >
                {filteredProjects.map((project, index) => (
                  <SwiperSlide key={project.id} className={styles.swiperSlide}>
                    <ProjectCard
                      project={project}
                      index={index}
                      onOpenModal={openModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.noProjects}>
                <p>No projects found matching your criteria.</p>
              </div>
            )}
          </motion.div>

          {/* Project Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </div>
      </section>
    </div>
  );
}

// Project Card Component - matching Skills card design
function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.div
      className={styles.card}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      onClick={() => onOpenModal(project)}
    >
      {/* Project Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          width={280}
          height={160}
          className={styles.projectImage}
        />
      </div>

      {/* Project Info */}
      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        {/* Tech Stack Icons */}
        <div className={styles.techStack}>
          {project.techStack &&
            project.techStack.slice(0, 4).map((tech) => {
              const IconComponent = techIcons[tech];
              return (
                <div
                  key={tech}
                  className={styles.techIcon}
                  data-tooltip-id={`tech-${tech}-${project.id}`}
                  data-tooltip-content={tech}
                >
                  {IconComponent && <IconComponent />}
                  <Tooltip id={`tech-${tech}-${project.id}`} place="top" />
                </div>
              );
            })}
          {project.techStack && project.techStack.length > 4 && (
            <div className={styles.techMore}>
              +{project.techStack.length - 4}
            </div>
          )}
        </div>

        {/* Project Links */}
        <div className={styles.projectLinks}>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              onClick={(e) => e.stopPropagation()}
              data-tooltip-id={`demo-${project.id}`}
              data-tooltip-content="Live Demo"
            >
              <FaExternalLinkAlt />
              <Tooltip id={`demo-${project.id}`} place="top" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              onClick={(e) => e.stopPropagation()}
              data-tooltip-id={`github-${project.id}`}
              data-tooltip-content="View Code"
            >
              <FaGithub />
              <Tooltip id={`github-${project.id}`} place="top" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Project Modal Component
function ProjectModal({ project, isOpen, onClose }) {
  // Handle escape key press - must be called before any conditional returns
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
      closeTimeoutMS={300}
    >
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {project.title}
          </motion.h2>
          <motion.div
            className={styles.modalTechStack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.techStack &&
              project.techStack.map((tech, index) => {
                const IconComponent = techIcons[tech];
                return (
                  <motion.span
                    key={tech}
                    className={styles.modalTechBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {IconComponent && <IconComponent />}
                    {tech}
                  </motion.span>
                );
              })}
          </motion.div>
        </div>

        <div className={styles.modalBody}>
          {/* Video Demo */}
          {project.videoDemo && (
            <motion.div
              className={styles.videoContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <iframe
                src={project.videoDemo}
                title={`${project.title} Demo`}
                style={{ border: "none" }}
                allowFullScreen
              />
            </motion.div>
          )}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div
              className={styles.screenshots}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {project.screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={screenshot}
                    alt={`${project.title} Screenshot ${index + 1}`}
                    width={200}
                    height={120}
                    className={styles.screenshotImg}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Description and Features */}
          <motion.div
            className={styles.modalDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>About This Project</h3>
            <p>{project.description}</p>

            {project.features && project.features.length > 0 && (
              <>
                <h4>Key Features</h4>
                <ul className={styles.featuresList}>
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className={styles.modalActions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {project.liveDemo && (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt /> Live Demo
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub /> View Code
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}
