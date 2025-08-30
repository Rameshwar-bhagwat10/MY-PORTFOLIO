import Head from "next/head";
import Home from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import DevPlayground from "../components/DevPlayground";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Rameshwar Bhagwat - Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Developer specializing in React, Next.js, and modern web technologies. View my portfolio, projects, and get in touch."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#0070f3" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <DevPlayground />
    </>
  );
}
