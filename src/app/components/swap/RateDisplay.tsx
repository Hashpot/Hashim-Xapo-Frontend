'use client';
import styles from './styles.module.css';

interface RateDisplayProps {
  rate: number;
}

export default function RateDisplay({ rate }: RateDisplayProps) {
  return <p className={styles.rate}>1 BTC = ${rate.toLocaleString()}</p>;
}