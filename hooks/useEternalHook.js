import useEternalPlatformContractfunction from './useEternalPlatformContractFunctions';
import { findExistingGage, addUserAddressToGage } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageDepositAmount, changeGageRiskPercentage, changeGageBonusPercentage, changeApproval, reset, changeGageCondition, changeGageAsset } from '../reducers/main';
import { useERC20, useEternalPlatformContract, useGageSolContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getWeb3NoAccount } from '../utils/web3';
import Web3 from 'web3';
import { getAddress } from '../helpers/addressHelper';

function useEternalHook() {
  const { account, library } = useWeb3React();
  const {
    gageType,
    asset,
    gageCondition: condition,
    gageDepositAmount: amount,
    gageRiskPercentage: riskPercentage,
    gageBonusPercentage: bonusPercentage
  } = useSelector((state) => state.eternal);

  const dispatch = useDispatch();
  const { initiateStanderedGage } = useEternalPlatformContractfunction();
  const router = useRouter();

  const handleClickOnApproveBtn = async (entity) => {
    let contract = useERC20(entity, library, account);
    const approval = await contract.approve('0x2fDA645542F0495a30312A49e5804Efb91409544', Web3.utils.toWei(`${amount}`, 'ether'));
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(approval.hash);
      if (receipt) {
        dispatch(changeApproval({ approval: true }));
        toast.success('Approved Successful !', { toastId: 2 });
        clearInterval(interval);
      }
    }, 500);
  };

  const handleOnAmountSelect = (amount) => {
    dispatch(changeGageDepositAmount({ depositAmount: amount }));
  };

  const handleOnAssetSelect = (asset) => {
    dispatch(changeGageAsset({ asset: asset }))
  };

  const handlePercents = async (asset) => {
    let contract = useEternalPlatformContract(library, account);
    const condition = await contract.percentCondition();
    dispatch(changeGageCondition({ condition: condition }));

    contract = useEternalStorage(library, account);
    const risk = await contract.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3(getAddress('risk', asset)));
    dispatch(changeGageRiskPercentage({ riskPercentage: (risk / 100) }));

    const riskConstant = await contract.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3(getAddress('riskConstant')));
    dispatch(dispatch(changeGageBonusPercentage({ bonusPercentage: ((risk - riskConstant) / 100) })));
  };

  const handleUserApproval = async (entity) => {
    let contract = useERC20(entity, library, account);
    const allowance = await contract.allowance(account, '0x2fDA645542F0495a30312A49e5804Efb91409544');
    return allowance >= amount;
  };

  const handleClickOnConfirmBtn = async (gageType, amount, riskType, riskPercentage) => {
    const req = await findExistingGage(gageType, amount, riskType, riskPercentage, 'pending');
    if (!req.data.length > 0) {
      await initiateStanderedGage(2);
      return;
    }
    let contract = useGageSolContract(library, account, req?.data[0].gageAddress);
    const join = await contract.join('0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb', amount * 1000000000, riskPercentage, false);
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(join.hash);
      if (receipt) {
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
    asset,
    riskPercentage,
    bonusPercentage,
    condition,
    handleOnAmountSelect,
    handleOnAssetSelect,
    handlePercents,
    handleClickOnConfirmBtn,
    handleClickOnApproveBtn,
    handleUserApproval
  };
}

export default useEternalHook;
