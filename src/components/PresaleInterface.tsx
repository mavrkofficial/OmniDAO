import React from 'react';
import { Button } from '@inkonchain/ink-kit';
import { useAccount } from 'wagmi';

const PresaleInterface: React.FC = () => {
  const { isConnected } = useAccount();

  // Mock data - will be replaced with contract calls
  const mockGenesisData = {
    whitelistPool: '100,000,000',
    genesisAddresses: '0',
    startingPPT: '$0.0001',
    currentPPT: '$0.0001'
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
        fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem', 
        color: 'var(--omni-text)', 
        fontFamily: 'Orbitron, Arial, sans-serif',
        textAlign: 'center'
      }}>
        Join Omni DAO Genesis Whitelist
      </h2>

             <div style={{ 
         display: 'grid', 
         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
         gap: '1rem',
         marginBottom: '2rem'
       }}>
                   {/* Left Side - Genesis Whitelist Interface */}
          <div style={{ 
            background: 'rgba(0, 212, 255, 0.05)', 
            borderRadius: '12px', 
            padding: '1rem',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            minHeight: 'fit-content'
          }}>
           <h3 style={{ 
             fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
             fontWeight: 'bold', 
             marginBottom: '1rem', 
             color: 'var(--omni-text)',
             fontFamily: 'Orbitron, Arial, sans-serif'
           }}>
             Join Genesis Whitelist
           </h3>

           <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
             <p style={{ 
               color: 'var(--omni-text-secondary)',
               fontSize: '0.875rem',
               marginBottom: '1rem'
             }}>
               Join the exclusive Genesis Whitelist to be among the first to access OMNI tokens when the pool launches.
             </p>
             
             {!isConnected ? (
               <Button variant="primary" size="medium">
                 Connect Wallet to Join
               </Button>
             ) : (
               <Button variant="primary" size="medium">
                 Click to Join
               </Button>
             )}
           </div>

           <div style={{ 
             fontSize: '0.75rem', 
             color: 'var(--omni-text-secondary)', 
             textAlign: 'center',
             fontStyle: 'italic'
           }}>
             Genesis whitelist members will have priority access to OMNI tokens at launch
           </div>
         </div>

                   {/* Right Side - Genesis Profile */}
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.05)', 
            borderRadius: '12px', 
            padding: '1rem',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            minHeight: 'fit-content'
          }}>
           {isConnected ? (
             <>
               <h3 style={{ 
                 fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                 fontWeight: 'bold', 
                 marginBottom: '1rem', 
                 color: 'var(--omni-text)',
                 fontFamily: 'Orbitron, Arial, sans-serif'
               }}>
                 Your Omni DAO Genesis Profile
               </h3>

               <div style={{ marginBottom: '2rem' }}>
                 <div style={{ marginBottom: '1rem' }}>
                   <span style={{ 
                     color: 'var(--omni-text-secondary)', 
                     fontSize: '0.875rem' 
                   }}>
                     Genesis Rank
                   </span>
                   <div style={{ 
                     fontSize: '1.25rem', 
                     fontWeight: 'bold', 
                     color: 'var(--omni-text)' 
                   }}>
                     #0
                   </div>
                 </div>

                 <div>
                   <span style={{ 
                     color: 'var(--omni-text-secondary)', 
                     fontSize: '0.875rem' 
                   }}>
                     Timestamp
                   </span>
                   <div style={{ 
                     fontSize: '1.25rem', 
                     fontWeight: 'bold', 
                     color: 'var(--omni-text)' 
                   }}>
                     Not Joined
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
               Connect your wallet to view your Genesis profile
             </div>
           )}
         </div>
       </div>

                       {/* Global Genesis Whitelist Statistics - Separate Section */}
        <div style={{ 
          background: 'var(--omni-card-bg)', 
          borderRadius: '16px', 
          padding: '1rem', 
          border: '1px solid var(--omni-border)', 
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
                   <h3 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem', 
            color: 'var(--omni-text)', 
            fontFamily: 'Orbitron, Arial, sans-serif',
            textAlign: 'center'
          }}>
            Global Genesis Whitelist Statistics
          </h3>

                   <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
                       <div style={{ 
              background: 'rgba(0, 212, 255, 0.05)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              textAlign: 'center'
            }}>
                           <span style={{ 
                color: 'var(--omni-text-secondary)', 
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Whitelist Pool
              </span>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--omni-text)',
                marginBottom: '0.25rem'
              }}>
                {mockGenesisData.whitelistPool} OMNI
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#10B981',
                fontWeight: 'bold'
              }}>
                10% of Supply
              </div>
           </div>

                       <div style={{ 
              background: 'rgba(99, 102, 241, 0.05)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              textAlign: 'center'
            }}>
                           <span style={{ 
                color: 'var(--omni-text-secondary)', 
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Genesis Addresses
              </span>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--omni-text)'
              }}>
                {mockGenesisData.genesisAddresses}
              </div>
           </div>

                       <div style={{ 
              background: 'rgba(16, 185, 129, 0.05)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              textAlign: 'center'
            }}>
                           <span style={{ 
                color: 'var(--omni-text-secondary)', 
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Starting PPT
              </span>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--omni-text)'
              }}>
                {mockGenesisData.startingPPT}
              </div>
           </div>

                       <div style={{ 
              background: 'rgba(239, 68, 68, 0.05)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              textAlign: 'center'
            }}>
                           <span style={{ 
                color: 'var(--omni-text-secondary)', 
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Current PPT
              </span>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--omni-text)'
              }}>
                {mockGenesisData.currentPPT}
              </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default PresaleInterface; 