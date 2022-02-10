import { getEternalPlatformContract, getGageSolContract, getERC20Contract } from '../helpers/ContractHelper';
import { useMemo } from 'react';
import Web3 from 'web3';

export const useEternalPlatformContract = (library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getEternalPlatformContract(library, account), [web3]);
};

export const useAllGagesSolContract = (library, account, contractAddresses) => {
  const dict = {};
  contractAddresses?.map((item) => {
    if (item.gageAddress) {
      dict[item.gageAddress] = getGageSolContract(library, account, item.gageAddress);
    }
  });
  return dict;
};

export const useGageSolContract = (library, account, contractAddress) => {
  return getGageSolContract(library, account, contractAddress);
};

export const useERC20 = (address, library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getERC20Contract(address, library, account), [web3]);
};
