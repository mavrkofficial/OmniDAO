import React, { useState } from 'react';
import { Card, Grid, Text, Heading, Button, Input } from '@inkonchain/ink-kit';

interface StakingInterfaceProps {
  isConnected: boolean;
  account: string | null;
}

const StakingInterface: React.FC<StakingInterfaceProps> = ({ isConnected, account }) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [claimAmount, setClaimAmount] = useState('0');

  const [userStats, setUserStats] = useState({
    omniBalance: '0',
    somniBalance: '0',
    stakedAmount: '0',
    earnedRewards: '0',
    apy: '12.5%',
  });

  // Mock data - in real app, this would come from smart contracts
  React.useEffect(() => {
    if (isConnected) {
      setUserStats({
        omniBalance: '1,250.50',
        somniBalance: '1,180.25',
        stakedAmount: '1,180.25',
        earnedRewards: '45.30',
        apy: '12.5%',
      });
    }
  }, [isConnected]);

  const handleStake = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    alert(`Staking ${stakeAmount} OMNI...\nThis would call the smart contract in a real implementation.`);
    setStakeAmount('');
  };

  const handleUnstake = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!unstakeAmount || Number(unstakeAmount) <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    alert(`Unstaking ${unstakeAmount} sOMNI...\nThis would call the smart contract in a real implementation.`);
    setUnstakeAmount('');
  };

  const handleClaimRewards = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    alert(`Claiming ${claimAmount} rewards...\nThis would call the smart contract in a real implementation.`);
  };

  const StatCard: React.FC<{ title: string; value: string; subtitle?: string }> = ({ 
    title, 
    value, 
    subtitle 
  }) => (
    <Card className="omni-stat-card">
      <Text className="omni-stat-value">{value}</Text>
      <Text className="omni-stat-label">{title}</Text>
      {subtitle && (
        <Text style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {subtitle}
        </Text>
      )}
    </Card>
  );

  return (
    <Box style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <Box textAlign="center" marginBottom={4}>
        <Heading size="xl" className="omni-gradient-text" marginBottom={2}>
          Staking Interface
        </Heading>
        <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Stake your OMNI tokens to earn sOMNI and receive revenue distributions
        </Text>
      </Box>

      {/* User Stats */}
      <div className="omni-stats-grid">
        <StatCard 
          title="OMNI Balance" 
          value={userStats.omniBalance}
          subtitle="Available to stake"
        />
        <StatCard 
          title="sOMNI Balance" 
          value={userStats.somniBalance}
          subtitle="Staked tokens"
        />
        <StatCard 
          title="Staked Amount" 
          value={userStats.stakedAmount}
          subtitle="Total staked"
        />
        <StatCard 
          title="Earned Rewards" 
          value={userStats.earnedRewards}
          subtitle="Available to claim"
        />
        <StatCard 
          title="Current APY" 
          value={userStats.apy}
          subtitle="Annual yield"
        />
      </div>

      <Grid container spacing={4} marginTop={2}>
        {/* Stake OMNI */}
        <Grid item xs={12} md={6}>
          <Card className="omni-card">
            <Heading size="lg" marginBottom={3}>Stake OMNI</Heading>
            
            <Box marginBottom={3}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Stake</Text>
              <Input
                type="number"
                placeholder="Enter amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
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

            <Box marginBottom={3}>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • 1:1 conversion rate (1 OMNI = 1 sOMNI)<br/>
                • Start earning rewards immediately<br/>
                • No lock-up period<br/>
                • Revenue sharing enabled
              </Text>
            </Box>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStake}
              disabled={!isConnected || !stakeAmount}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
                border: 'none',
                color: 'white',
                padding: '1rem',
              }}
            >
              {isConnected ? 'Stake OMNI' : 'Connect Wallet to Stake'}
            </Button>
          </Card>
        </Grid>

        {/* Unstake sOMNI */}
        <Grid item xs={12} md={6}>
          <Card className="omni-card">
            <Heading size="lg" marginBottom={3}>Unstake sOMNI</Heading>
            
            <Box marginBottom={3}>
              <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Unstake</Text>
              <Input
                type="number"
                placeholder="Enter amount"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
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

            <Box marginBottom={3}>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                • 1:1 conversion rate (1 sOMNI = 1 OMNI)<br/>
                • No unstaking penalty<br/>
                • Immediate withdrawal<br/>
                • Keep earned rewards
              </Text>
            </Box>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleUnstake}
              disabled={!isConnected || !unstakeAmount}
              style={{
                width: '100%',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid var(--omni-primary)',
                color: 'var(--omni-primary)',
                padding: '1rem',
              }}
            >
              {isConnected ? 'Unstake sOMNI' : 'Connect Wallet to Unstake'}
            </Button>
          </Card>
        </Grid>

        {/* Claim Rewards */}
        <Grid item xs={12}>
          <Card className="omni-card">
            <Heading size="lg" marginBottom={3}>Claim Rewards</Heading>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box>
                  <Text style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Available Rewards</Text>
                  <Text style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: 'var(--omni-success)',
                    marginBottom: '1rem'
                  }}>
                    {claimAmount} OMNI
                  </Text>
                  <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                    Revenue distributions from protocol fees and bond sales
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleClaimRewards}
                  disabled={!isConnected || Number(claimAmount) <= 0}
                  style={{
                    width: '100%',
                    background: 'var(--omni-success)',
                    border: 'none',
                    color: 'white',
                    padding: '1rem',
                  }}
                >
                  {isConnected ? 'Claim Rewards' : 'Connect Wallet to Claim'}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Staking Information */}
      <Card className="omni-card" style={{ marginTop: '2rem' }}>
        <Heading size="lg" marginBottom={3}>Staking Information</Heading>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>How Staking Works</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                When you stake OMNI tokens, you receive sOMNI (staked OMNI) tokens in return. 
                These sOMNI tokens represent your share of the protocol's revenue and allow you 
                to participate in governance decisions.
              </Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Revenue Distribution</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                Protocol revenue from bond sales, trading fees, and other sources is distributed 
                proportionally to all sOMNI holders. You can claim your rewards at any time.
              </Text>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Governance Rights</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                sOMNI tokens grant you voting rights in DAO governance proposals. The more sOMNI 
                you hold, the more influence you have in protocol decisions.
              </Text>
            </Box>

            <Box marginBottom={3}>
              <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Risk Considerations</Text>
              <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
                Staking involves smart contract risk. While the protocol is designed to be secure, 
                always do your own research and only stake what you can afford to lose.
              </Text>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default StakingInterface; 