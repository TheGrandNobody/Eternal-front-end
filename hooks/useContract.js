import { getEternalPlatformContract } from '../helpers/ContractHelper';
import { useMemo } from 'react';
import Web3 from 'web3';

export const useEternalPlatformContract = (library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getEternalPlatformContract(library, account), [web3]);
};
