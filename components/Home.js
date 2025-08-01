import styles from '../styles/home.module.css';
import Image from 'next/image';
import { ReactTyped } from 'react-typed';
import { useState } from 'react';
import profilePic from '../public/assets/profile.png';
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
        {/* If you have any <link> for custom fonts here, move them to pages/_document.js as per Next.js best practices.
        <link
          href='https://fonts.googleapis.com/css?family=Outfit&display=optional'
          rel="stylesheet"
        /> */}
      </Head>
      <section id="home" className={styles.home}>
        <div className={styles.container}>
          {/* Profile image at the top */}
          <div className={styles.imageWrapper}>
            <Image src={profilePic} alt="Profile" className={styles.profileImg} priority />
          </div>
          {/* All texts and buttons below the image */}
          <div className={styles.intro}>
            <h1 className={styles.outfitHeading}>
              Hello, I&apos;m <span className={styles.highlight}>Rameshwar bhagwat</span>
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
              {SOCIALS.map(s => (
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
