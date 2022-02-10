import EternalPlatformAbi from '../constant/abis/EternalPlatform.json';
import EternalGageSolAbi from '../constant/abis/EternalGageSol.json';
import ERC20Abi from '../constant/abis/ERC20.json';

import { getAddress} from '../helpers/addressHelper';
import { Contract } from '@ethersproject/contracts';

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const getEternalPlatformContract = (library, account) => {
  return getContract(getAddress('factory'), EternalPlatformAbi, library, account);
};

export const getGageSolContract = (library, account, contractAddress, abi) => {
  return getContract(contractAddress, EternalGageSolAbi, library, account);
};

export const getERC20Contract = (address, library, account) => {
  return getContract(getAddress(address), ERC20Abi, library, account);
};

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
