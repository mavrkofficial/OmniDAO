import React from 'react';
import CustomConnectButton from './CustomConnectButton';
import { useChain } from '../contexts/ChainContext';

const WalletConnect: React.FC = () => {
  const { selectedChain } = useChain();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <CustomConnectButton />
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,212,255,0.10)', borderRadius: 18, padding: '4px 8px' }}>
        <img src="https://mavrk-web-images.s3.us-east-2.amazonaws.com/Chain+Logos/Ink+L2.png" alt="Ink Layer 2" style={{ width: 24, height: 24, borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default WalletConnect; 
