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

function useFactoryFunction() {
  const { library, account } = useWeb3React();
  const { gageDepositAmount, gageAsset, gageType} = useSelector((state) => state.eternal);
  const factory = useContract('factory', 'factory', library, account);
  const storage = useContract('storage', 'storage', library, account);

  const router = useRouter();
  const dispatch = useDispatch();

  const initiateLiquidGage = async () => {
    let initiateGage;
    try {
      if (gageAsset == 'AVAX') {
        const options = {value: Web3.utils.toWei(`${gageDepositAmount}`, 'ether')};
        initiateGage = await factory.initiateEternalLiquidGage(getAddress(gageAsset), Web3.utils.toWei(`${gageDepositAmount}`, 'ether'), options);
      } else {
        initiateGage = await factory.initiateEternalLiquidGage(getAddress(gageAsset), Web3.utils.toWei(`${gageDepositAmount}`, 'ether'));
      }
    }
    catch (err) {
      if (err.code == 'INSUFFICIENT_FUNDS') {
        toast.error('Insufficient funds.', { toastId: 1});
      }
      return;
    }
    const interval = setInterval(async () => {
      let receiptC = await getWeb3NoAccount().eth.getTransactionReceipt(initiateGage.hash);
      if (receiptC) {
        clearInterval(interval);
        let id = Web3.utils.toDecimal(receiptC.logs[0].data);
        const timer = setInterval(() => {
          new Promise(function (resolve, reject) {
            resolve(storage.getAddress(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('gages', id)));
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
                    return;
                  });
              }
            })
            .catch((err) => {
              toast.error(`Error while creating gage ${err}`, { toastId: 1 });
              clearTimeout(timer);
              return;
            });
        }, 1000);
      }
    }, 5000);
  };

  return {
    initiateLiquidGage
  };
}

export default useFactoryFunction;
