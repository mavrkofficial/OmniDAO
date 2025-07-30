import React, { useState } from 'react';
import { Card, Grid, Button, Input } from '@inkonchain/ink-kit';

interface DAOGovernanceProps {
  isConnected: boolean;
  account: string | null;
}

const DAOGovernance: React.FC<DAOGovernanceProps> = ({ isConnected, account }) => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');

  const mockProposals = [
    {
      id: 1,
      title: 'Increase Bond Discount Rates',
      description: 'Proposal to increase bond discount rates by 2% across all tokens to attract more liquidity.',
      creator: '0x1234...5678',
      votesFor: 1250,
      votesAgainst: 320,
      status: 'Active',
      endTime: '2024-02-15',
      type: 'Parameter Change'
    },
    {
      id: 2,
      title: 'Add New Bond Token - USDC',
      description: 'Add USDC as a new bondable token to expand the bonding mechanism.',
      creator: '0x8765...4321',
      votesFor: 890,
      votesAgainst: 150,
      status: 'Active',
      endTime: '2024-02-20',
      type: 'Token Addition'
    },
    {
      id: 3,
      title: 'Update Revenue Distribution',
      description: 'Modify revenue distribution to allocate 70% to stakers and 30% to treasury.',
      creator: '0xabcd...efgh',
      votesFor: 2100,
      votesAgainst: 450,
      status: 'Passed',
      endTime: '2024-02-10',
      type: 'Revenue Policy'
    }
  ];

  const handleCreateProposal = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!proposalTitle || !proposalDescription) {
      alert('Please fill in all fields!');
      return;
    }
    alert(`Creating proposal: ${proposalTitle}\nThis would call the smart contract in a real implementation.`);
    setProposalTitle('');
    setProposalDescription('');
  };

  const handleVote = (proposalId: number, vote: 'for' | 'against') => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    alert(`Voting ${vote} on proposal ${proposalId}...\nThis would call the smart contract in a real implementation.`);
  };

  const ProposalCard: React.FC<{ proposal: any }> = ({ proposal }) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes * 100).toFixed(1) : '0';
    const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes * 100).toFixed(1) : '0';

    return (
      <Card className="omni-card" style={{ marginBottom: '1rem' }}>
        <div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--omni-text)' }}>{proposal.title}</h3>
            <span style={{ color: 'var(--omni-text-secondary)', marginBottom: '1rem' }}>
              {proposal.description}
            </span>
          </div>
          <div>
            <span style={{ 
              fontSize: '0.75rem', 
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              background: proposal.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              color: proposal.status === 'Active' ? 'var(--omni-success)' : 'var(--omni-primary)',
              border: `1px solid ${proposal.status === 'Active' ? 'var(--omni-success)' : 'var(--omni-primary)'}`
            }}>
              {proposal.status}
            </span>
          </div>
        </div>

        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Creator</span>
            <span style={{ fontSize: '0.875rem' }}>{proposal.creator}</span>
          </Grid>
          <Grid item xs={6}>
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Type</span>
            <span style={{ fontSize: '0.875rem' }}>{proposal.type}</span>
          </Grid>
          <Grid item xs={6}>
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>End Date</span>
            <span style={{ fontSize: '0.875rem' }}>{proposal.endTime}</span>
          </Grid>
          <Grid item xs={6}>
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Votes</span>
            <span style={{ fontSize: '0.875rem' }}>{totalVotes.toLocaleString()}</span>
          </Grid>
        </Grid>

        {/* Vote Progress */}
        <div>
          <div>
            <span style={{ fontSize: '0.875rem' }}>For: {proposal.votesFor.toLocaleString()} ({forPercentage}%)</span>
            <span style={{ fontSize: '0.875rem' }}>Against: {proposal.votesAgainst.toLocaleString()} ({againstPercentage}%)</span>
          </div>
        </div>

        {/* Vote Buttons */}
        {proposal.status === 'Active' && (
          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleVote(proposal.id, 'for')}
              disabled={!isConnected}
              style={{
                background: 'var(--omni-success)',
                border: 'none',
                color: 'white',
              }}
            >
              Vote For
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleVote(proposal.id, 'against')}
              disabled={!isConnected}
              style={{
                background: 'var(--omni-error)',
                border: 'none',
                color: 'white',
              }}
            >
              Vote Against
            </Button>
          </div>
        )}
      </Card>
    );
  };

  return (
          <div>
      <div>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          DAO Governance
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Participate in governance proposals and vote on protocol changes
        </span>
      </div>

      {/* Tab Navigation */}
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant={activeTab === 'proposals' ? "primary" : "secondary"}
              onClick={() => setActiveTab('proposals')}
            >
              Active Proposals
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={activeTab === 'create' ? "primary" : "secondary"}
              onClick={() => setActiveTab('create')}
            >
              Create Proposal
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={activeTab === 'expansion' ? "primary" : "secondary"}
              onClick={() => setActiveTab('expansion')}
            >
              Expansion Management
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* Active Proposals */}
      {activeTab === 'proposals' && (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Active Proposals</h2>
          {mockProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}

      {/* Create Proposal */}
      {activeTab === 'create' && (
        <Card className="omni-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create New Proposal</h2>
          
          <div>
            <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Proposal Title</p>
            <Input
              placeholder="Enter proposal title"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
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

          <div>
            <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Proposal Description</p>
            <textarea
              placeholder="Describe your proposal in detail..."
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                background: 'rgba(26, 26, 46, 0.6)',
                color: 'var(--omni-text)',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateProposal}
            disabled={!isConnected || !proposalTitle || !proposalDescription}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
              border: 'none',
              color: 'white',
              padding: '1rem',
            }}
          >
            {isConnected ? 'Create Proposal' : 'Connect Wallet to Create'}
          </Button>
        </Card>
      )}

      {/* Expansion Management */}
      {activeTab === 'expansion' && (
        <Card className="omni-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Expansion Management</h2>
          <span style={{ color: 'var(--omni-text-secondary)', marginBottom: '2rem' }}>
            Manage protocol expansion parameters and treasury allocation.
          </span>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className="omni-stat-card">
                <span className="omni-stat-value">$2.5M</span>
                <span className="omni-stat-label">Treasury Balance</span>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="omni-stat-card">
                <span className="omni-stat-value">15</span>
                <span className="omni-stat-label">Active Expansions</span>
              </Card>
            </Grid>
          </Grid>

          <div>
            <span style={{ color: 'var(--omni-text-secondary)', fontSize: '0.875rem' }}>
              Expansion management features will be available to DAO members with sufficient voting power.
            </span>
          </div>
        </Card>
      )}
          </div>
  );
};

export default DAOGovernance; 