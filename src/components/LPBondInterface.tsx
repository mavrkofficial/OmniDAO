import React, { useState } from 'react';
import { Card, Container, Grid, Text, Heading, Box, Button, Input } from '@inkonchain/ink-kit';

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
    <Container maxWidth="xl">
      <Box textAlign="center" marginBottom={4}>
        <Heading size="xl" className="omni-gradient-text" marginBottom={2}>
          LP Bond Interface
        </Heading>
        <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Acquire LP positions with supply neutralization for optimal liquidity management
        </Text>
      </Box>

      <Grid container spacing={4}>
        {/* LP Bond Creation */}
        <Grid item xs={12} md={8}>
          <Card className="omni-card">
            <Heading size="lg" marginBottom={3}>Create LP Bond</Heading>
            
            {/* Pool Selection */}
            <Box marginBottom={3}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Select LP Pool</Text>
              <Grid container spacing={2}>
                {lpPools.map((pool) => (
                  <Grid item xs={12} sm={6} md={4} key={pool.symbol}>
                    <Card 
                      className="omni-card" 
                      style={{ 
                        cursor: 'pointer',
                        border: selectedPool === pool.symbol ? '2px solid var(--omni-primary)' : '1px solid rgba(99, 102, 241, 0.2)',
                        padding: '1rem'
                      }}
                      onClick={() => handlePoolSelect(pool.symbol)}
                    >
                      <Box display="flex" alignItems="center" gap={2} marginBottom={1}>
                        <Text style={{ fontSize: '1.5rem' }}>{pool.icon}</Text>
                        <Box>
                          <Text style={{ fontWeight: 'bold' }}>{pool.symbol}</Text>
                          <Text style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>{pool.name}</Text>
                        </Box>
                      </Box>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Text style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>TVL</Text>
                          <Text style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{pool.tvl}</Text>
                        </Grid>
                        <Grid item xs={6}>
                          <Text style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)' }}>APY</Text>
                          <Text style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{pool.apy}</Text>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Amount Input */}
            <Box marginBottom={3}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Provide</Text>
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
            </Box>

            {/* LP Bond Details */}
            <Box marginBottom={3}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card className="omni-stat-card">
                    <Text className="omni-stat-value">{lpTokens}</Text>
                    <Text className="omni-stat-label">LP Tokens</Text>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card className="omni-stat-card">
                    <Text className="omni-stat-value" style={{ color: 'var(--omni-success)' }}>
                      {neutralization}
                    </Text>
                    <Text className="omni-stat-label">Supply Status</Text>
                  </Card>
                </Grid>
              </Grid>
            </Box>

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
          </Card>
        </Grid>

        {/* LP Bond Information */}
        <Grid item xs={12} md={4}>
          <Card className="omni-card">
            <Heading size="md" marginBottom={3}>LP Bond Information</Heading>
            
            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Supply Neutralization</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                LP bonds automatically neutralize supply impact by minting and burning tokens strategically.
              </Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Vesting Period</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>14 days linear vesting</Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Minimum Bond</Text>
              <Text style={{ color: 'var(--omni-text-secondary)' }}>0.1 ETH equivalent</Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>LP Bond Benefits</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • Earn trading fees from LP positions<br/>
                • Supply neutralization reduces price impact<br/>
                • Higher APY than regular bonds<br/>
                • Liquidity provision rewards
              </Text>
            </Box>
          </Card>

          {/* LP Bond History */}
          <Card className="omni-card" style={{ marginTop: '1rem' }}>
            <Heading size="md" marginBottom={3}>Your LP Bonds</Heading>
            <Box>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                No active LP bonds found.<br/>
                Connect your wallet to see your LP bond history.
              </Text>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LPBondInterface; 