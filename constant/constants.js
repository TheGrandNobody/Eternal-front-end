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
  'storage' : { 4 : '0xAC8E9492AEA0849Eb668EdD381657c0Fc4D553bE', 43114 : '0xCe14fB997897F5C05e91e2D7dAf65e5ad0fEa9B0' },
  'factory' : { 4 : '0xF059DD26E53642837cEEDE06340CC0615101B80B', 43114 : '0x3F5063EB4649A70146DE007c11384353Cbd5442b' },
  'treasury' : { 4 : '0xf3B929363905B764b1f404a8D0D10f6bDef9B1ec', 43114 : '0x72Efc5be9a400B53e83b2147c753ae5f9c7c8278' },
  'offering' : { 4 : '0xfCb4459Ea140612c0b5c892fdB1ED84b6c40EC07', 43114 : '0xB2A845F00F9CFe68315aE8406D2404CB40cF94C4' },
  'ETRNL' : { 4 : '0xFdbBbbFec5c8d4b834236FB9DA43fCD631c3dbef', 43114 : '0xC42935B0F74B8F597e26F2e5996BcF8a4Eef5663' },
  'AVAX' : { 4 : '0xc778417E063141139Fce010982780140Aa0cD5Ab', 43114 : '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7' },
  'USDC.e' : { 4 : '0x41a8B50a9e4298D51a7ceDf21b63BC42a8c9741f', 43114 : '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664' }
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
