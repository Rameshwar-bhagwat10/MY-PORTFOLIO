import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/projects.module.css';

const projectData = [{
  id: 1,
  title: 'E-Commerce App',
  thumbnail: '/assets/ecommerce.jpg',
  screenshots: ['/assets/ecommerce1.png', '/assets/ecommerce2.png'],
  tech: ['Next.js', 'MongoDB', 'CSS Modules'],
  description: 'Advanced e-commerce application with cart & admin features.',
  type: 'frontend',
  live: 'https://your-ecommerce.com',
  repo: 'https://github.com/you/ecommerce',
  features: [
    'Product catalog & search',
    'Secure checkout with Stripe',
    'Order tracking & notifications',
    'Admin dashboard for inventory'
  ],
  techStack: ['Next.js', 'Express', 'MongoDB', 'Stripe API']
},
{
  id: 2,
  title: 'Portfolio Website',
  thumbnail: '/assets/portfolio.png',
  screenshots: [
    '/assets/portfolio1.png',
    '/assets/portfolio2.png'
  ],
  tech: ['Next.js', 'CSS'],
  description: 'Responsive portfolio showcasing my work & skills.',
  type: 'frontend',
  live: 'https://your-portfolio.com',
  repo: 'https://github.com/you/portfolio',
  features: [
    'Dynamic project galleries',
    'Smooth scrolling & animations',
    'Contact form with emailJS',
    'Dark mode toggle'
  ],
  techStack: ['Next.js', 'CSS', 'emailJS']
},
{
  id: 3,
  title: 'Python ChatBot',
  thumbnail: '/assets/chatbot.png',
  screenshots: ['/assets/chatbot1.png', '/assets/chatbot2.png'],
  tech: ['Python', 'Tkinter', 'NLP'],
  description: 'Interactive NLP-based chatbot with GUI.',
  type: 'backend',
  live: '',
  repo: 'https://github.com/you/chatbot',
  features: [
    'Natural language processing',
    'Customizable responses',
    'Multi-language support',
    'Easy integration with websites'
  ],
  techStack: ['Python', 'Tkinter', 'NLTK']
},
{
  id: 4,
  title: 'Smart Attendance System',
  thumbnail: '/assets/Attendance.png',
  screenshots: ['/assets/Attendance1.png', '/assets/Attendance2.png'],
  tech: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
  description: 'AI-powered attendance tracking for classrooms.',
  type: 'backend',
  live: 'https://your-attendance-system.com',
  repo: 'https://github.com/you/smart-attendance',
  features: [
    'Face recognition for secure check-in',
    'Real-time analytics dashboard',
    'Automated attendance reports',
    'Mobile-friendly interface'
  ],
  techStack: ['React', 'Node.js', 'TensorFlow', 'MongoDB']
},
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" }
];


export default function Projects() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, img: '', alt: '' });
  const carouselRef = useRef(null);
  const [centerIdx, setCenterIdx] = useState(1); // Center first card by default

  const filteredProjects = projectData.filter(project => {
    const matchesType = filter === 'all' || project.type === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      (project.features && project.features.some(f => f.toLowerCase().includes(term))) ||
      (project.techStack && project.techStack.some(t => t.toLowerCase().includes(term)));
    return matchesType && matchesSearch;
  });

  useEffect(() => {
    const slick = carouselRef.current;
    if (!slick) return;
    const handleScroll = () => {
      const children = Array.from(slick.children);
      const idx = children.findIndex((child) => {
        const { left, width } = child.getBoundingClientRect();
        const parentLeft = slick.getBoundingClientRect().left;
        const childCenter = left - parentLeft + width / 2;
        return Math.abs(childCenter - slick.clientWidth / 2) < width / 2;
      });
      setCenterIdx(idx);
    };
    slick.addEventListener('scroll', handleScroll, { passive: true });
    // Center the first card on mount
    const scrollToFirst = () => {
      const children = Array.from(slick.children);
      if (children.length > 1) {
        const firstCard = children[1]; // 0 is spacer, 1 is first card
        const offset =
          firstCard.offsetLeft + firstCard.offsetWidth / 2 - slick.clientWidth / 2;
        slick.scrollLeft = offset;
      }
    };
    scrollToFirst();
    handleScroll();
    return () => slick.removeEventListener('scroll', handleScroll);
  }, [filteredProjects.length]);

  const closeModal = () => setModal({ open: false, img: '', alt: '' });

  return (
    <section id="projects" className={styles.projectsSection}>
      <h2 className={styles.title}>My Projects</h2>
      <p style={{textAlign: 'center', maxWidth: 700, margin: '0 auto 32px', color: 'var(--text)'}}>
        Explore a selection of my best work, showcasing real-world solutions, modern tech stacks, and a focus on user experience.
      </p>
      <div className={styles.controls}>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.spacer} />
          {filteredProjects.map((proj, i) => (
            <div
              key={proj.id}
              className={`${styles.card} ${i + 1 === centerIdx ? styles.center : styles.side}`}
              tabIndex={0}
            >
              <Image
                src={proj.thumbnail}
                alt={proj.title}
                className={styles.profileImg}
                loading="lazy"
                width={120}
                height={120}
              />
              <div className={styles.info}>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                {proj.features && (
                  <ul className={styles.featuresList}>
                    {proj.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                )}
                {proj.techStack && (
                  <div className={styles.techStack}>
                    {proj.techStack.map((tech, idx) => (
                      <span className={styles.techBadge} key={idx}>{tech}</span>
                    ))}
                  </div>
                )}
                <div className={styles.links}>
                  {proj.live && <a href={proj.live} target="_blank" rel="noopener noreferrer">Live</a>}
                  <a href={proj.repo} target="_blank" rel="noopener noreferrer">Repo</a>
                </div>
                <div className={styles.screenshots}>
                  {proj.screenshots.map((shot, idx) => (
                    <Image
                      key={idx}
                      src={shot}
                      alt={`${proj.title} screenshot ${idx + 1}`}
                      className={styles.screenshotImg}
                      loading="lazy"
                      onClick={() => setModal({ open: true, img: shot, alt: `${proj.title} screenshot ${idx + 1}` })}
                      tabIndex={0}
                      style={{cursor: 'zoom-in'}}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') setModal({ open: true, img: shot, alt: `${proj.title} screenshot ${idx + 1}` });
                      }}
                      aria-label="Open screenshot"
                      width={80}
                      height={50}
                    />
                  ))}
                </div>
                <button
                  className={styles.moreInfoBtn}
                  onClick={() => window.open('https://github.com/rameshwar', '_blank')}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
          <div className={styles.spacer} />
        </div>
      </div>
      <div className={styles.dots}>
        {filteredProjects.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${centerIdx === idx + 1 ? styles.activeDot : ''}`}
          />
        ))}
      </div>

      {/* Screenshot Modal */}
      {modal.open && (
        <div className={styles.screenshotModalOverlay} onClick={closeModal}>
          <button
            className={styles.screenshotModalClose}
            onClick={closeModal}
            aria-label="Close screenshot"
            tabIndex={0}
          >
            &times;
          </button>
          <Image
            src={modal.img}
            alt={modal.alt}
            className={styles.screenshotModalImg}
            onClick={e => e.stopPropagation()}
            width={400}
            height={250}
          />
        </div>
      )}
    </section>
  );
}

