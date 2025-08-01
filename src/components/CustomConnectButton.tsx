import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const CustomConnectButton: React.FC = () => {
  return (
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
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                                         <img 
                       src="https://omnidao.s3.us-east-2.amazonaws.com/power-xxl.png" 
                       alt="Connect Wallet" 
                       style={{ 
                         width: '32px', 
                         height: '32px',
                         objectFit: 'contain',
                         filter: 'brightness(1.1) contrast(1.1)',
                         transition: 'transform 0.2s ease'
                       }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                                         <img 
                       src="https://omnidao.s3.us-east-2.amazonaws.com/power-xxl.png" 
                       alt="Switch Network" 
                       style={{ 
                         width: '32px', 
                         height: '32px',
                         objectFit: 'contain',
                         filter: 'brightness(1.1) contrast(1.1)',
                         opacity: 0.7
                       }}
                    />
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={openChainModal}
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                                         <img 
                       src="https://omnidao.s3.us-east-2.amazonaws.com/power-xxl.png" 
                       alt="Connected" 
                       style={{ 
                         width: '32px', 
                         height: '32px',
                         objectFit: 'contain',
                         filter: 'brightness(1.1) contrast(1.1)',
                         opacity: 0.8
                       }}
                    />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton; 