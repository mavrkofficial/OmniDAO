import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChain } from '../contexts/ChainContext';

const WalletConnect: React.FC = () => {
  const { selectedChain } = useChain();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ConnectButton showBalance={false} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,212,255,0.10)', borderRadius: 18, padding: '4px 12px' }}>
        <img src={selectedChain.logoUrl} alt={selectedChain.name} style={{ width: 24, height: 24, borderRadius: '50%' }} />
        <span style={{ fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 700, color: '#00D4FF', fontSize: 15, textTransform: 'uppercase', letterSpacing: 1 }}>{selectedChain.name}</span>
      </div>
    </div>
  );
};

export default WalletConnect; 
