import { injected } from '../connector/connector';
import axios from 'axios';

export const api = axios.create({ baseURL: 'https://shrouded-ocean-93690.herokuapp.com/' });

export const connectorsByName = {
  Injected: injected,
};

export const Addresses = {
  eternalPlatform: {
    4: '0x2fDA645542F0495a30312A49e5804Efb91409544',
  },
  eternalTokenAddress: {
    4: '0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb',
  },
};

export const connectorLocalStorageKey = 'web3Connection';

export const tableTabs = ['Active', 'Pending', 'Closed'];
