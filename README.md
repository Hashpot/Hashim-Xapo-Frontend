# Crypto Swap Interface


## Features

- Real-time BTC/USD exchange rate (I say real time but public API's are very slow and not reliable)
- Seamless toggle between buy and sell modes
- Dynamic conversion calculations
- Animated success confirmation
- Responsive design
- Component-based architecture

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **API**: CoinGecko for BTC prices

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm, yarn, pnpm, or bun

### Installation


1. Install dependencies:

npm install

### Running the Development Server

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Project Structure

```
/src
  /app
    /components
      /swap
        index.tsx           # Main container component
        CurrencyInput.tsx   # Reusable input component
        SwapTypeSelector.tsx # Buy/Sell toggle
        RateDisplay.tsx     # Exchange rate display
        SuccessMessage.tsx  # Transaction success
        LoadingState.tsx    # Loading UI
        ErrorState.tsx      # Error handling UI 
        styles.module.css   # Component styles
    layout.tsx              # App layout
    page.tsx                # Main page wrapper
  /public                   # Static assets
```

## Component Architecture

The application follows a modular component-based architecture:

- **SwapInterface (index.tsx)**: Main container that manages state and orchestrates child components
- **UI Components**: Individual, reusable UI elements (CurrencyInput, SwapTypeSelector, etc.)
- **State Components**: Components for different application states (Loading, Error, Success)

## API Usage

The application uses the CoinGecko API to fetch real-time BTC/USD prices. The API is called once per minute to avoid rate limiting.

## Future Improvements

See [IDEAS.md](./IDEAS.md) for a list of potential future enhancements.


