import { useEternalPlatformContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { createGage } from '../services';
import { useRouter } from 'next/router';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { changeGageAddress, reset } from '../reducers/main';
import { useGageSolContract } from './useContract';
import { addUserAddressToGage } from '../services';
import { functions, reject } from 'lodash';

function useEternalPlatformContractfunction() {
  const { library, account } = useWeb3React();
  const { gageDepositAmount, gageType, gageRiskType, gageRiskPercentage } = useSelector((state) => state.eternal);
  const eternalContract = useEternalPlatformContract(library, account);

  const router = useRouter();
  const dispatch = useDispatch();

  const initiateStanderedGage = async (users) => {
    const initiateGage = await eternalContract.initiateStandardGage(users);
    const interval = setInterval(async () => {
      let recieptC = await getWeb3NoAccount().eth.getTransactionReceipt(initiateGage.hash);
      if (recieptC) {
        clearInterval(interval);
        let id = Web3.utils.toDecimal(recieptC.logs[0].data);
        const timer = setInterval(() => {
          new Promise(function (resolve, reject) {
            resolve(eternalContract.viewGageAddress(id));
          })
            .then((res1) => {
              if (res1 !== '0x0000000000000000000000000000000000000000') {
                clearTimeout(timer);
                new Promise(function (resolve, reject) {
                  resolve(createGage(gageType, res1, gageDepositAmount, gageRiskType, gageRiskPercentage, id, account));
                })
                  .then((res2) => {
                    dispatch(changeGageAddress({ gageAddress: res1 }));
                    toast.success('Gage Created Successfully', { toastId: 1 });
                    const gageContract = useGageSolContract(library, account, res1);
                    new Promise(function (resolve, reject) {
                      resolve(
                        gageContract.join('0xb4351FF4feCc544dC5416c1Cf99bbEA19E924cFb', gageDepositAmount * 1000000000, gageRiskPercentage, false)
                      );
                    })
                      .then((res3) => {
                        const timer1 = setInterval(() => {
                          new Promise(function (resolve, reject) {
                            resolve(getWeb3NoAccount().eth.getTransactionReceipt(res3.hash));
                          })
                            .then((res4) => {
                              if (res4) {
                                clearInterval(timer1);
                                new Promise(function (resolve, reject) {
                                  resolve(addUserAddressToGage(id, account));
                                })
                                  .then(() => {
                                    toast.success('Gage Joined Successfully', { toastId: 2 });
                                    dispatch(reset());
                                    router.push('/user-info');
                                  })
                                  .catch((err) => {
                                    toast.error(`Error while joining gage in backend! ${err}`, { toastId: 2 });
                                    return;
                                  });
                              }
                            })
                            .catch((err) => {
                              toast.error(`Error while fetching joining gage reciept! ${err}`, { toastId: 2 });
                              return;
                            });
                        }, 1000);
                      })
                      .catch((err) => {
                        toast.error(`Error while joining gage! ${err}`, { toastId: 2 });
                        return;
                      });
                  })
                  .catch((err) => {
                    toast.error('Gage not registered in backend!', { toastId: 1 });
                    clearTimeout(timer);
                    return;
                  });
              }
            })
            .catch((err) => {
              toast.error(`Error while initiate Gage ${err}`, { toastId: 1 });
              clearTimeout(timer);
              return;
            });
        }, 1000);
      }
    }, 5000);
  };

  return {
    initiateStanderedGage,
    eternalContract,
  };
}

export default useEternalPlatformContractfunction;
