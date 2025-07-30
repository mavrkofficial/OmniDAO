import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

interface LPBondInterfaceProps {
  isConnected: boolean;
  account: string | null;
}

const LPBondInterface: React.FC<LPBondInterfaceProps> = ({ isConnected, account }) => {
  const [selectedPool, setSelectedPool] = useState('OMNI-ETH');
  const [amount, setAmount] = useState('');
  const [lpTokens, setLpTokens] = useState('0');
  const [neutralization, setNeutralization] = useState('Supply Neutralized');

  const lpPools = [
    { 
      symbol: 'OMNI-ETH', 
      name: 'OMNI/ETH Pool', 
      icon: '🌊',
      tvl: '$450,000',
      apy: '12.5%',
      neutralization: 'Active'
    },
    { 
      symbol: 'OMNI-USDT', 
      name: 'OMNI/USDT Pool', 
      icon: '🌊',
      tvl: '$320,000',
      apy: '15.2%',
      neutralization: 'Active'
    },
    { 
      symbol: 'OMNI-WETH', 
      name: 'OMNI/WETH Pool', 
      icon: '🌊',
      tvl: '$280,000',
      apy: '11.8%',
      neutralization: 'Active'
    },
  ];

  const handlePoolSelect = (pool: string) => {
    setSelectedPool(pool);
    // Mock calculation
    const mockLpTokens = { 'OMNI-ETH': '1250', 'OMNI-USDT': '890', 'OMNI-WETH': '720' };
    setLpTokens(mockLpTokens[pool as keyof typeof mockLpTokens]);
  };

  const calculateLPBond = () => {
    if (!amount || isNaN(Number(amount))) return;
    const inputAmount = Number(amount);
    const lpValue = inputAmount * 2.5; // Mock calculation
    setLpTokens(lpValue.toFixed(0));
  };

  const handleCreateLPBond = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    alert(`Creating LP bond for ${amount} in ${selectedPool}...\nThis would call the smart contract in a real implementation.`);
  };

  return (
    <div>
      <div>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          LP Bond Interface
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Acquire LP positions with supply neutralization for optimal liquidity management
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={4}>
        {/* LP Bond Creation */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={8}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create LP Bond</h2>
            
            {/* Pool Selection */}
            <div>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Select LP Pool</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={2}>
                {lpPools.map((pool) => (
                  <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={4} key={pool.symbol}>
                    <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card" 
                      style={{ 
                        cursor: 'pointer',
                        border: selectedPool === pool.symbol ? '2px solid var(--omni-primary)' : '1px solid rgba(99, 102, 241, 0.2)',
                        padding: '1rem'
                      }}
                      onClick={() => handlePoolSelect(pool.symbol)}
                    >
                      <div>
                        <span style={{ fontSize: '1.5rem' }}>{pool.icon}</span>
                        <div>
                          <p style={{ fontWeight: 'bold' }}>{pool.symbol}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>{pool.name}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={1}>
                        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>TVL</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{pool.tvl}</span>
                        </div>
                        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>APY</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{pool.apy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Provide</p>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={calculateLPBond}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  background: 'rgba(26, 26, 46, 0.6)',
                  color: 'var(--omni-text)',
                }}
              />
            </div>

            {/* LP Bond Details */}
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={2}>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-stat-card">
                    <span className="omni-stat-value">{lpTokens}</span>
                    <span className="omni-stat-label">LP Tokens</span>
                  </div>
                </div>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-stat-card">
                    <span className="omni-stat-value" style={{ color: 'var(--omni-success)' }}>
                      {neutralization}
                    </span>
                    <span className="omni-stat-label">Supply Status</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Create LP Bond Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCreateLPBond}
              disabled={!isConnected || !amount}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
                border: 'none',
                color: 'white',
                padding: '1rem',
              }}
            >
              {isConnected ? 'Create LP Bond' : 'Connect Wallet to Bond'}
            </Button>
          </div>
        </div>

        {/* LP Bond Information */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={4}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>LP Bond Information</h3>
            
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Supply Neutralization</p>
              <span style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                LP bonds automatically neutralize supply impact by minting and burning tokens strategically.
              </span>
            </div>

            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Vesting Period</p>
              <span style={{ color: 'var(--omni-text-secondary)' }}>14 days linear vesting</span>
            </div>

            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Minimum Bond</p>
              <span style={{ color: 'var(--omni-text-secondary)' }}>0.1 ETH equivalent</span>
            </div>

            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>LP Bond Benefits</p>
              <span style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • Earn trading fees from LP positions<br/>
                • Supply neutralization reduces price impact<br/>
                • Higher APY than regular bonds<br/>
                • Liquidity provision rewards
              </span>
            </div>
          </div>

          {/* LP Bond History */}
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card" style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Your LP Bonds</h3>
            <div>
              <span style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                No active LP bonds found.<br/>
                Connect your wallet to see your LP bond history.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPBondInterface; 