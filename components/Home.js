import styles from '../styles/home.module.css';
import Image from 'next/image';
import { ReactTyped } from 'react-typed';
import { useState } from 'react';
import profilePic from '../public/assets/ProfilePic.jpg';
import ChatBot from './ChatBot';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Head from 'next/head';

const SOCIALS = [
  { icon: <FaGithub />, url: 'https://github.com/rameshwar', label: 'GitHub' },
  { icon: <FaLinkedin />, url: 'https://linkedin.com/in/rameshwar', label: 'LinkedIn' },
  { icon: <FaTwitter />, url: 'https://twitter.com/rameshwar', label: 'Twitter' }
];

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Rameshwar Bhagwat | Full-Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Welcome to the portfolio of Rameshwar Bhagwat — a passionate Full-Stack Developer, UI/UX enthusiast, and tech explorer. Explore my projects, skills, and ways to connect."
        />
        <meta
          name="keywords"
          content="Rameshwar Bhagwat, Full-Stack Developer, Web Developer, Portfolio, UI/UX, Next.js, React, MongoDB, Node.js"
        />
        <meta name="author" content="Rameshwar Bhagwat" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Rameshwar Bhagwat | Full-Stack Developer Portfolio" />
        <meta
          property="og:description"
          content="Check out my portfolio to see my projects, skills, and contact details. Let's build something great together!"
        />
        <meta property="og:image" content="/assets/ProfilePic.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-domain.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rameshwar Bhagwat | Full-Stack Developer Portfolio" />
        <meta
          name="twitter:description"
          content="Passionate about building responsive web apps and creating amazing user experiences."
        />
        <meta name="twitter:image" content="/assets/ProfilePic.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Fonts (optional) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section id="home" className={styles.home}>
        <div className={styles.container}>
          {/* Profile image at the top */}
          <div className={styles.imageWrapper}>
            <Image
              src={profilePic}
              alt="Rameshwar Bhagwat - Full-Stack Developer"
              className={styles.profileImg}
              priority
              title="Rameshwar Bhagwat"
            />
          </div>

          {/* All texts and buttons below the image */}
          <div className={styles.intro}>
            <h1 className={styles.outfitHeading}>
              Hello, I&apos;m <span className={styles.highlight}>Rameshwar Bhagwat</span>
            </h1>
            <ReactTyped
              className={styles.typed}
              strings={['Full-Stack Developer', 'UI/UX Enthusiast', 'Tech Explorer']}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
            <p className={styles.description}>
              Passionate about building responsive web applications and interactive user experiences.
            </p>

            <div className={styles.buttonRow}>
              <a href="#projects" className={styles.ctaBtn}>View Projects</a>
              <a href="#contact" className={styles.contactBtn}>Contact Me</a>

              {/* Floating Chat Button */}
              <button className={styles.chatToggle} onClick={() => setIsChatOpen(!isChatOpen)}>
                {isChatOpen ? '✖ Close Chat' : 'Chat with Me'}
              </button>
            </div>

            {isChatOpen && <ChatBot closeChat={() => setIsChatOpen(false)} />}

            <div className={styles.socialRow}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={styles.socialIcon}
                  tabIndex={0}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
