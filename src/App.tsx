import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Removed Box import - using div instead
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';
import Dashboard from './components/Dashboard';
import Presale from './components/Presale';
import BondInterface from './components/BondInterface';
import LPBondInterface from './components/LPBondInterface';
import DAOGovernance from './components/DAOGovernance';
import StakingInterface from './components/StakingInterface';
import RevenueAnalytics from './components/RevenueAnalytics';
import Navigation from './components/Navigation';
import { ChainProvider } from './contexts/ChainContext';
import { config } from './config/rainbowkit';
import { getAppConfig } from './config/appConfig';

const queryClient = new QueryClient();

function App() {
  const appConfig = getAppConfig();
  
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <ChainProvider>
            <Router>
              <div className="App">
                <Navigation />
                
                <div className="main-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                  <Routes>
                    {/* Default redirect based on config */}
                    <Route path="/" element={
                      appConfig.isPresaleOnly ? <Navigate to="/presale" replace /> : <Dashboard />
                    } />
                    
                    {/* Presale - always available */}
                    <Route path="/presale" element={<Presale />} />
                    
                    {/* Other routes - only available if not presale-only */}
                    {!appConfig.isPresaleOnly && (
                      <>
                        <Route path="/bonds" element={<BondInterface />} />
                        <Route path="/lp-bonds" element={<LPBondInterface />} />
                        <Route path="/governance" element={<DAOGovernance />} />
                        <Route path="/staking" element={<StakingInterface />} />
                        <Route path="/analytics" element={<RevenueAnalytics />} />
                      </>
                    )}
                    
                    {/* Catch all - redirect to default */}
                    <Route path="*" element={
                      <Navigate to={appConfig.defaultRoute} replace />
                    } />
                  </Routes>
                </div>
              </div>
            </Router>
          </ChainProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App; 
