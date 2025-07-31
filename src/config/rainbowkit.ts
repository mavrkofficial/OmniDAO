import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';

// Ink Layer 2 Chain Configuration - EXACT same structure as Mavrk
const inkChain = {
  id: 57073,
  name: 'INK L2',
  network: 'ink',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://ink.drpc.org'] },
    public: { http: ['https://ink.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'INKScan', url: 'https://inkscan.ink' },
  },
  testnet: false,
  ens: null,
};

const chains = [inkChain];

export const config = getDefaultConfig({
  appName: 'Omni DAO',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b',
  chains: chains as any,
  transports: {
    [inkChain.id]: http(),
  },
});

// Export chains for potential use elsewhere
export { chains }; 