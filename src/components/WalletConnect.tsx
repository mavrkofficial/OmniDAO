import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      style={{
                        background: '#6366f1',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontFamily: 'Orbitron, Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'white',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#5855eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#6366f1';
                      }}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      style={{
                        background: '#6366f1',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontFamily: 'Orbitron, Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'white',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Wrong Network
                    </button>
                  );
                }

                return (
                  <button
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      background: '#6366f1',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontFamily: 'Orbitron, Arial, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'white',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#5855eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#6366f1';
                    }}
                  >
                    {account.displayName}
                  </button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,212,255,0.10)', borderRadius: 18, padding: '4px 8px' }}>
        <img src="https://mavrk-web-images.s3.us-east-2.amazonaws.com/Chain+Logos/Ink+L2.png" alt="Ink Layer 2" style={{ width: 24, height: 24, borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default WalletConnect; 
