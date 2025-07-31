import React, { useState, useEffect } from 'react';
import { Button } from '@inkonchain/ink-kit';

const Dashboard: React.FC = () => {
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
    <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" }} className="omni-stat-card">
      <div style={{ marginBottom: "0.5rem" }}>
        <span className="omni-stat-value" style={{ display: "block", textAlign: "center" }}>{value}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <span className="omni-stat-label" style={{ display: "block", textAlign: "center" }}>{title}</span>
        {subtitle && (
          <span style={{ 
            color: 'var(--omni-text-secondary)', 
            fontSize: '0.75rem',
            marginTop: '0.25rem',
            display: 'block',
            textAlign: 'center'
          }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  const QuickActionCard: React.FC<{ 
    title: string; 
    description: string; 
    action: string; 
    icon: string;
    onClick: () => void;
  }> = ({ title, description, action, icon, onClick }) => (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-text)' }}>{title}</h3>
      </div>
      <span style={{ 
        color: 'var(--omni-text-secondary)', 
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}>
        {description}
      </span>
      <Button variant="primary" size="small">
        {action}
      </Button>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'var(--omni-text)',
            fontFamily: 'Orbitron, Arial, sans-serif'
          }}>
            Welcome to the
          </span>
          <img 
            src="https://omnidao.s3.us-east-2.amazonaws.com/W03_OMNI_DAO_LOGO.png" 
            alt="Omni DAO" 
            style={{ 
              height: '2.5rem',
              filter: 'brightness(1.1) contrast(1.1)'
            }} 
          />
        </div>
        <span style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'Orbitron, Arial, sans-serif'
        }}>
          Fully modular, DAO-governed liquidity infrastructure and revenue share protocol on the Ink Network. 
        </span>
      </div>

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
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)', fontFamily: 'Orbitron, Arial, sans-serif' }}>Quick Actions</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="Create Bond"
              description="Purchase OMNI tokens at a discount through our bonding mechanism"
              action="Start Bonding"
              icon="🔗"
              onClick={() => window.location.href = '/bonds'}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="Stake OMNI"
              description="Stake your OMNI tokens to earn sOMNI and receive revenue distributions"
              action="Start Staking"
              icon="💰"
              onClick={() => window.location.href = '/staking'}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="DAO Governance"
              description="Participate in governance proposals and vote on protocol changes"
              action="View Proposals"
              icon="🗳️"
              onClick={() => window.location.href = '/governance'}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="LP Bonds"
              description="Acquire LP positions with supply neutralization"
              action="Explore LP Bonds"
              icon="🌊"
              onClick={() => window.location.href = '/lp-bonds'}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="Revenue Analytics"
              description="Track real-time revenue sharing and distribution metrics"
              action="View Analytics"
              icon="📊"
              onClick={() => window.location.href = '/analytics'}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <QuickActionCard
              title="Contract Management"
              description="Universal setter functions for contract owners"
              action="Manage Contracts"
              icon="⚙️"
              onClick={() => alert('Contract management interface coming soon!')}
            />
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div style={{ 
        marginTop: '2rem',
        textAlign: 'center',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid var(--omni-error)',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <span style={{ color: 'var(--omni-error)', marginBottom: '1rem', display: 'block' }}>
          ⚠️ Connect your wallet to interact with Omni DAO
        </span>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
          You need to connect your wallet to access all features and view your personal data.
        </span>
      </div>

      {/* Bottom Image */}
      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
        <img 
          src="https://omnidao.s3.us-east-2.amazonaws.com/W04_Believe_In_Something.png" 
          alt="Believe In Something" 
          style={{ 
            maxWidth: '600px', 
            width: '100%',
            filter: 'brightness(1.05) contrast(1.05)'
          }} 
        />
      </div>
    </div>
  );
};

export default Dashboard; 
