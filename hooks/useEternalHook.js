import useFactoryFunction from './useEternalFactory';
import { findExistingGage} from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageDepositAmount, changeGageRiskPercentage, changeGageBonusPercentage, changeApproval, changeGageCondition, changeGageAsset, changeDepositInETRNL } from '../reducers/main';
import { useContract} from './useContract';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { getWeb3NoAccount } from '../utils/web3';
import { toWei, toBN, fromWei, toDecimal, soliditySha3 } from 'web3-utils';
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
    const tx = await token.approve(getAddress(entity), toWei('1000000000000000000'));
    return tx;
  };

  const handleOnAmountSelect = (amount) => {
    dispatch(changeGageDepositAmount({ depositAmount: amount }));
  };

  const handleConversionToETRNL = async (inETRNL, gage, bonus) => {
    if (inETRNL) {
      let rewards;
      if (gage) {
        const amountETRNL = await treasury.computeMinAmounts(getAddress(asset), getAddress('ETRNL'), toWei(amount), 0);
        if (bonus == 0) {
          rewards = toBN(amountETRNL[2]).muln(100).divn(bonusPercentage * 100);
        } else {
          rewards = toBN(amountETRNL[2]).muln(100).divn(bonus * 100);
        }
      } else {
        rewards = await treasury.computeMinAmounts(getAddress(asset), getAddress('ETRNL'), toWei(amount), 0);
        rewards = toBN(rewards[2]);
      }
      dispatch(changeDepositInETRNL({ depositInETRNL: fromWei(rewards) }));
    } else {
      dispatch(changeDepositInETRNL({ depositInETRNL: '0.0' }));
    }
  };

  const handleOnAssetSelect = (asset) => {
    dispatch(changeGageAsset({ asset: asset }))
  };

  const handlePercents = async (igo) => {
    const condition = await factory.percentCondition();
    dispatch(changeGageCondition({ condition: toDecimal(condition) / 10 ** 11 }));
    const risk = igo ? await offering.viewRisk() : await storage.getUint(await factory.entity(), soliditySha3('risk', getAddress(asset)));
    dispatch(changeGageRiskPercentage({ riskPercentage: toDecimal(risk) / 100 }));
    const riskConstant = await storage.getUint(await factory.entity(), await factory.riskConstant());
    dispatch(changeGageBonusPercentage({ bonusPercentage: ((toDecimal(risk) - toDecimal(riskConstant)) / 100) }));

    return ((toDecimal(risk) - toDecimal(riskConstant)) / 100);
  };

  const handleUserApproval = async (entity) => {
    if (asset == 'AVAX') {
      return true;
    }
    const allowance = await token.allowance(account, getAddress(entity));

    if (amount) {
      return allowance >= toWei(amount);
    };
    return false
  }

  const initiateGage = async (activity) => {
    const req = await findExistingGage(gageType, account, asset);
    if (!req.data.length > 0) {
      switch (activity) {
        case 2:
          const gageLimitReached = await factory.gageLimitReached(getAddress(asset), toWei(amount), riskPercentage * 100);
          if (!gageLimitReached) {
            await initiateLiquidGage();
            return;
          }
          break;
        case 3:
          const amountETRNL = toBN(toWei(depositInETRNL)).muln(10000).divn(bonusPercentage * 100);
          const global = amountETRNL.muln(2).add(toBN(toWei(depositInETRNL)));
          const globalLimit = await offering.checkGlobalLimit(global.toString());
          if (globalLimit) {
            const individual = amountETRNL.add(toBN(toWei(depositInETRNL))).muln(2);
            const individualLimit = await offering.checkIndividualLimit(individual.toString(), account);
            if (individualLimit) {
              const tx = await initiateLoyaltyGage();
              return tx;
            }
            toast.error('This amount exceeds your individual IGO limit.', {toastId: 1});
            return;
          }
          toast.error('This amount exceeds the global IGO limit', {toastId: 1});
          return;
        default:
          return;
      }
      toast.error('This amount exceeds the gaging limit.', { toastId: 1 });
      return;
    }
    toast.error('You are already in a gage (of this type) with this asset.', { toastId: 1 });
  };

  const handleClickOnConfirmBtn = async (activity) => {
    let tx;
    switch (activity) {
      case 1:
        const globalLimit = await offering.checkGlobalLimit(depositInETRNL, account);
        if (globalLimit) {
          const individualLimit = await offering.checkIndividualLimit(depositInETRNL, account);
          if (individualLimit) {
            tx = await initiateDeposit();
            return tx;
          }
          toast.error('This amount exceeds your individual IGO limit.', { toastId: 1 });
          return;
        }
        toast.error('This amount exceeds the global IGO limit.', { toastId: 1 });
        return;
      case 4:
        try {
          tx = await treasury.stake(toWei(amount));
        }
        catch {
          toast.error('Insufficient ETRNL balance.', { toastId: 1 });
          return;
        }
        return tx;
      case 5:
        try {
          tx = await treasury.unstake(toWei(amount));
        }
        catch {
          toast.error('Your staking balance is lower than this amount.', { toastId: 1 });
          return;
        }
        return tx;
      default:
        tx = await initiateGage(activity);
        return tx;
    }
  }

  const offeringStats = async () => {
    let remainingETRNL;
    const quarter = toBN(await offering.LIMIT()).divn(4);
    const totalETRNL = toBN(await offering.viewTotalETRNLOffered());
    if (totalETRNL.lt(quarter)) {
      remainingETRNL = Math.floor(toNumber(fromWei(quarter.sub(totalETRNL))));
    } else if (totalETRNL.lt(quarter.muln(2))) {
      remainingETRNL = Math.floor(toNumber(fromWei(quarter.muln(2).sub(totalETRNL))));
    } else if (totalETRNL.lt(quarter.muln(3))) {
      remainingETRNL = Math.floor(toNumber(fromWei(quarter.muln(3).sub(totalETRNL))));
    } else {
      remainingETRNL = Math.floor(toNumber(fromWei(quarter.muln(4).sub(totalETRNL))));
    }
    let liquidityDeposited = toNumber(fromWei(toBN(await offering.viewLiquidityDeposited(account))));
    let totalContribution = toNumber(fromWei(toBN(await offering.viewLiquidityOffered(account))));
    const liquidityGaged = (totalContribution - liquidityDeposited).toFixed(2);
    liquidityDeposited = liquidityDeposited.toFixed(2);
    totalContribution = totalContribution.toFixed(2);
    const amountAVAX = await treasury.computeMinAmounts(getAddress('ETRNL'), getAddress('AVAX'), toWei('1'), 0);
    const amountMIM = await treasury.computeMinAmounts(getAddress('ETRNL'), getAddress('MIM'), toWei('1'), 0);
    const priceAVAX = toNumber(fromWei(toBN(amountAVAX[2]))).toPrecision(2);
    const priceMIM = toNumber(fromWei(toBN(amountMIM[2]))).toPrecision(2);

    return {
      totalContribution, 
      liquidityDeposited,
      liquidityGaged,
      remainingETRNL,
      priceAVAX,
      priceMIM,
    };
  }

  const stakingStats = async () => {
    let totalUserStake = toBN(await storage.getUint(await treasury.entity(), soliditySha3('stakedBalances', account)));

    const totalStakedBalances = toBN(await storage.getUint(await treasury.entity(), await treasury.totalStakedBalances()));
    const treasuryShare = toNumber(fromWei(totalUserStake.mul(toBN(toWei('1'))).div(totalStakedBalances)));

    const rewardBalance = toBN(await storage.getUint(await treasury.entity(), soliditySha3('reserveBalances', account)));
    const differenceInBalance = (rewardBalance.sub(toBN(await treasury.convertToReserve(totalUserStake.toString())))).toString();
    const totalRewards = toNumber(fromWei(toBN(await treasury.convertToStaked(differenceInBalance)))).toFixed(2);

    totalUserStake = toNumber(fromWei(totalUserStake));

    return {
      totalUserStake, 
      treasuryShare,
      totalRewards
    };
  }

  const stakingEstimates = async (treasuryShare, totalUserStake, stake) => {
    let rewards = 0;
    let share = 0;
    if (toNumber(amount) != 0) {
      if (toNumber(amount) >= totalUserStake && !stake) {
        share = (treasuryShare * 100).toPrecision(2);
      } else {
        let newTotalStakedBalances = toBN(await storage.getUint(await treasury.entity(), await treasury.totalStakedBalances()));
        newTotalStakedBalances = stake ? newTotalStakedBalances.add(toBN(toWei(amount))) : newTotalStakedBalances.sub(toBN(toWei(amount)));
        const amountShare = toBN(toWei(amount)).mul(toBN(toWei('1'))).div(newTotalStakedBalances);
        share = amountShare.sub(amountShare.mul(toBN(toWei(`${treasuryShare * 1000000000000000}`)).muln(1000)).div(toBN(toWei(toWei('1')))));
      }
      if (stake) {
        const treasuryReserves = toBN(await storage.getUint(await treasury.entity(), soliditySha3('reserveBalances', getAddress('treasury'))));
        const treasuryBalance = toBN(await treasury.convertToStaked(treasuryReserves.toString()));
        const psi = toBN(await storage.getUint(await factory.entity(), await factory.psi()));
        const availableETRNL = toBN(treasuryBalance.sub(psi));
        const feeRate = toBN(await storage.getUint(await treasury.entity(), await treasury.feeRate())).add(toBN('5000'));
        rewards = toNumber(fromWei(feeRate.mul(availableETRNL.muln(4)).divn(100000).mul(share).div(toBN(toWei('1')))));
      } else {
        const totalUserReserve = toBN(await storage.getUint(await treasury.entity(), soliditySha3('reserveBalances', account)));
        if (totalUserReserve.gtn(0)) {
          const reserveProportion = toBN(toWei(amount)).mul(totalUserReserve).div(toWei(toBN(totalUserStake)));
          const amountBack = toNumber(fromWei(toBN(await treasury.convertToStaked(reserveProportion.toString()))));
          rewards = amountBack > amount ? amountBack - amount : amount - amountBack;
        }
      }
      if (toNumber(amount) < totalUserStake || stake) {
        share = toNumber(fromWei(share)) * 100 < 1 ? (toNumber(fromWei(share)) * 100).toPrecision(2) : (toNumber(fromWei(share)) * 100).toFixed(2);
      }
      if (totalUserStake > 0 || stake) {
        rewards = rewards < 1 ? rewards.toPrecision(2) : rewards.toFixed(2);
      }
    }

    return { share, rewards };
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
    offeringStats,
    stakingStats,
    stakingEstimates
  };
}

export default useEternalHook;
