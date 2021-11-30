import { injected } from '../connector/connector';
import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000/api/' });

export const connectorsByName = {
  Injected: injected,
};

export const Addresses = {
  eternalPlatform: {
    4: '0xbd4680367CD0fF4a83F1d5F21B665599A35B6c69',
  },
  eternalTokenAddress: {
    4: '0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb',
  },
};


export const connectorLocalStorageKey = 'web3Connection';

export const tableTabs = ['Active', 'Pending', 'Closed'];
