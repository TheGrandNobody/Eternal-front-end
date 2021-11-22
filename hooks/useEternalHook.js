import React from 'react';
import { useEternalPlatformContract } from './useContract';
import useEternalPlatformContractfunction from './useEternalPlatformContractFunctions';
import { findExistingGage } from '../services';

function useEternalHook() {
  const [amount, setAmount] = React.useState(null);
  const [riskType, setRistType] = React.useState(null);
  const [riskPercentage, setRiskPercentage] = React.useState(null);
  const { initiateStanderedGage } = useEternalPlatformContractfunction();

  const handleOnAmountSelect = (amount) => {
    setAmount(amount);
  };

  const handleClickOnRiskType = (riskType) => {
    setRistType(riskType);
  };

  const handleClickOnRiskPercentage = (percentage) => {
    setRiskPercentage(percentage);
  };

  const handleClickOnConfirmBtn = async (amount, riskType, riskPercentage) => {
    const req = await findExistingGage(amount, riskType, riskPercentage, 'pending');
    if (!req.data.length > 0) {
      initiateStanderedGage(amount, riskPercentage, riskType, 6);
      return;
    }
    alert('Hi gage already exist!');
  };

  return {
    amount,
    riskType,
    riskPercentage,
    handleOnAmountSelect,
    handleClickOnRiskType,
    handleClickOnRiskPercentage,
    handleClickOnConfirmBtn,
  };
}

export default useEternalHook;
