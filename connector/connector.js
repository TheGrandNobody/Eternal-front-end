import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletLink } from '@web3-react/walletlink';

export const [metaMask, metaMaskhooks] = initializeConnector((actions) => new MetaMask(actions), [4, 43114]);

export const [walletConnect, walletConnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnect(actions, {
      rpc: {4 : 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', 43114 : 'https://api.avax.network/ext/bc/C/rpc'},
    }), 
    [4, 43114]
);

export const [walletLink, walletLinkHooks] = initializeConnector(
  (actions) =>
    new WalletLink(actions, {
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      appName: 'web3-react',
    }),
    [4, 43114]
);