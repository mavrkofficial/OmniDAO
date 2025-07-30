import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Grid, Text, Box } from '@inkonchain/ink-kit';

interface NavigationProps {
  isConnected: boolean;
  account: string | null;
  onConnect: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isConnected, account, onConnect }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/bonds', label: 'Bonds' },
    { path: '/lp-bonds', label: 'LP Bonds' },
    { path: '/governance', label: 'Governance' },
    { path: '/staking', label: 'Staking' },
    { path: '/analytics', label: 'Analytics' },
  ];

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box className="omni-navigation" style={{
      background: 'rgba(15, 15, 35, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Container maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" style={{ padding: '1rem 0' }}>
          {/* Logo and Brand */}
          <Grid item>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Text className="omni-gradient-text" style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                🚀 Omni DAO
              </Text>
            </Link>
          </Grid>

          {/* Navigation Links */}
          <Grid item>
            <Box display="flex" gap={2} style={{ flexWrap: 'wrap' }}>
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant={location.pathname === item.path ? "primary" : "secondary"}
                    size="sm"
                    style={{
                      backgroundColor: location.pathname === item.path 
                        ? 'var(--omni-primary)' 
                        : 'transparent',
                      border: location.pathname === item.path 
                        ? '1px solid var(--omni-primary)' 
                        : '1px solid rgba(99, 102, 241, 0.2)',
                      color: location.pathname === item.path 
                        ? 'white' 
                        : 'var(--omni-text)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Wallet Connection */}
          <Grid item>
            {isConnected ? (
              <Button
                variant="secondary"
                size="sm"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid var(--omni-success)',
                  color: 'var(--omni-success)',
                }}
              >
                {shortenAddress(account!)}
              </Button>
            ) : (
              <Button
                onClick={onConnect}
                variant="primary"
                size="sm"
                style={{
                  background: 'linear-gradient(135deg, var(--omni-primary), var(--omni-secondary))',
                  border: 'none',
                  color: 'white',
                }}
              >
                Connect Wallet
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Navigation; 