import { useContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { createGage } from '../services';
import { useRouter } from 'next/router';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { reset } from '../reducers/main';
import { getAddress } from '../helpers/addressHelper';

function useOfferingFunction() {
  const { library, account } = useWeb3React();
  const { gageDepositAmount, gageAsset, gageType} = useSelector((state) => state.eternal);
  const offering = useContract('offering', 'offering', library, account);

  const router = useRouter();
  const dispatch = useDispatch();

  const initiateLoyaltyGage = async () => {
    let initiateGage;
    try {
      if (gageAsset == 'AVAX') {
        const options = {value: Web3.utils.toWei(`${gageDepositAmount}`, 'ether')};
        console.log(options);
        initiateGage = await offering.initiateEternalLoyaltyGage(Web3.utils.toWei(`${gageDepositAmount}`, 'ether'), getAddress(gageAsset), options);
      } else {
        initiateGage = await offering.initiateEternalLoyaltyGage(Web3.utils.toWei(`${gageDepositAmount}`, 'ether'), getAddress(gageAsset));
      }
    }
    catch {
      toast.error('Insufficient funds.', { toastId: 1});
      return false;
    }
    const interval = setInterval(async () => {
      let receiptC = await getWeb3NoAccount().eth.getTransactionReceipt(initiateGage.hash);
      if (receiptC) {
        clearInterval(interval);
        let id = Web3.utils.toDecimal(receiptC.logs[0].data);
        const timer = setInterval(() => {
          new Promise(function (resolve, reject) {
            resolve(offering.viewGage(id));
          })
            .then((res1) => {
              if (res1 !== '0x0000000000000000000000000000000000000000') {
                clearTimeout(timer);
                new Promise(function (resolve, reject) {
                  resolve(createGage(id, gageType, account, gageAsset));
                })
                  .then((res2) => {
                    toast.success('Gage joined successfully', { toastId: 1 });
                    dispatch(reset());
                    router.push('/user-info');
                  })
                  .catch((err) => {
                    toast.error(`Failed to join gage ${err}`, { toastId: 1 });
                    clearTimeout(timer);
                    return false;
                  });
              }
            })
            .catch((err) => {
              toast.error(`Error while creating gage ${err}`, { toastId: 1 });
              clearTimeout(timer);
              return false;
            });
        }, 1000);
      }
    }, 5000);
    return initiateGage;
  };

  const initiateDeposit = async () => {
    let initiateDeposit;
    try {
      if (gageAsset == 'AVAX') {
        const options = {value: Web3.utils.toWei(`${gageDepositAmount}`, 'ether')};
        console.log(options);
        initiateDeposit = await offering.provideLiquidity(Web3.utils.toWei(`${gageDepositAmount}`, 'ether'), getAddress(gageAsset), options);
      } else {
        initiateDeposit = await offering.provideLiquidity(Web3.utils.toWei(`${gageDepositAmount}`, 'ether'), getAddress(gageAsset));
      }
    }
    catch {
      toast.error('Insufficient funds.', { toastId: 1});
      return false;
    }
    return initiateDeposit;
  };

  return {
    initiateLoyaltyGage,
    initiateDeposit
  };
}

export default useOfferingFunction;
