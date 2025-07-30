import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { walletConnectProvider, EIP6963Connector } from '@rainbow-me/rainbowkit';

const chains = [mainnet, polygon, bsc];

const { connectors } = getDefaultWallets({
  appName: 'Omni DAO',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '9c73cb7134cec477e1ef752dd9b4ba3b',
  chains,
});

export const wagmiConfig = createConfig({
  connectors: [
    ...connectors,
    new EIP6963Connector({ chains }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});

export { chains }; 