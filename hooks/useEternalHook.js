import useEternalPlatformContractfunction from './useEternalPlatformContractFunctions';
import { findExistingGage, getUserApprovalStatus, createUserApprovalStatus, addUserAddressToGage } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageDepositAmount, changeGageRiskPercentage, changeGageRiskType, changeApproval, reset } from '../reducers/main';
import { useGageSolContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEternalTokenAddress } from './useContract';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useGageSol from './useGageSol';
import { getWeb3NoAccount } from '../utils/web3';
import Web3 from 'web3';

function useEternalHook() {
  const { account, library } = useWeb3React();
  const {
    gageAddress,
    gageType,
    gageDepositAmount: amount,
    gageRiskPercentage: riskPercentage,
    gageRiskType: riskType,
    loadedContracts,
  } = useSelector((state) => state.eternal);

  const [foundedGage, setFoundedGage] = useState(null);

  const dispatch = useDispatch();
  const { initiateStanderedGage } = useEternalPlatformContractfunction();
  const eternalTokenContract = useEternalTokenAddress(library, account);
  // const [gageInitiated, setGageInitiated] = useState(false);

  const router = useRouter();
  // const handleOnGageInitiate = () => {
  //   setGageInitiated(true);
  // };
  const gage = useGageSol();

  const handleClickOnApproveBtn = async (amount) => {
    const approvalreq = await eternalTokenContract.approve('0x2fDA645542F0495a30312A49e5804Efb91409544', Web3.utils.toWei(`${amount}`, 'ether'));
    let interval = setInterval(async () => {
      let reciept = await getWeb3NoAccount().eth.getTransactionReceipt(approvalreq.hash);
      if (reciept) {
        dispatch(changeApproval({ approval: true }));
        await createUserApprovalStatus(account, true);
        toast.success('Approved Successful !', { toastId: 2 });
        clearInterval(interval);
      }
    }, 500);
  };

  const handleOnAmountSelect = (amount) => {
    dispatch(changeGageDepositAmount({ depositAmount: amount }));
  };

  const handleClickOnRiskType = (riskType) => {
    dispatch(changeGageRiskType({ riskType: riskType }));
  };

  const handleClickOnRiskPercentage = (percentage) => {
    dispatch(changeGageRiskPercentage({ riskPercentage: percentage }));
  };

  const handleUserApproval = async (account) => {
    const req = await getUserApprovalStatus(account);
    return req.data;
  };

  const handleClickOnConfirmBtn = async (gageType, amount, riskType, riskPercentage) => {
    const req = await findExistingGage(gageType, amount, riskType, riskPercentage, 'pending');
    if (!req.data.length > 0) {
      await initiateStanderedGage(2);
      return;
    }
    setFoundedGage(req?.data);
    let contract = useGageSolContract(library, account, req?.data[0].gageAddress);
    const join = await contract.join('0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb', amount * 1000000000, riskPercentage, false);
    let interval = setInterval(async () => {
      let reciept = await getWeb3NoAccount().eth.getTransactionReceipt(join.hash);
      if (reciept) {
        await addUserAddressToGage(req?.data[0]?.gageId, account);
        clearInterval(interval);
        toast.success('Gage Joined Successfully', { toastId: 2 });
        router.push('/user-info');
        dispatch(reset());
      }
    }, 1000);
  };

  return {
    gageType,
    amount,
    riskPercentage,
    riskType,
    handleOnAmountSelect,
    handleClickOnRiskType,
    handleClickOnRiskPercentage,
    handleClickOnConfirmBtn,
    handleUserApproval,
    handleClickOnApproveBtn,
  };
}

export default useEternalHook;
