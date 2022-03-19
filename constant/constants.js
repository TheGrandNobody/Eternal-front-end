import { metaMask, metaMaskhooks, walletConnect, walletConnectHooks, walletLink, walletLinkHooks } from '../connector/connector';
import axios from 'axios';
import ERC20ABI from './abis/ERC20.json';
import StorageABI from './abis/Storage.json';
import FactoryABI from './abis/Factory.json';
import TreasuryABI from './abis/Treasury.json';
import OfferingABI from './abis/Offering.json';
import GageABI from './abis/Gage.json';
import LoyaltyABI from './abis/LoyaltyGage.json';
import TokenABI from './abis/Token.json';

export const api = axios.create({ baseURL: 'https://shrouded-ocean-93690.herokuapp.com/api' });

export const chainInfo = {
  43114: {
    chainId: 43114,
    chainName: 'Avalanche Network',
    nativeCurrency: 'AVAX',
    rpcUrls: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrls: 'https://snowtrace.io',
  },
  4: 4
};

export const connectorsByName = {
  MetaMask : [metaMask, metaMaskhooks],
  WalletConnect : [walletConnect, walletConnectHooks],
  WalletLink : [walletLink, walletLinkHooks]
};

export const addresses = {
  'storage' : '0x9E5D804da52bed1eE4E04Aef9aaF3A30eA6E569b',
  'factory' : '0x57E71E373bec6eA31254C72C6E0eb9C97590Ac24',
  'treasury' : '0xdc8efb2eb82464F5e24ac32095Fc53327e0C6149',
  'offering' : '0x4f536b206dB8847Ac83fC67228891D5B3B13795A',
  'ETRNL' : '0xCb8F7c6aeec88Fa37762750bEe746bF3d7258110',
  'AVAX' : '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  'MIM' : '0x3BB47234594e77306B5F5E67848729a7C9477d33'
};

export const abis = {
  'storage' : StorageABI,
  'factory' : FactoryABI,
  'treasury': TreasuryABI,
  'offering': OfferingABI,
  'token' : TokenABI,
  'ERC20' : ERC20ABI,
  'gage' : GageABI,
  'loyalty' : LoyaltyABI
};

export const tableTabs = ['Active', 'Pending', 'Closed'];
