import React from 'react';
import { Button } from '@inkonchain/ink-kit';
import { useOmniData } from '../hooks/useOmniData';

const Dashboard: React.FC = () => {
  const { 
    totalValueLocked, 
    omniTokenPrice, 
    bondsCreated, 
    totalStaked, 
    stakingRevenuePool, 
    daoProposals,
    isLoading 
  } = useOmniData();

  const StatCard: React.FC<{ title: string; value: string; subtitle?: string; loading?: boolean }> = ({ 
    title, 
    value, 
    subtitle,
    loading = false
  }) => (
    <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" }} className="omni-stat-card">
      <div style={{ marginBottom: "0.5rem" }}>
        <span className="omni-stat-value" style={{ display: "block", textAlign: "center" }}>
          {loading ? 'Loading...' : value}
        </span>
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
      <div style={{ 
        color: 'var(--omni-text-secondary)', 
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}>
        {description}
      </div>
      <Button variant="primary" size="small">
        {action}
      </Button>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ 
          marginBottom: '1rem', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px',
          padding: '0 1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              fontWeight: 'bold', 
              color: 'var(--omni-text)',
              fontFamily: 'Orbitron, Arial, sans-serif',
              whiteSpace: 'nowrap'
            }}>
              Welcome to the
            </span>
            <img 
              src="https://omnidao.s3.us-east-2.amazonaws.com/W03_OMNI_DAO_LOGO.png" 
              alt="Omni DAO" 
              style={{ 
                height: 'clamp(1.5rem, 4vw, 2.5rem)',
                filter: 'brightness(1.1) contrast(1.1)',
                maxWidth: '100%'
              }} 
            />
          </div>
        </div>
        <span style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'Orbitron, Arial, sans-serif',
          padding: '0 1rem',
          lineHeight: '1.4'
        }}>
          Fully modular, DAO-governed liquidity infrastructure and revenue share protocol on the Ink Network. 
        </span>
      </div>

             {/* Stats Grid - 2 rows of 3 on desktop, 1 column on mobile */}
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
         gap: '1rem',
         marginBottom: '2rem'
       }}>
        {/* Row 1 */}
        <StatCard 
          title="Total Value Locked" 
          value={totalValueLocked}
          subtitle="Across all protocols"
          loading={isLoading}
        />
        <StatCard 
          title="OMNI Token Price" 
          value={omniTokenPrice}
          subtitle="Current market price"
        />
        <StatCard 
          title="Bonds Created" 
          value={bondsCreated}
          subtitle="Total bond purchases"
          loading={isLoading}
        />
        
        {/* Row 2 */}
        <StatCard 
          title="Total Staked $OMNI" 
          value={totalStaked}
          subtitle="sOMNI holders"
          loading={isLoading}
        />
        <StatCard 
          title="Staking Revenue Pool" 
          value={stakingRevenuePool}
          subtitle="Available for distribution"
          loading={isLoading}
        />
        <StatCard 
          title="DAO Proposals" 
          value={daoProposals}
          subtitle="Active governance"
          loading={isLoading}
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
               action="Explore Token Bonds"
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

      

      {/* Bottom Image */}
      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src="https://omnidao.s3.us-east-2.amazonaws.com/W04_Believe_In_Something.png" 
          alt="Believe In Something" 
          style={{ 
            maxWidth: '600px', 
            width: '100%',
            filter: 'brightness(1.05) contrast(1.05)',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>
    </div>
  );
};

export default Dashboard; 
