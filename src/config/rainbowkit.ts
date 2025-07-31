import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';

// Ink Layer 2 Chain Configuration
const inkChain = {
  id: 57073,
  name: 'Ink Layer 2',
  network: 'ink',
  nativeCurrency: {
    decimals: 18,
    name: 'INK',
    symbol: 'INK',
  },
  rpcUrls: {
    default: { http: ['https://ink.drpc.org'] },
    public: { http: ['https://ink.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'Ink Explorer', url: 'https://explorer.inkonchain.com' },
  },
};

const chains = [inkChain];

const { connectors } = getDefaultWallets({
  appName: 'Omni DAO',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b',
  chains,
});

export const wagmiConfig = createConfig({
  connectors,
  transports: {
    [inkChain.id]: http(),
  },
}); 