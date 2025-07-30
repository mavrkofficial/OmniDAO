import React, { useState } from 'react';
import { Card, Grid, Text, Heading, Button, Input } from '@inkonchain/ink-kit';

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
    <Box style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <Box textAlign="center" marginBottom={4}>
        <Heading size="xl" className="omni-gradient-text" marginBottom={2}>
          Bond Interface
        </Heading>
        <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Purchase OMNI tokens at a discount through our sophisticated multi-currency bonding mechanism
        </Text>
      </Box>

      <Grid container spacing={4}>
        {/* Bond Creation */}
        <Grid item xs={12} md={8}>
          <Card className="omni-card">
            <Heading size="lg" marginBottom={3}>Create New Bond</Heading>
            
            {/* Token Selection */}
            <Box marginBottom={3}>
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
            </Box>

            {/* Amount Input */}
            <Box marginBottom={3}>
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
            </Box>

            {/* Bond Details */}
            <Box marginBottom={3}>
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
            </Box>

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
            <Heading size="md" marginBottom={3}>Bond Information</Heading>
            
            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Vesting Period</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>7 days linear vesting</Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Minimum Bond</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>0.01 {selectedToken}</Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Maximum Bond</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>No limit</Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Bond Terms</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • Bonds are non-transferable during vesting<br/>
                • Discount rates vary by token<br/>
                • Revenue sharing starts immediately<br/>
                • No early withdrawal penalty
              </Text>
            </Box>
          </Card>

          {/* Recent Bonds */}
          <Card className="omni-card" style={{ marginTop: '1rem' }}>
            <Heading size="md" marginBottom={3}>Recent Bonds</Heading>
            <Box>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                No recent bonds to display.<br/>
                Connect your wallet to see your bond history.
              </Text>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BondInterface; 