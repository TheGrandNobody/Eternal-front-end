import { useEternalPlatformContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { createGage } from '../services';
import { useRouter } from 'next/router';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { changeGageAddress } from '../reducers/main';

function useEternalPlatformContractfunction() {
  const { library, account } = useWeb3React();
  const { gageDepositAmount, gageType, gageRiskType, gageRiskPercentage } = useSelector((state) => state.eternal);
  const eternalContract = useEternalPlatformContract(library, account);
  const [gageId, setGageId] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (gageId) {
      const timer = setInterval(async () => {
        const gageAddress = await eternalContract.viewGageAddress(gageId);
        if (gageAddress !== '0x0000000000000000000000000000000000000000') {
          console.log(gageAddress);
          await createGage(gageType, gageAddress, gageDepositAmount, gageRiskType, gageRiskPercentage, gageId, account);
          dispatch(changeGageAddress({ gageAddress: gageAddress }));
          toast.success('Gage Created Successfully', { toastId: 1 });
          clearTimeout(timer);
          router.push('/user-info');
        }
      }, 500);
    }
  }, [gageId]);

  const initiateStanderedGage = async (gageType, amount, riskPercentage, riskType, users, handleOnGageInitiate, setFoundedGage) => {
    const initiateGage = await eternalContract.initiateStandardGage(users);
    const interval = setInterval(async () => {
      let recieptC = await getWeb3NoAccount().eth.getTransactionReceipt(initiateGage.hash);
      console.log(recieptC);
      if (recieptC) {
        let id = Web3.utils.toDecimal(recieptC.logs[0].data);
        console.log(id);
        setGageId(id);
        setFoundedGage({ gageId: id });
        handleOnGageInitiate();

        clearInterval(interval);
      }
    }, 5000);
  };

  // const handleOnNewGageEventEmitted = async (gageId, gageAddress) => {
  //   // await findAndUpdateGageAddress(gageId.toString(), gageAddress, account);
  //   dispatch(changeGageAddress({ gageAddress: gageAddress }));
  // };

  return {
    initiateStanderedGage,
    eternalContract,
    // handleOnNewGageEventEmitted,
  };
}

export default useEternalPlatformContractfunction;
