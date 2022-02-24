import useFactoryFunction from './useEternalFactory';
import { findExistingGage} from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageDepositAmount, changeGageRiskPercentage, changeGageBonusPercentage, changeApproval, changeGageCondition, changeGageAsset, changeDepositInETRNL } from '../reducers/main';
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
  const token = useContract(asset, 'ERC20', library, account);
  const factory = useContract('factory', 'factory', library, account);
  const storage = useContract('storage', 'storage', library, account);
  const treasury = useContract('treasury', 'treasury', library, account);

  const handleClickOnApproveBtn = async () => {
    const approval = await token.approve(getAddress('treasury'), Web3.utils.toWei(amount, 'ether'));
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(approval.hash);
      if (receipt) {
        dispatch(changeApproval({ approval: true }));
        toast.success('Approval successful!', { toastId: 2 });
        clearInterval(interval);
      }
    }, 500);
  };

  const handleOnAmountSelect = async (amount, inETRNL) => {
    dispatch(changeGageDepositAmount({ depositAmount: amount }));
    if (inETRNL) {
      const depositInETRNL = await treasury.computeMinAmounts(getAddress(asset), getAddress('ETRNL'), Web3.utils.toWei(amount, 'ether'), 0);
      dispatch(changeDepositInETRNL({ depositInETRNL: Web3.utils.fromWei(Web3.utils.toBN(depositInETRNL[2])) }));
    } else {
      dispatch(changeDepositInETRNL({ depositInETRNL: '0.0' }));
    }
  };

  const handleOnAssetSelect = (asset) => {
    dispatch(changeGageAsset({ asset: asset }))
  };

  const handlePercents = async () => {
    const condition = await factory.percentCondition();
    dispatch(changeGageCondition({ condition: Web3.utils.toDecimal(condition) / 10**11 }));
    const risk = await storage.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('risk', getAddress(asset)));
    dispatch(changeGageRiskPercentage({ riskPercentage: Web3.utils.toDecimal(risk) / 100 }));
    const riskConstant = await storage.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('riskConstant'));
    dispatch(dispatch(changeGageBonusPercentage({ bonusPercentage: ((Web3.utils.toDecimal(risk) - Web3.utils.toDecimal(riskConstant)) / 100) })));
  };

  const handleUserApproval = async () => {
    if (asset == 'AVAX') {
      return true;
    }
    const allowance = await token.allowance(account, getAddress('treasury'));
    /** 
    console.log("allowance", allowance);
    */
    return allowance >= Web3.utils.toWei(amount, 'ether');
  };

  const handleClickOnConfirmBtn = async () => {
    const req = await findExistingGage(gageType, account, asset);
    if (!req.data.length > 0) {
      const gageLimitReached = await factory.gageLimitReached(getAddress(asset), Web3.utils.toWei(amount, 'ether'), riskPercentage * 100);
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
