import { useContract } from './useContract';
import { createGage } from '../services';
import { useRouter } from 'next/router';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { getAddress } from '../helpers/addressHelper';
import useStore from '../store/useStore';
import shallow from "zustand/shallow";

function useFactoryFunction() {
  let { hooks, amount, asset, type, reset } = useStore(state => ({
    hooks: state.hooks,
    amount: state.amount,
    asset: state.asset,
    type: state.type, 
    reset: state.reset
  }), shallow);
  let { useAccount, useProvider } = hooks;
  const account = useAccount();
  const library = useProvider();
  const tempLibrary = new ethers.providers.Web3Provider(new Web3(window.ethereum).currentProvider);
  const factory = useContract('factory', 'factory', library ? library : tempLibrary, account);
  const storage = useContract('storage', 'storage', library ? library : tempLibrary, account);

  const router = useRouter();

  const initiateLiquidGage = async () => {
    let initiateGage;
    try {
      if (asset == 'AVAX') {
        const options = {value: Web3.utils.toWei(`${amount}`, 'ether')};
        initiateGage = await factory.initiateEternalLiquidGage(getAddress(asset), Web3.utils.toWei(`${amount}`, 'ether'), options);
      } else {
        initiateGage = await factory.initiateEternalLiquidGage(getAddress(asset), Web3.utils.toWei(`${amount}`, 'ether'));
      }
    }
    catch (err) {
      if (err.code == 'INSUFFICIENT_FUNDS') {
        toast.error('Insufficient funds.', { toastId: 1});
      }
      return false;
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
                clearInterval(timer);
                new Promise(function (resolve, reject) {
                  resolve(createGage(id, type, account, asset));
                })
                  .then((res2) => {
                    toast.success('Gage joined successfully', { toastId: 1 });
                    reset();
                    router.push('/user-info');
                  })
                  .catch((err) => {
                    toast.error(`Failed to join gage ${err}`, { toastId: 1 });
                    clearInterval(timer);
                    return false;
                  });
              }
            })
            .catch((err) => {
              toast.error(`Error while creating gage ${err}`, { toastId: 1 });
              clearInterval(timer);
              return false;
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
