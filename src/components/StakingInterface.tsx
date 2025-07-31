import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

const StakingInterface: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [claimAmount, setClaimAmount] = useState('0');
  const [isConnected, setIsConnected] = useState(false); // Mock connection state

  const stakingStats = {
    totalStaked: '2,847,500',
    totalStakers: '1,234',
    averageAPY: '18.5%',
    totalRewards: '45,230',
    userStaked: '1,250',
    userRewards: '125.50',
    userAPY: '19.2%'
  };

  const handleStake = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      alert('Please enter a valid amount to stake!');
      return;
    }
    alert(`Staking ${stakeAmount} OMNI tokens...\nThis would call the smart contract in a real implementation.`);
    setStakeAmount('');
  };

  const handleUnstake = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!unstakeAmount || Number(unstakeAmount) <= 0) {
      alert('Please enter a valid amount to unstake!');
      return;
    }
    alert(`Unstaking ${unstakeAmount} sOMNI tokens...\nThis would call the smart contract in a real implementation.`);
    setUnstakeAmount('');
  };

  const handleClaimRewards = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (Number(claimAmount) <= 0) {
      alert('No rewards available to claim!');
      return;
    }
    alert(`Claiming ${claimAmount} OMNI rewards...\nThis would call the smart contract in a real implementation.`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Staking Interface
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Stake OMNI tokens to earn sOMNI and receive revenue distributions
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {/* Staking Actions */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Stake OMNI</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Stake</p>
              <input
                type="number"
                placeholder="Enter OMNI amount"
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
            </div>

            <Button
              variant="primary"
              size="large"
              onClick={handleStake}
              disabled={!isConnected || !stakeAmount || Number(stakeAmount) <= 0}
            >
              {isConnected ? 'Stake OMNI' : 'Connect Wallet to Stake'}
            </Button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Unstake sOMNI</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Amount to Unstake</p>
              <input
                type="number"
                placeholder="Enter sOMNI amount"
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
            </div>

            <Button
              variant="secondary"
              size="large"
              onClick={handleUnstake}
              disabled={!isConnected || !unstakeAmount || Number(unstakeAmount) <= 0}
            >
              {isConnected ? 'Unstake sOMNI' : 'Connect Wallet to Unstake'}
            </Button>
          </div>
        </div>

        {/* Staking Statistics */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Your Staking</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Staked OMNI</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{stakingStats.userStaked}</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Your APY</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{stakingStats.userAPY}</div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Available Rewards</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{stakingStats.userRewards} OMNI</div>
            </div>

            <Button
              variant="primary"
              size="small"
              onClick={handleClaimRewards}
              disabled={!isConnected || Number(claimAmount) <= 0}
            >
              Claim Rewards
            </Button>
          </div>
        </div>
      </div>

      {/* Global Staking Statistics */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Global Staking Statistics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Staked</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{stakingStats.totalStaked}</div>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Stakers</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{stakingStats.totalStakers}</div>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Average APY</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{stakingStats.averageAPY}</div>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Rewards</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{stakingStats.totalRewards}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInterface; 
