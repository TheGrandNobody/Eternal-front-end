import { injected } from '../connector/connector';
import axios from 'axios';

export const api = axios.create({ baseURL: 'https://shrouded-ocean-93690.herokuapp.com/api' });

export const connectorsByName = {
  Injected: injected,
};

export const addresses = {
  'storage' : '0x93D97933bf46B75F1b02Ae715e09c35161Cf54F3',
  'factory' : '0x0624136362c82ec4BCe54622486F12981f4299F2',
  'treasury' : '0x3e38D452eC36798f7583cAd563C9C71587d5c102',
  'offering' : '0x0A0FE39196E01F596483CB3C3997DeA30736d32D',
  'ETRNL' : '0x461f3652f6b7B386CFDaAaCA636c233702180B71',
  'AVAX' : '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  'MIM' : '0x130966628846BFd36ff31a822705796e8cb8C18D'
};

export const connectorLocalStorageKey = 'web3Connection';

export const tableTabs = ['Active', 'Pending', 'Closed'];
