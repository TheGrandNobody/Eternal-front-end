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
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  4: 4
};

export const connectorsByName = {
  MetaMask : [metaMask, metaMaskhooks],
  WalletConnect : [walletConnect, walletConnectHooks],
  WalletLink : [walletLink, walletLinkHooks]
};

export const addresses = {
  'storage' : '0xAC8E9492AEA0849Eb668EdD381657c0Fc4D553bE',
  'factory' : '0xF059DD26E53642837cEEDE06340CC0615101B80B',
  'treasury' : '0xf3B929363905B764b1f404a8D0D10f6bDef9B1ec',
  'offering' : '0xfCb4459Ea140612c0b5c892fdB1ED84b6c40EC07',
  'ETRNL' : '0xFdbBbbFec5c8d4b834236FB9DA43fCD631c3dbef',
  'AVAX' : '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  'USDC.e' : '0x41a8B50a9e4298D51a7ceDf21b63BC42a8c9741f'
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
