'use client';
import styles from './styles.module.css';

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading current exchange rates...</p>
    </div>
  );
}