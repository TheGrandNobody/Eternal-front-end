import { getContract, getGage} from '../helpers/ContractHelper';
import { useMemo } from 'react';
import Web3 from 'web3';

export const useContract = (entity, ABI, library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getContract(entity, ABI, library, account), [web3]);
};

export const getAllGages = (library, account, contractIDs) => {
  const dict = {};
  contractIDs?.map((item) => {
    if (item.id) {
      dict[item.id] = getGage('gage', library, account, item.id);
    }
  });
  return dict;
};
