import React, { useState } from 'react';
import { Card, Grid, Text, Button, Input } from '@inkonchain/ink-kit';

interface BondInterfaceProps {
  isConnected: boolean;
  account: string | null;
}

const BondInterface: React.FC<BondInterfaceProps> = ({ isConnected, account }) => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [bondAmount, setBondAmount] = useState('0');
  const [discount, setDiscount] = useState('5.2%');

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
        <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Purchase OMNI tokens at a discount through our sophisticated multi-currency bonding mechanism
        </Text>
      </div>

      <Grid container spacing={4}>
        {/* Bond Creation */}
        <Grid item xs={12} md={8}>
          <Card className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create New Bond</h2>
            
            {/* Token Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Select Bond Token</Text>
              <Grid container spacing={2}>
                {bondTokens.map((token) => (
                  <Grid item xs={6} sm={3} key={token.symbol}>
                    <Card 
                      className="omni-card" 
                      style={{ 
                        cursor: 'pointer',
                        border: selectedToken === token.symbol ? '2px solid var(--omni-primary)' : '1px solid rgba(99, 102, 241, 0.2)',
                        textAlign: 'center',
                        padding: '1rem'
                      }}
                      onClick={() => handleTokenSelect(token.symbol)}
                    >
                      <Text style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{token.icon}</Text>
                      <Text style={{ fontWeight: 'bold' }}>{token.symbol}</Text>
                      <Text style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>{token.name}</Text>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>

            {/* Amount Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Bond</Text>
              <Input
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card className="omni-stat-card">
                    <Text className="omni-stat-value">{discount}</Text>
                    <Text className="omni-stat-label">Discount Rate</Text>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card className="omni-stat-card">
                    <Text className="omni-stat-value">{bondAmount} OMNI</Text>
                    <Text className="omni-stat-label">You'll Receive</Text>
                  </Card>
                </Grid>
              </Grid>
            </div>

            {/* Create Bond Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCreateBond}
              disabled={!isConnected || !amount}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
                border: 'none',
                color: 'white',
                padding: '1rem',
              }}
            >
              {isConnected ? 'Create Bond' : 'Connect Wallet to Bond'}
            </Button>
          </Card>
        </Grid>

        {/* Bond Information */}
        <Grid item xs={12} md={4}>
          <Card className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Bond Information</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Vesting Period</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>7 days linear vesting</Text>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Minimum Bond</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>0.01 {selectedToken}</Text>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Maximum Bond</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>No limit</Text>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Bond Terms</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • Bonds are non-transferable during vesting<br/>
                • Discount rates vary by token<br/>
                • Revenue sharing starts immediately<br/>
                • No early withdrawal penalty
              </Text>
            </div>
          </Card>

          {/* Recent Bonds */}
          <Card className="omni-card" style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Recent Bonds</h3>
            <div>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                No recent bonds to display.<br/>
                Connect your wallet to see your bond history.
              </Text>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default BondInterface; 