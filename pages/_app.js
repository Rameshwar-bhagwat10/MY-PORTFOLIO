import { useEffect } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
   
