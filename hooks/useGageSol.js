import React, { useCallback, useEffect, useState } from 'react';
import { useAllGagesSolContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { getAllGagesAddresses, findAndUpdateGageStatus, addUserAddressToGage, removeUserAddressToGage } from '../services';
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
        loadedContracts[item]?.on('GageInitiated', (id) => handleChangeOnStatus(id, 'active'));
        loadedContracts[item]?.on('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
        loadedContracts[item]?.on('UserRemoved', handleOnRemoveUser);
        loadedContracts[item]?.on('UserAdded', handleOnUserAdded);
      });
      return () => {
        Object.keys(loadedContracts)?.map((item) => {
          loadedContracts[item]?.removeListener('GageInitiated', (id) => handleChangeOnStatus(id, 'active'));
          loadedContracts[item]?.removeListener('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
          loadedContracts[item]?.removeListener('UserAdded', handleOnUserAdded);
          loadedContracts[item]?.removeListener('UserRemoved', handleOnRemoveUser);
        });
      };
    }
  }, [loadedContracts]);

  const fetchStoreContracts = async () => {
    const req = await getAllGagesAddresses(account);
    let contracts = useAllGagesSolContract(library, account, req?.data?.results || []);
    dispatch(changeLoadedContracts({ loadedContracts: contracts }));
  };

  const handleChangeOnStatus = useCallback(async (id, status) => {
    debounce(async () => await findAndUpdateGageStatus(Web3.utils.toDecimal(id), status), 200);
  }, []);

  const handleOnUserAdded = useCallback(async (gageId, userId) => {
    debounce(async () => await addUserAddressToGage(Web3.utils.toDecimal(gageId), userId), 200);
  }, []);

  const handleOnRemoveUser = useCallback(async (gageId, userAddress) => {
    debounce(async () => await removeUserAddressToGage(Web3.utils.toDecimal(gageId), userAddress), 200);
  }, []);
}

export default useGageSol;
