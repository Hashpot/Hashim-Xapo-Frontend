'use client';
import { useEffect, useState, useRef } from 'react';
import CurrencyInput from './CurrencyInput';
import SwapTypeSelector from './SwapTypeSelector';
import SuccessMessage from './SuccessMessage';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import RateDisplay from './RateDisplay';
import styles from './styles.module.css';

export default function SwapInterface() {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(true);
  const [btcAmount, setBtcAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [activeInput, setActiveInput] = useState<'btc' | 'usd'>('usd');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const btcInputRef = useRef<HTMLInputElement>(null);
  const usdInputRef = useRef<HTMLInputElement>(null);

  // Fetch BTC rate from API
  useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout>;
    let retryCount = 0;
    const maxRetries = 5;
    const baseDelay = 5000; // 5 seconds

    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.error || 'Failed to fetch rate');
        }
        
        const data = await response.json();
        setRate(data.bitcoin.usd);
        setLoading(false);
        retryCount = 0; // Reset retry count on success
      } catch (error: unknown) {
        console.error('Error fetching BTC rate:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch rate');
        setLoading(false);
        
        // Implement exponential backoff
        if (retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, retryCount);
          retryTimeout = setTimeout(fetchRate, delay);
          retryCount++;
        }
      }
    }

    fetchRate();

    // Use a longer interval to avoid rate limiting
    const interval = setInterval(fetchRate, 60000); // Once per minute
    
    return () => {
      clearInterval(interval);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  // Calculate conversion between BTC and USD
  const calculateAmount = (value: string, from: 'btc' | 'usd') => {
    if (!rate || value === '') return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (from === 'btc') {
      return (numValue * rate).toFixed(2);
    } else {
      return (numValue / rate).toFixed(8);
    }
  };

  // Handle input changes
  const handleBtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBtcAmount(value);
    setActiveInput('btc');
    setUsdAmount(calculateAmount(value, 'btc'));
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsdAmount(value);
    setActiveInput('usd');
    setBtcAmount(calculateAmount(value, 'usd'));
  };

  // Handle swap direction change
  const handleDirectionChange = (newDirection: boolean) => {
    setIsBuying(newDirection);
    
    // Swap active input when direction changes
    if (activeInput === 'btc') {
      setActiveInput('usd');
      setTimeout(() => usdInputRef.current?.focus(), 50);
    } else {
      setActiveInput('btc');
      setTimeout(() => btcInputRef.current?.focus(), 50);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!btcAmount || !usdAmount || !rate) return;
    
    // Animation for button press
    const button = document.querySelector('button[type="submit"]');
    button?.classList.add(styles.buttonPressed);
    
    setTimeout(() => {
      button?.classList.remove(styles.buttonPressed);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setBtcAmount('');
        setUsdAmount('');
        setActiveInput('usd');
      }, 3000);
    }, 300);
  };

  // Loading state
  if (loading && !rate) {
    return (
      <div className={styles.container}>
        <LoadingState />
      </div>
    );
  }

  // Error state
  if (error && !rate) {
    return (
      <div className={styles.container}>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  // Success state or main interface
  return (
    <div className={styles.container}>
      {showSuccess ? (
        <SuccessMessage 
          isBuying={isBuying}
          btcAmount={btcAmount}
          usdAmount={usdAmount}
        />
      ) : (
        <>
          <div className={styles.header}>
            <h1>Crypto Swap</h1>
            {rate && <RateDisplay rate={rate} />}
          </div>
          
          <SwapTypeSelector 
            isBuying={isBuying} 
            onDirectionChange={handleDirectionChange} 
          />

          <form onSubmit={handleSubmit} className={styles.swapForm}>
            <CurrencyInput
              ref={usdInputRef}
              id="usdAmount"
              label="USD"
              value={usdAmount}
              onChange={handleUsdChange}
              isActive={activeInput === 'usd'}
              currencySymbol="$"
              placeholder="0.00"
              step="0.01"
            />
            
            <CurrencyInput
              ref={btcInputRef}
              id="btcAmount"
              label="BTC"
              value={btcAmount}
              onChange={handleBtcChange}
              isActive={activeInput === 'btc'}
              currencySymbol="₿"
              placeholder="0.00000000"
              step="0.00000001"
            />
            
            <div className={styles.summaryContainer}>
              <div className={styles.summary}>
                <p>
                  {isBuying
                    ? `You will spend $${usdAmount || '0.00'} to buy ${btcAmount || '0.00000000'} BTC`
                    : `You will sell ${btcAmount || '0.00000000'} BTC for $${usdAmount || '0.00'}`}
                </p>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={styles.confirmButton}
              disabled={!btcAmount || !usdAmount || parseFloat(btcAmount) <= 0 || parseFloat(usdAmount) <= 0}
            >
              {isBuying ? 'Buy Bitcoin' : 'Sell Bitcoin'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}