import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Removed Box import - using div instead
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';
import Dashboard from './components/Dashboard';
import BondInterface from './components/BondInterface';
import LPBondInterface from './components/LPBondInterface';
import DAOGovernance from './components/DAOGovernance';
import StakingInterface from './components/StakingInterface';
import RevenueAnalytics from './components/RevenueAnalytics';
import Navigation from './components/Navigation';
import { ChainProvider } from './contexts/ChainContext';
import { wagmiConfig } from './config/rainbowkit';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider>
        <QueryClientProvider client={queryClient}>
          <ChainProvider>
            <Router>
              <div className="App">
                <Navigation />
                
                <div className="main-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/bonds" element={<BondInterface />} />
                    <Route path="/lp-bonds" element={<LPBondInterface />} />
                    <Route path="/governance" element={<DAOGovernance />} />
                    <Route path="/staking" element={<StakingInterface />} />
                    <Route path="/analytics" element={<RevenueAnalytics />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </ChainProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App; 