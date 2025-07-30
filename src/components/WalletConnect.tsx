import React, { useState, useEffect } from 'react';
import { Button, Box, Text, Container } from '@inkonchain/ink-kit';

interface WalletConnectProps {
  isConnected: boolean;
  account: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ 
  isConnected, 
  account, 
  onConnect, 
  onDisconnect 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await onConnect();
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    setError(null);
  };

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0 && !isConnected) {
            onConnect();
          }
        } catch (err) {
          console.error('Auto-connect error:', err);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          onDisconnect();
        } else if (accounts[0] !== account) {
          // Account changed, update the account
          onConnect();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account, isConnected]);

  if (isConnected && account) {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="secondary"
          size="sm"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--omni-success)',
            color: 'var(--omni-success)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontSize: '0.8rem' }}>🟢</span>
          {shortenAddress(account)}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDisconnect}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--omni-error)',
            color: 'var(--omni-error)',
            fontSize: '0.8rem',
          }}
        >
          Disconnect
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        variant="primary"
        size="sm"
        style={{
          backgroundColor: isConnecting ? 'rgba(99, 102, 241, 0.5)' : 'var(--omni-primary)',
          border: '1px solid var(--omni-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {isConnecting ? (
          <>
            <span style={{ fontSize: '0.8rem' }}>⏳</span>
            Connecting...
          </>
        ) : (
          <>
            <span style={{ fontSize: '0.8rem' }}>🔗</span>
            Connect Wallet
          </>
        )}
      </Button>
      
      {error && (
        <Text 
          style={{ 
            color: 'var(--omni-error)', 
            fontSize: '0.75rem', 
            marginTop: '0.5rem' 
          }}
        >
          {error}
        </Text>
      )}
    </Box>
  );
};

export default WalletConnect; 