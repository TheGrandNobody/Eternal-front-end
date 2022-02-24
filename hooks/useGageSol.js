import { useCallback, useEffect } from 'react';
import { getAllGages } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { getAllGageIDs, findAndUpdateGageStatus} from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadedContracts } from '../reducers/main';
import Web3 from 'web3';
import debounce from 'lodash.debounce';

function useGageSol() {
  const { loadedContracts, gageAddress } = useSelector((state) => state.eternal);
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStoreContracts();
  }, [account, gageAddress]);

  useEffect(() => {
    if (Object.keys(loadedContracts)?.length > 0) {
      Object.keys(loadedContracts)?.map((item) => {
        loadedContracts[item]?.on('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
      });
      return () => {
        Object.keys(loadedContracts)?.map((item) => {
          loadedContracts[item]?.removeListener('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
        });
      };
    }
  }, [loadedContracts]);

  const fetchStoreContracts = async () => {
    const req = await getAllGageIDs(account);
    let contracts = getAllGages(library, account, req?.data?.results || []);
    dispatch(changeLoadedContracts({ loadedContracts: contracts }));
  };

  const handleChangeOnStatus = useCallback(async (id, status) => {
    debounce(async () => await findAndUpdateGageStatus(Web3.utils.toDecimal(id), status), 200);
  }, []);
}

export default useGageSol;
