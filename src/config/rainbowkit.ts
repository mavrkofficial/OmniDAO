import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { walletConnectProvider, EIP6963Connector } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, bsc],
  [
    walletConnectProvider({ projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Omni DAO',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b',
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...connectors,
    new EIP6963Connector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
});

export { chains }; 