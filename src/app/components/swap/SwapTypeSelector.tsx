'use client';
import { useState } from 'react';
import styles from './styles.module.css';

interface SwapTypeSelectorProps {
  isBuying: boolean;
  onDirectionChange: (isBuying: boolean) => void;
}

export default function SwapTypeSelector({ isBuying, onDirectionChange }: SwapTypeSelectorProps) {
  const [animating, setAnimating] = useState(false);

  const toggleSwapDirection = () => {
    setAnimating(true);
    setTimeout(() => {
      onDirectionChange(!isBuying);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className={styles.swapTypeContainer}>
      <div className={`${styles.swapType} ${isBuying ? styles.active : ''}`}>Buy BTC</div>
      <button 
        className={`${styles.switchButton} ${animating ? styles.animating : ''}`} 
        onClick={toggleSwapDirection}
        type="button"
        aria-label="Switch between buy and sell"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
      </button>
      <div className={`${styles.swapType} ${!isBuying ? styles.active : ''}`}>Sell BTC</div>
    </div>
  );
}