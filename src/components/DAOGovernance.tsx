import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

const DAOGovernance: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false); // Mock connection state
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
      <div style={{ marginBottom: '1rem' }}>
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Creator:</span>
              <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>{proposal.creator}</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Type:</span>
              <span style={{ marginLeft: '0.5rem' }}>{proposal.type}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Ends:</span>
              <span style={{ marginLeft: '0.5rem' }}>{proposal.endTime}</span>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem' }}>For: {proposal.votesFor}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--omni-success)' }}>{forPercentage}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'rgba(99, 102, 241, 0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${forPercentage}%`, 
                  height: '100%', 
                  background: 'var(--omni-success)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem' }}>Against: {proposal.votesAgainst}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--omni-error)' }}>{againstPercentage}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'rgba(99, 102, 241, 0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${againstPercentage}%`, 
                  height: '100%', 
                  background: 'var(--omni-error)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleVote(proposal.id, 'for')}
            disabled={!isConnected || proposal.status !== 'Active'}
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
            disabled={!isConnected || proposal.status !== 'Active'}
            style={{
              background: 'var(--omni-error)',
              border: 'none',
              color: 'white',
            }}
          >
            Vote Against
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          DAO Governance
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Participate in protocol governance and decision-making
        </span>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <Button
              variant={activeTab === 'proposals' ? "primary" : "secondary"}
              onClick={() => setActiveTab('proposals')}
            >
              Active Proposals
            </Button>
          </div>
          <div>
            <Button
              variant={activeTab === 'create' ? "primary" : "secondary"}
              onClick={() => setActiveTab('create')}
            >
              Create Proposal
            </Button>
          </div>
          <div>
            <Button
              variant={activeTab === 'expansion' ? "primary" : "secondary"}
              onClick={() => setActiveTab('expansion')}
            >
              Expansion Management
            </Button>
          </div>
        </div>
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
        <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Create New Proposal</h2>
          
          <div>
            <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Proposal Title</p>
            <input
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
            size="large"
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
        </div>
      )}

      {/* Expansion Management */}
      {activeTab === 'expansion' && (
        <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Expansion Management</h2>
          <span style={{ color: 'var(--omni-text-secondary)', marginBottom: '2rem' }}>
            Manage protocol expansion parameters and treasury allocation.
          </span>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
              <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--omni-text)' }}>Treasury Allocation</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Current Allocation:</span>
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Staking Rewards</span>
                      <span>70%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Treasury</span>
                      <span>20%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Development</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="sm" disabled={!isConnected}>
                  Update Allocation
                </Button>
              </div>
            </div>
            
            <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
              <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--omni-text)' }}>Protocol Parameters</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Bond Discount Range:</span>
                    <span style={{ marginLeft: '0.5rem' }}>2% - 15%</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Vesting Period:</span>
                    <span style={{ marginLeft: '0.5rem' }}>7 days</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Minimum Bond:</span>
                    <span style={{ marginLeft: '0.5rem' }}>0.1 ETH</span>
                  </div>
                </div>
                <Button variant="primary" size="sm" disabled={!isConnected}>
                  Update Parameters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DAOGovernance; 
