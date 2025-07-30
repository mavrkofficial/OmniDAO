import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Chain {
  id: number;
  name: string;
  logoUrl: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

interface ChainContextType {
  selectedChain: Chain;
  setSelectedChain: (chain: Chain) => void;
  availableChains: Chain[];
}

const defaultChains: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  {
    id: 137,
    name: 'Polygon',
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  {
    id: 56,
    name: 'BSC',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
];

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const useChain = () => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error('useChain must be used within a ChainProvider');
  }
  return context;
};

interface ChainProviderProps {
  children: ReactNode;
}

export const ChainProvider: React.FC<ChainProviderProps> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(defaultChains[0]);

  const value = {
    selectedChain,
    setSelectedChain,
    availableChains: defaultChains,
  };

  return (
    <ChainContext.Provider value={value}>
      {children}
    </ChainContext.Provider>
  );
}; 