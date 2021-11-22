import React, { useEffect, useCallback, useState } from 'react';
import { useEternalPlatformContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { createGage, findAndUpdateGageAddress } from '../services';
import { useRouter } from 'next/router';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-toastify';

import Web3 from 'web3';

function useEternalPlatformContractfunction() {
  const { active, library, account, error } = useWeb3React();
  const router = useRouter();
  const eternalContract = useEternalPlatformContract(library, account);

  const initiateStanderedGage = async (amount, riskPercentage, riskType, users) => {
    const initiateGage = await eternalContract.functions.initiateStandardGage(users);

    const interval = setInterval(async () => {
      const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(initiateGage.hash);
      if (receipt) {
        const newGageId = Web3.utils.toDecimal(receipt.logs[0].data).toString();
        await createGage(amount, riskPercentage, riskType, newGageId, account);
        toast.success('Gage Created Successfully', { toastId: 1 });
        clearInterval(interval);
        router.push('/user-info');
      }
    }, 100);
  };

  const handleOnNewGageEventEmitted = async (gageId, gageAddress) => {
    await findAndUpdateGageAddress(gageId.toString(), gageAddress, account);
  };

 

  return {
    initiateStanderedGage,
    eternalContract,
    handleOnNewGageEventEmitted,
  
  };
}

export default useEternalPlatformContractfunction;
