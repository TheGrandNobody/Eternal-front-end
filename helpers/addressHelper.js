import { addresses, abis } from '../constant/constants';

export const getAddress = (entity) => {
  return addresses[entity];
};

export const getABI = (entity) => {
  return abis[entity];
}
