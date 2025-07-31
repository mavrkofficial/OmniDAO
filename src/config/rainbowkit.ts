import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import { http } from 'viem';

// Ink Layer 2 Chain Configuration - using mainnet as base like Mavrk
const inkChain = {
  ...mainnet,
  id: 57073,
  name: 'Ink Layer 2',
  network: 'ink',
  nativeCurrency: {
    name: 'INK',
    symbol: 'INK',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://ink.drpc.org'] },
    public: { http: ['https://ink.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'Ink Explorer', url: 'https://explorer.inkonchain.com' },
  },
  testnet: false,
  ens: null,
};

const chains = [inkChain];

export const config = getDefaultConfig({
  appName: 'Omni DAO',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b',
  chains,
  transports: {
    [inkChain.id]: http(),
  },
});

// Export chains for potential use elsewhere
export { chains }; 