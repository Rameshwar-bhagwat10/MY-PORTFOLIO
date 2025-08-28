import { useState, useEffect } from 'react';
import { FiUsers, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import styles from '../styles/visitorStats.module.css';

export default function VisitorStats() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    loading: true
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors');
        if (response.ok) {
          const data = await response.json();
          setStats({
            ...data,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
    
    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button 
        className={styles.toggleButton}
        onClick={() => setIsVisible(true)}
        title="View Visitor Statistics"
      >
        📊
      </button>
    );
  }

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <h3>Visitor Analytics</h3>
        <button 
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FiUsers className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>
              {stats.loading ? '...' : stats.totalVisitors.toLocaleString()}
            </span>
            <span className={styles.statLabel}>Total Visitors</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FiTrendingUp className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>
              {stats.loading ? '...' : stats.uniqueVisitors.toLocaleString()}
            </span>
            <span className={styles.statLabel}>Unique Visitors</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FiCalendar className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>
              {stats.loading ? '...' : new Date().toLocaleDateString()}
            </span>
            <span className={styles.statLabel}>Last Updated</span>
          </div>
        </div>
      </div>
    </div>
  );
}