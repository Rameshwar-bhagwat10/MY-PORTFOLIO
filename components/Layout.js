import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
