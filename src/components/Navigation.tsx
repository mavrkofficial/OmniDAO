import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@inkonchain/ink-kit';
import WalletConnect from './WalletConnect';
import { getAppConfig } from '../config/appConfig';

const Navigation: React.FC = () => {
  const location = useLocation();

  const config = getAppConfig();
  
  const navItems = [
    { path: '/', label: 'Dashboard', enabled: config.enabledSections.dashboard },
    { path: '/bonds', label: 'Bonds', enabled: config.enabledSections.bonds },
    { path: '/governance', label: 'Governance', enabled: config.enabledSections.governance },
    { path: '/staking', label: 'Staking', enabled: config.enabledSections.staking },
    { path: '/analytics', label: 'Analytics', enabled: config.enabledSections.analytics },
  ].filter(item => item.enabled);

  // const shortenAddress = (address: string) => {
  //   return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // };

  return (
    <div className="omni-navigation" style={{
      background: 'rgba(31, 20, 44, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          padding: '1rem 0', 
          gap: "1rem" 
        }}>
          {/* Logo and Brand - Centered */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img 
                src="https://omnidao.s3.us-east-2.amazonaws.com/W02_OMNI_LOGO_NAME.png" 
                alt="Omni DAO" 
                style={{ 
                  height: '40px', 
                  cursor: 'pointer',
                  filter: 'brightness(1.1) contrast(1.1)',
                  maxWidth: '100%'
                }} 
              />
            </Link>
          </div>

          {/* Navigation Links - Centered Grid */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px', 
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ width: '100%', fontSize: '0.8rem' }}>
                    <Button
                      variant={location.pathname === item.path ? "primary" : "secondary"}
                      size="small"
                    >
                      {item.label}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connection - Centered */}
          <div style={{ textAlign: 'center' }}>
            <WalletConnect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 
