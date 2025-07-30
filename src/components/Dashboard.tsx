import React, { useState, useEffect } from 'react';
import { Card, Grid, Text, Heading, Button } from '@inkonchain/ink-kit';

interface DashboardProps {
  isConnected: boolean;
  account: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected, account }) => {
  const [stats, setStats] = useState({
    totalValueLocked: '$0',
    omniTokenPrice: '$0.0005',
    totalBondsCreated: '0',
    activeStakers: '0',
    totalRevenue: '$0',
    daoProposals: '0',
  });

  // Mock data - in real app, this would come from smart contracts
  useEffect(() => {
    // Simulate loading contract data
    setTimeout(() => {
      setStats({
        totalValueLocked: '$1,250,000',
        omniTokenPrice: '$0.0005',
        totalBondsCreated: '156',
        activeStakers: '2,847',
        totalRevenue: '$45,230',
        daoProposals: '12',
      });
    }, 1000);
  }, []);

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

  const QuickActionCard: React.FC<{ 
    title: string; 
    description: string; 
    action: string; 
    icon: string;
    onClick: () => void;
  }> = ({ title, description, action, icon, onClick }) => (
    <Card className="omni-card" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Text style={{ fontSize: '1.5rem' }}>{icon}</Text>
        <Heading size="md">{title}</Heading>
      </Box>
      <Text style={{ 
        color: 'var(--omni-text-secondary)', 
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}>
        {description}
      </Text>
      <Button variant="primary" size="sm">
        {action}
      </Button>
    </Card>
  );

  return (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Heading size="xl" className="omni-gradient-text" marginBottom={2}>
          Welcome to Omni DAO
        </Heading>
        <Text style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Fully modular, DAO-governed liquidity infrastructure protocol for Ink L2. 
          Experience the revolutionary deflationary mechanism disguised as inflation.
        </Text>
      </Box>

      {/* Stats Grid */}
      <div className="omni-stats-grid">
        <StatCard 
          title="Total Value Locked" 
          value={stats.totalValueLocked}
          subtitle="Across all protocols"
        />
        <StatCard 
          title="OMNI Token Price" 
          value={stats.omniTokenPrice}
          subtitle="Current market price"
        />
        <StatCard 
          title="Bonds Created" 
          value={stats.totalBondsCreated}
          subtitle="Total bond purchases"
        />
        <StatCard 
          title="Active Stakers" 
          value={stats.activeStakers}
          subtitle="sOMNI holders"
        />
        <StatCard 
          title="Total Revenue" 
          value={stats.totalRevenue}
          subtitle="Distributed to stakers"
        />
        <StatCard 
          title="DAO Proposals" 
          value={stats.daoProposals}
          subtitle="Active governance"
        />
      </div>

      {/* Quick Actions */}
      <Box marginTop={4}>
        <Heading size="lg" marginBottom={3}>Quick Actions</Heading>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="Create Bond"
              description="Purchase OMNI tokens at a discount through our bonding mechanism"
              action="Start Bonding"
              icon="🔗"
              onClick={() => window.location.href = '/bonds'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="Stake OMNI"
              description="Stake your OMNI tokens to earn sOMNI and receive revenue distributions"
              action="Start Staking"
              icon="💰"
              onClick={() => window.location.href = '/staking'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="DAO Governance"
              description="Participate in governance proposals and vote on protocol changes"
              action="View Proposals"
              icon="🗳️"
              onClick={() => window.location.href = '/governance'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="LP Bonds"
              description="Acquire LP positions with supply neutralization"
              action="Explore LP Bonds"
              icon="🌊"
              onClick={() => window.location.href = '/lp-bonds'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="Revenue Analytics"
              description="Track real-time revenue sharing and distribution metrics"
              action="View Analytics"
              icon="📊"
              onClick={() => window.location.href = '/analytics'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <QuickActionCard
              title="Contract Management"
              description="Universal setter functions for contract owners"
              action="Manage Contracts"
              icon="⚙️"
              onClick={() => alert('Contract management interface coming soon!')}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Connection Status */}
      {!isConnected && (
        <Card className="omni-card" style={{ 
          marginTop: '2rem',
          textAlign: 'center',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--omni-error)'
        }}>
          <Text style={{ color: 'var(--omni-error)', marginBottom: '1rem' }}>
            ⚠️ Connect your wallet to interact with Omni DAO
          </Text>
          <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
            You need to connect your wallet to access all features and view your personal data.
          </Text>
        </Card>
      )}
          </Box>
  );
};

export default Dashboard; 