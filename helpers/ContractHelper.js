import { getAddress, getABI} from '../helpers/addressHelper';
import { Contract } from '@ethersproject/contracts';
import Web3 from 'web3';

export function getContract(entity, ABI, library, account) {
  return new Contract(getAddress(entity), getABI(ABI), getProviderOrSigner(library, account));
}

export const getGage = async (ABI, library, account, id) => {
  const storage = getContract('storage', 'storage', library, account);
  const address = await storage.getAddress(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('gages', id));
  return new Contract(address, getABI(ABI), getProviderOrSigner(library, account));
};

export const getGageFast = (address, ABI, library, account) => {
  return new Contract(address, getABI(ABI), getProviderOrSigner(library, account));
};

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
