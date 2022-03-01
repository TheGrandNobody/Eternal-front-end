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
import useOfferingFunction from './useEternalOffering';
import { toNumber } from 'lodash';

function useEternalHook() {
  const { account, library } = useWeb3React();
  const {
    gageType,
    gageAsset: asset,
    gageDepositAmount: amount,
    gageRiskPercentage: riskPercentage,
    gageBonusPercentage: bonusPercentage,
    depositInETRNL
  } = useSelector((state) => state.eternal);
  const dispatch = useDispatch();
  const { initiateLiquidGage } = useFactoryFunction();
  const { initiateLoyaltyGage, 
          initiateDeposit } = useOfferingFunction();
  const token = useContract(asset, 'ERC20', library, account);
  const factory = useContract('factory', 'factory', library, account);
  const storage = useContract('storage', 'storage', library, account);
  const treasury = useContract('treasury', 'treasury', library, account);
  const offering = useContract('offering', 'offering', library, account);

  const handleClickOnApproveBtn = async (entity) => {
    const approval = await token.approve(getAddress(entity), Web3.utils.toWei(amount));
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

  const handleConversionToETRNL = async (inETRNL, gage, bonus) => {
    if (inETRNL) {
      let rewards;
      if (gage) {
        const amountETRNL = await treasury.computeMinAmounts(getAddress(asset), getAddress('ETRNL'), Web3.utils.toWei(amount), 0);
        if (bonus == 0) {
          rewards = Web3.utils.toBN(amountETRNL[2]).muln(100).divn(bonusPercentage * 100);
        } else {
          rewards = Web3.utils.toBN(amountETRNL[2]).muln(100).divn(bonus * 100);
        }
      } else {
        rewards = await treasury.computeMinAmounts(getAddress(asset), getAddress('ETRNL'), Web3.utils.toWei(amount), 0);
        rewards = Web3.utils.toBN(rewards[2]);
      }
      dispatch(changeDepositInETRNL({ depositInETRNL: Web3.utils.fromWei(rewards) }));
    } else {
      dispatch(changeDepositInETRNL({ depositInETRNL: '0.0' }));
    }
  };

  const handleOnAssetSelect = (asset) => {
    dispatch(changeGageAsset({ asset: asset }))
  };

  const handlePercents = async (igo) => {
    const condition = await factory.percentCondition();
    dispatch(changeGageCondition({ condition: Web3.utils.toDecimal(condition) / 10 ** 11 }));
    const risk = igo ? await offering.viewRisk() : await storage.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('risk', getAddress(asset)));
    dispatch(changeGageRiskPercentage({ riskPercentage: Web3.utils.toDecimal(risk) / 100 }));
    const riskConstant = await storage.getUint(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('riskConstant'));
    dispatch(changeGageBonusPercentage({ bonusPercentage: ((Web3.utils.toDecimal(risk) - Web3.utils.toDecimal(riskConstant)) / 100) }));

    return ((Web3.utils.toDecimal(risk) - Web3.utils.toDecimal(riskConstant)) / 100);
  };

  const handleUserApproval = async (entity) => {
    if (asset == 'AVAX') {
      return true;
    }
    const allowance = await token.allowance(account, getAddress(entity));

    if (amount) {
      return allowance >= Web3.utils.toWei(amount);
    };
    return false
  }

  const initiateGage = async (activity) => {
    const req = await findExistingGage(gageType, account, asset);
    if (!req.data.length > 0) {
      switch (activity) {
        case 2:
          const gageLimitReached = await factory.gageLimitReached(getAddress(asset), Web3.utils.toWei(amount), riskPercentage * 100);
          if (!gageLimitReached) {
            await initiateLiquidGage();
            return;
          }
          break;
        case 3:
          const amountETRNL = Web3.utils.toBN(Web3.utils.toWei(depositInETRNL)).muln(10000).divn(bonusPercentage * 100);
          const global = amountETRNL.muln(2).add(Web3.utils.toBN(Web3.utils.toWei(depositInETRNL)));
          const globalLimit = await offering.checkGlobalLimit(global.toString());
          if (globalLimit) {
            const individual = amountETRNL.add(Web3.utils.toBN(Web3.utils.toWei(depositInETRNL))).muln(2);
            const individualLimit = await offering.checkIndividualLimit(individual.toString(), account);
            if (individualLimit) {
              await initiateLoyaltyGage();
              return;
            }
            toast.error('This amount exceeds your individual IGO limit.', {toastId: 1});
            return;
          }
          toast.error('This amount exceeds the global IGO limit', {toastId: 1});
          return;
        default:
          return;
      }
      toast.error('The gaging limit is reached! No more gages can be created.', {toastId: 1});
      return;
    }
    toast.error('You are already in a gage (of this type) with this asset.', {toastId: 1});
  };

  const handleClickOnConfirmBtn = async (activity) => {
    switch (activity) {
      case 1:
        const globalLimit = await offering.checkGlobalLimit(depositInETRNL, account);
        if (globalLimit) {
          const individualLimit = await offering.checkIndividualLimit(depositInETRNL, account);
          if (individualLimit) {
            await initiateDeposit();
            return;
          }
          toast.error('This amount exceeds your individual IGO limit.', {toastId: 1});
          return;
        }
        toast.error('This amount exceeds the global IGO limit.', {toastId: 1});
        break;
      default:
        initiateGage(activity);
        return;
    }
  }

  const offeringStats = async () => {
    let remainingETRNL;
    const quarter = Web3.utils.toBN(await offering.LIMIT()).divn(4);
    const totalETRNL = Web3.utils.toBN(await offering.viewTotalETRNLOffered());
    if (totalETRNL.lt(quarter)) {
      remainingETRNL = Math.floor(toNumber(Web3.utils.fromWei(quarter.sub(totalETRNL))));
    } else if (totalETRNL.lt(quarter.muln(2))) {
      remainingETRNL = Math.floor(toNumber(Web3.utils.fromWei(quarter.muln(2).sub(totalETRNL))));
    } else if (totalETRNL.lt(quarter.muln(3))) {
      remainingETRNL = Math.floor(toNumber(Web3.utils.fromWei(quarter.muln(3).sub(totalETRNL))));
    } else {
      remainingETRNL = Math.floor(toNumber(Web3.utils.fromWei(quarter.muln(4).sub(totalETRNL))));
    }
    const liquidityDeposited = Math.floor(toNumber(Web3.utils.fromWei(Web3.utils.toBN(await offering.viewLiquidityDeposited(account)))));
    const totalContribution = Math.floor(toNumber(Web3.utils.fromWei(Web3.utils.toBN(await offering.viewLiquidityOffered(account)))));
    const amountAVAX = await treasury.computeMinAmounts(getAddress('ETRNL'), getAddress('AVAX'), Web3.utils.toWei('1'), 0);
    const amountMIM = await treasury.computeMinAmounts(getAddress('ETRNL'), getAddress('MIM'), Web3.utils.toWei('1'), 0);
    const priceAVAX = Web3.utils.fromWei(Web3.utils.toBN(amountAVAX[2]));
    const priceMIM = Web3.utils.fromWei(Web3.utils.toBN(amountMIM[2]));

    return {
      totalContribution, 
      liquidityDeposited,
      remainingETRNL,
      priceAVAX,
      priceMIM,
    };
  }

  return {
    amount,
    asset,
    handleOnAmountSelect,
    handleOnAssetSelect,
    handleConversionToETRNL,
    handlePercents,
    handleClickOnConfirmBtn,
    handleClickOnApproveBtn,
    handleUserApproval,
    offeringStats
  };
}

export default useEternalHook;
