import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http, mainnet } from 'wagmi';

// Use mainnet as a base and override with Ink Layer 2 details
const inkChain = {
  ...mainnet,
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
});

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [inkChain.id]: http(),
  },
});

// Export chains for potential use elsewhere
export { chains }; 