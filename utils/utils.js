import { getWeb3NoAccount } from '../utils/web3';

export const toHex = (amount) => {
  return getWeb3NoAccount().utils.toHex(amount);
};

export const toWei = (amount) => {
  return getWeb3NoAccount().utils.toWei(amount.toString());
};

export const toGwei = (amount) => {
  return getWeb3NoAccount().utils.toWei(amount.toString(), 'gwei');
};

export const hexToNumber = (amount) => {
  return getWeb3NoAccount().utils.hexToNumber(amount?.toString());
};
