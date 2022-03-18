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
  'storage' : '0x62f163cB67ba4d7D84A7c4605e47EF2c52b30002',
  'factory' : '0x63A31F96004c59de6D34317eB239fC9C78E9f1EA',
  'treasury' : '0x9Ecf1AeBAceaDA86ACeD0b095Ba35A0989668d3B',
  'offering' : '0x45faa69c4807A1707443e284D5A9Aa327d06aFB2',
  'ETRNL' : '0x7EF011d4351A5ED9731BD66bc9848A182835CF31',
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
