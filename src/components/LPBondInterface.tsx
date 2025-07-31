import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

const LPBondInterface: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState('ETH-USDT');
  const [lpAmount, setLpAmount] = useState('');
  const [bondAmount, setBondAmount] = useState('0');
  const [discount, setDiscount] = useState('8.5%');
  const [isConnected] = useState(false); // Mock connection state

  const lpPools = [
    { 
      symbol: 'ETH-USDT', 
      name: 'Ethereum / Tether', 
      icon: '🔷💵',
      tvl: '$1.2M',
      apr: '12.5%',
      discount: '8.5%'
    },
    { 
      symbol: 'ETH-WETH', 
      name: 'Ethereum / Wrapped ETH', 
      icon: '🔷🔷',
      tvl: '$850K',
      apr: '15.2%',
      discount: '7.8%'
    },
    { 
      symbol: 'USDT-SOLVBTC', 
      name: 'Tether / SolvBTC', 
      icon: '💵₿',
      tvl: '$650K',
      apr: '18.7%',
      discount: '9.2%'
    },
  ];

  const handlePoolSelect = (pool: string) => {
    setSelectedPool(pool);
    const selectedPoolData = lpPools.find(p => p.symbol === pool);
    if (selectedPoolData) {
      setDiscount(selectedPoolData.discount);
    }
  };

  const calculateLPBond = () => {
    if (!lpAmount || isNaN(Number(lpAmount))) return;
    const inputAmount = Number(lpAmount);
    const discountRate = parseFloat(discount.replace('%', '')) / 100;
    const bondValue = inputAmount * (1 + discountRate);
    setBondAmount(bondValue.toFixed(2));
  };

  const handleCreateLPBond = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!lpAmount || Number(lpAmount) <= 0) {
      alert('Please enter a valid LP amount!');
      return;
    }
    alert(`Creating LP bond for ${lpAmount} ${selectedPool} LP tokens...\nThis would call the smart contract in a real implementation.`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          LP Bond Interface
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Acquire LP positions with supply neutralization through our advanced bonding mechanism
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {/* LP Bond Creation */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create LP Bond</h2>
            
            {/* Pool Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Select LP Pool</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {lpPools.map((pool) => (
                  <div style={{ flex: "1 1 300px", minWidth: "300px" }} key={pool.symbol}>
                    <div style={{ 
                      background: "var(--omni-card-bg)", 
                      borderRadius: "12px", 
                      padding: "1rem",
                      border: selectedPool === pool.symbol ? '2px solid var(--omni-primary)' : '1px solid var(--omni-border)',
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      cursor: 'pointer',
                      textAlign: 'center'
                    }} className="omni-card"
                      onClick={() => handlePoolSelect(pool.symbol)}
                    >
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{pool.icon}</span>
                      <p style={{ fontWeight: 'bold' }}>{pool.symbol}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>{pool.name}</span>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--omni-success)' }}>APR: {pool.apr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LP Amount Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>LP Tokens to Bond</p>
              <input
                type="number"
                placeholder="Enter LP token amount"
                value={lpAmount}
                onChange={(e) => setLpAmount(e.target.value)}
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

            {/* Bond Details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>LP Discount</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{discount}</div>
                  </div>
                </div>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>OMNI to Receive</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{bondAmount}</div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="large"
              onClick={handleCreateLPBond}
              disabled={!isConnected || !lpAmount || Number(lpAmount) <= 0}
            >
              {isConnected ? `Bond ${selectedPool} LP` : 'Connect Wallet to Bond'}
            </Button>
          </div>
        </div>

        {/* LP Bond Statistics */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>LP Bond Statistics</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total LP Bonds</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>89</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total LP Value</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>$1.8M</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Average LP Discount</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>8.2%</div>
            </div>
            
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Supply Neutralization</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPBondInterface; 
