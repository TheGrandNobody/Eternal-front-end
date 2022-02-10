import { injected } from '../connector/connector';
import axios from 'axios';

export const api = axios.create({ baseURL: 'https://shrouded-ocean-93690.herokuapp.com/api' });

export const connectorsByName = {
  Injected: injected,
};

export const addresses = {
  'storage': '',
  'factory': '0x2fDA645542F0495a30312A49e5804Efb91409544',
  'ETRNL': '0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb',
  'AVAX' : '0x130966628846BFd36ff31a822705796e8cb8C18D'
};

export const connectorLocalStorageKey = 'web3Connection';

export const tableTabs = ['Active', 'Pending', 'Closed'];
