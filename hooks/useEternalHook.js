import useFactoryFunction from './useEternalFactory';
import { findExistingGage} from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageDepositAmount, changeGageRiskPercentage, changeGageBonusPercentage, changeApproval, changeGageCondition, changeGageAsset } from '../reducers/main';
import { useContract} from './useContract';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { getWeb3NoAccount } from '../utils/web3';
import Web3 from 'web3';
import { getAddress } from '../helpers/addressHelper';

function useEternalHook() {
  const { account, library } = useWeb3React();
  const {
    gageType,
    gageAsset: asset,
    gageCondition: condition,
    gageDepositAmount: amount,
    gageRiskPercentage: riskPercentage,
    gageBonusPercentage: bonusPercentage
  } = useSelector((state) => state.eternal);

  const dispatch = useDispatch();
  const { initiateLiquidGage } = useFactoryFunction();

  const handleClickOnApproveBtn = async () => {
    let contract = useContract(asset, 'ERC20', library, account);
    const approval = await contract.approve(getAddress('treasury'), Web3.utils.toWei(`${amount}`, 'ether'));
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(approval.hash);
      if (receipt) {
        dispatch(changeApproval({ approval: true }));
        toast.success('Approval successful!', { toastId: 2 });
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

  const handlePercents = async () => {
    let contract = useContract('factory', 'factory', library, account);
    const condition = await contract.percentCondition();
    dispatch(changeGageCondition({ condition: condition }));

    contract = useContract('storage', 'storage', library, account);
    const risk = await contract.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('risk', asset));
    dispatch(changeGageRiskPercentage({ riskPercentage: (risk / 100) }));
    const riskConstant = await contract.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('riskConstant'));
    dispatch(dispatch(changeGageBonusPercentage({ bonusPercentage: ((risk - riskConstant) / 100) })));
  };

  const handleUserApproval = async () => {
    let contract = useContract(asset, 'ERC20', library, account);
    const allowance = await contract.allowance(account, getAddress('treasury'));
    return allowance >= Web3.utils.toWei(`${amount}`, 'ether');
  };

  const handleClickOnConfirmBtn = async () => {
    const req = await findExistingGage(gageType, account, asset);
    if (!req.data.length > 0) {
      let contract = useContract('factory', 'factory', library, account);
      const gageLimitReached = await contract.gageLimitReached(getAddress(asset), Web3.utils.toWei(`${amount}`, 'ether'), risk);
      if (!gageLimitReached) {
        await initiateLiquidGage();
        return;
      }
      toast.success('The gaging limit is reached! No more gages can be created.', {toastId: 2});
      return;
    }
    toast.success('You are already in a gage with this asset.', { toastId: 2 });
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
