import React, { useEffect, useState } from 'react';
import { useAllGagesSolContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { getAllGagesAddresses, findAndUpdateGageStatus, addUserAddressToGage } from '../services/index';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadedContracts } from '../reducers/main';

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
        loadedContracts[item]?.on('UserAdded', handleOnUserAdded);
        loadedContracts[item]?.on('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
      });
      return () => {
        Object.keys(loadedContracts)?.map((item) => {
          loadedContracts[item]?.removeListener('GageInitiated', (id) => handleChangeOnStatus(id, 'active'));
          loadedContracts[item]?.removeListener('UserAdded', handleOnUserAdded);
          loadedContracts[item]?.removeListener('GageClosed', (id) => handleChangeOnStatus(id, 'closed'));
        });
      };
    }
  }, [loadedContracts]);

  const fetchStoreContracts = async () => {
    const req = await getAllGagesAddresses(account);
    let contracts = useAllGagesSolContract(library, account, req?.data.results || []);
    dispatch(changeLoadedContracts({ loadedContracts: contracts }));
  };

  const handleChangeOnStatus = async (id, status) => {
    await findAndUpdateGageStatus({ id: id, status: status });
  };

  const handleOnUserAdded = async (gageId, userId) => {
    await addUserAddressToGage(gageId, userId);
  };

  console.log(loadedContracts);
}

export default useGageSol;
