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
    id: 57073,
    name: 'Ink Layer 2',
    logoUrl: 'https://explorer.inkonchain.com/favicon.ico',
    rpcUrl: 'https://ink.drpc.org',
    blockExplorer: 'https://explorer.inkonchain.com',
    nativeCurrency: {
      name: 'INK',
      symbol: 'INK',
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
