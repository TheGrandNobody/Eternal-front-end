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
  'storage' : '0x50229588d87940B5c341F5ed64cF2d2DFb4A1AfA',
  'factory' : '0x284114D8A48Cfa08f9223047c577F68E31Dadad4',
  'treasury' : '0x470b9c0c8826136656B49e00D5f70a9c52d69307',
  'offering' : '0x38f905D8AEb702881234d3b22959a9780f83782a',
  'ETRNL' : '0x8B2F9E3d398EF806543183A63a84709F04D69D89',
  'AVAX' : '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  'MIM' : '0xfc547247703a2ae902D473F8856641dD30082D68'
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
