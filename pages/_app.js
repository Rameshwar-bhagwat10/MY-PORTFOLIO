import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/mobile-utils.css';
import Layout from '../components/Layout';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
   
