import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

const BondInterface: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [bondAmount, setBondAmount] = useState('0');
  const [discount, setDiscount] = useState('5.2%');
  const [isConnected, setIsConnected] = useState(false); // Mock connection state

  const bondTokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
    { symbol: 'WETH', name: 'Wrapped Ethereum', icon: '🔷' },
    { symbol: 'USDT', name: 'Tether USD', icon: '💵' },
    { symbol: 'SOLVBTC', name: 'SolvBTC', icon: '₿' },
  ];

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token);
    // Mock calculation - in real app this would call contract
    const mockDiscounts = { ETH: '5.2%', WETH: '4.8%', USDT: '6.1%', SOLVBTC: '7.3%' };
    setDiscount(mockDiscounts[token as keyof typeof mockDiscounts]);
  };

  const calculateBond = () => {
    if (!amount || isNaN(Number(amount))) return;
    const inputAmount = Number(amount);
    const discountRate = parseFloat(discount.replace('%', '')) / 100;
    const bondValue = inputAmount * (1 + discountRate);
    setBondAmount(bondValue.toFixed(2));
  };

  const handleCreateBond = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    alert(`Creating bond for ${amount} ${selectedToken}...\nThis would call the smart contract in a real implementation.`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Bond Interface
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Purchase OMNI tokens at a discount through our sophisticated multi-currency bonding mechanism
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={4}>
        {/* Bond Creation */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={8}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create New Bond</h2>
            
            {/* Token Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Select Bond Token</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={2}>
                {bondTokens.map((token) => (
                  <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6} sm={3} key={token.symbol}>
                    <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card" 
                      style={{ 
                        cursor: 'pointer',
                        border: selectedToken === token.symbol ? '2px solid var(--omni-primary)' : '1px solid rgba(99, 102, 241, 0.2)',
                        textAlign: 'center',
                        padding: '1rem'
                      }}
                      onClick={() => handleTokenSelect(token.symbol)}
                    >
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{token.icon}</span>
                      <p style={{ fontWeight: 'bold' }}>{token.symbol}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>{token.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Bond</p>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={calculateBond}
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={2}>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Current Discount</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{discount}</div>
                  </div>
                </div>
                <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={6}>
                  <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>OMNI to Receive</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{bondAmount}</div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCreateBond}
              disabled={!isConnected || !amount || Number(amount) <= 0}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
                border: 'none',
                color: 'white',
                padding: '1rem',
              }}
            >
              {isConnected ? `Bond ${selectedToken}` : 'Connect Wallet to Bond'}
            </Button>
          </div>
        </div>

        {/* Bond Statistics */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={4}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Bond Statistics</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Bonds Created</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>156</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Value Bonded</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>$2.4M</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Average Discount</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>5.8%</div>
            </div>
            
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Vesting Period</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>7 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondInterface; 