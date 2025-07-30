import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Card, Container, Grid, Text, Heading, Box } from '@inkonchain/ink-kit';
import './App.css';
import Dashboard from './components/Dashboard';
import BondInterface from './components/BondInterface';
import LPBondInterface from './components/LPBondInterface';
import DAOGovernance from './components/DAOGovernance';
import StakingInterface from './components/StakingInterface';
import RevenueAnalytics from './components/RevenueAnalytics';
import Navigation from './components/Navigation';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation 
          isConnected={isConnected} 
          account={account} 
          onConnect={connectWallet}
        />
        
        <Container maxWidth="xl" className="main-container">
          <Routes>
            <Route path="/" element={<Dashboard isConnected={isConnected} account={account} />} />
            <Route path="/bonds" element={<BondInterface isConnected={isConnected} account={account} />} />
            <Route path="/lp-bonds" element={<LPBondInterface isConnected={isConnected} account={account} />} />
            <Route path="/governance" element={<DAOGovernance isConnected={isConnected} account={account} />} />
            <Route path="/staking" element={<StakingInterface isConnected={isConnected} account={account} />} />
            <Route path="/analytics" element={<RevenueAnalytics isConnected={isConnected} account={account} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App; 