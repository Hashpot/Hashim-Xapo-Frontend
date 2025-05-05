'use client';
import { forwardRef } from 'react';
import styles from './styles.module.css';

interface CurrencyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
  currencySymbol: string;
  placeholder: string;
  step: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ id, label, value, onChange, isActive, currencySymbol, placeholder, step }, ref) => {
    return (
      <div className={styles.inputGroup}>
        <label htmlFor={id}>
          {label === 'USD' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12h6M9 8h4.5a2.5 2.5 0 0 1 0 5H9m0 3h4.5a2.5 2.5 0 0 0 0-5H9"/>
            </svg>
          )}
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step={step}
          min="0"
          className={isActive ? styles.activeInput : ''}
          required
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;