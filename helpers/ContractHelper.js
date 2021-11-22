import EternalPlatformAbi from '../constant/abis/EternalPlatform.json';
import { getEternalPlatformAddress } from '../helpers/addressHelper';
import { Contract } from '@ethersproject/contracts';

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const getEternalPlatformContract = (library, account) => {
  return getContract(getEternalPlatformAddress(), EternalPlatformAbi, library, account);
};

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
