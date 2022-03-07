import { injected } from '../connector/connector';
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

export const connectorsByName = {
  Injected: injected,
};

export const addresses = {
  'storage' : '0x0E094AB21371e590f727d69cb719F133F5780313',
  'factory' : '0x7b24C45719e8264a0D6c7a7ec3c63168F91cc814',
  'treasury' : '0xCfa50052a37477fdA93cf621AE54448036e65688',
  'offering' : '0x806f06913Bbe0fBE9A70a1A8B0164716BF3dCb2a',
  'ETRNL' : '0x3C4c9a1c35b11df2a0fef7F2B5E0891f101245f8',
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

export const connectorLocalStorageKey = 'web3Connection';

export const tableTabs = ['Active', 'Pending', 'Closed'];
