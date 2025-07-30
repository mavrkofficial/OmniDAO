import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@inkonchain/ink-kit';
import WalletConnect from './WalletConnect';

const Navigation: React.FC = () => {
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
    <div className="omni-navigation" style={{
      background: 'rgba(15, 15, 35, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: '1rem 0', flexWrap: "wrap", gap: "1rem" }}>
          {/* Logo and Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="omni-gradient-text" style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                🚀 Omni DAO
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
            </div>
          </div>

          {/* Wallet Connection */}
          <div>
            <WalletConnect />
          </div>
        </div>
              </div>
    </div>
  );
};

export default Navigation; 
