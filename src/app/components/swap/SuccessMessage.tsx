'use client';
import styles from './styles.module.css';

interface SuccessMessageProps {
  isBuying: boolean;
  btcAmount: string;
  usdAmount: string;
}

export default function SuccessMessage({ isBuying, btcAmount, usdAmount }: SuccessMessageProps) {
  return (
    <div className={`${styles.successMessage} ${styles.show}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h2>Transaction Successful!</h2>
      <p>
        {isBuying 
          ? `You purchased ${btcAmount} BTC for $${usdAmount}` 
          : `You sold ${btcAmount} BTC for $${usdAmount}`}
      </p>
    </div>
  );
}