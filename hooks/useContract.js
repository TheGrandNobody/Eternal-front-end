import { getContract, getGage} from '../helpers/ContractHelper';
import { useMemo } from 'react';
import Web3 from 'web3';

export const useContract = (entity, ABI, library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getContract(entity, ABI, library, account), [web3, entity]);
};

export const getAllGages = async (library, account, contractIDs) => {
  const dict = {};
  await Promise.all(contractIDs?.map(async (item) => {
    if (item.id) {
      try {
        dict[item.id] = await getGage('gage', library, account, item.id);
      }
      catch (err) {

      }
    }
  }));
  return dict;
};
