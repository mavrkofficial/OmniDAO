import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';
import { useAccount } from 'wagmi';

const PresaleInterface: React.FC = () => {
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState<string>('');

  // Calculate OMNI tokens based on ETH amount (1 ETH = 10,000,000 OMNI)
  const calculateOmniTokens = (ethAmount: string): string => {
    const eth = parseFloat(ethAmount) || 0;
    const omniTokens = eth * 10000000;
    return omniTokens.toLocaleString();
  };

  // Mock data - will be replaced with contract calls
  const mockPresaleData = {
    omniAllocated: '100,000,000',
    totalContributors: '156',
    averagePPT: '$0.0001',
    totalEthRaised: '10.5'
  };

  const mockUserData = {
    omniBought: '50,000,000',
    ethContributed: '5.0'
  };

  return (
    <div style={{ 
      background: 'var(--omni-card-bg)', 
      borderRadius: '16px', 
      padding: '2rem', 
      border: '1px solid var(--omni-border)', 
      marginBottom: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '2rem', 
        color: 'var(--omni-text)', 
        fontFamily: 'Orbitron, Arial, sans-serif',
        textAlign: 'center'
      }}>
        Omni Presale
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2rem' 
      }}>
        {/* Left Side - Presale Interface */}
        <div style={{ 
          background: 'rgba(0, 212, 255, 0.05)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem', 
            color: 'var(--omni-text)',
            fontFamily: 'Orbitron, Arial, sans-serif'
          }}>
            Participate in Presale
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: 'var(--omni-text-secondary)',
              fontSize: '0.875rem'
            }}>
              Amount to Buy (ETH)
            </label>
            <input
              type="number"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="Enter ETH amount"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--omni-border)',
                background: 'var(--omni-card-bg)',
                color: 'var(--omni-text)',
                fontSize: '1rem'
              }}
            />
          </div>

          {!isConnected ? (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Button variant="primary" size="medium">
                Connect Wallet to Participate
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Button variant="primary" size="medium">
                Buy OMNI Tokens
              </Button>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: 'var(--omni-text-secondary)',
              fontSize: '0.875rem'
            }}>
              Amount of OMNI You Get
            </label>
            <div style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--omni-border)',
              background: 'rgba(0, 212, 255, 0.1)',
              color: 'var(--omni-text)',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {ethAmount ? `${calculateOmniTokens(ethAmount)} OMNI` : '0 OMNI'}
            </div>
          </div>

          <div style={{ 
            fontSize: '0.75rem', 
            color: 'var(--omni-text-secondary)', 
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Presale token values are subject to fluctuate with uncapped presale raise goal
          </div>
        </div>

        {/* Right Side - User Profile & Global Stats */}
        <div style={{ 
          background: 'rgba(99, 102, 241, 0.05)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          {isConnected ? (
            <>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem', 
                color: 'var(--omni-text)',
                fontFamily: 'Orbitron, Arial, sans-serif'
              }}>
                Your Presale Profile
              </h3>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    color: 'var(--omni-text-secondary)', 
                    fontSize: '0.875rem' 
                  }}>
                    $OMNI Bought
                  </span>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--omni-text)' 
                  }}>
                    {mockUserData.omniBought} OMNI
                  </div>
                </div>

                <div>
                  <span style={{ 
                    color: 'var(--omni-text-secondary)', 
                    fontSize: '0.875rem' 
                  }}>
                    ETH Contributed
                  </span>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--omni-text)' 
                  }}>
                    {mockUserData.ethContributed} ETH
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem 0',
              color: 'var(--omni-text-secondary)'
            }}>
              Connect your wallet to view your presale profile
            </div>
          )}

          <div>
            <h4 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: 'var(--omni-text)',
              fontFamily: 'Orbitron, Arial, sans-serif'
            }}>
              Global Presale Statistics
            </h4>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1rem' 
            }}>
              <div>
                <span style={{ 
                  color: 'var(--omni-text-secondary)', 
                  fontSize: '0.75rem' 
                }}>
                  OMNI Allocated to Presale
                </span>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'var(--omni-text)' 
                }}>
                  {mockPresaleData.omniAllocated} OMNI
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#10B981',
                  fontWeight: 'bold'
                }}>
                  10% of Supply
                </div>
              </div>

              <div>
                <span style={{ 
                  color: 'var(--omni-text-secondary)', 
                  fontSize: '0.75rem' 
                }}>
                  Total Presale Contributors
                </span>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'var(--omni-text)' 
                }}>
                  {mockPresaleData.totalContributors}
                </div>
              </div>

              <div>
                <span style={{ 
                  color: 'var(--omni-text-secondary)', 
                  fontSize: '0.75rem' 
                }}>
                  Average PPT
                </span>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'var(--omni-text)' 
                }}>
                  {mockPresaleData.averagePPT}
                </div>
              </div>

              <div>
                <span style={{ 
                  color: 'var(--omni-text-secondary)', 
                  fontSize: '0.75rem' 
                }}>
                  Total ETH Raised
                </span>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'var(--omni-text)' 
                }}>
                  {mockPresaleData.totalEthRaised} ETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleInterface; 