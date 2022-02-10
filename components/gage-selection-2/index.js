import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import useEternalHook from '../../hooks/useEternalHook';
import Footer from '../Footer/Footer';
import { useWeb3React } from '@web3-react/core';
import { changeApproval } from '../../reducers/main';
import { useDispatch } from 'react-redux';
import { getUserOwnedGages } from '../../services';
import { changeAllowedToChangeGage } from '../../reducers/main';
import { tokenOptionData } from '../../constant/data';
import CreateLiquidGage from '../LiquidGage/LiquidGage';

function index() {
  const {
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
  } = useEternalHook();

  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    (async () => {
      const approved = await handleUserApproval(asset, amount);
      dispatch(changeApproval({ approval: approved}));
    })();
  }, [account]);

  useEffect(() => {
    if (amount && asset && account && gageType) {
      (async () => {
        const req = await getUserOwnedGages(amount, bonusPercentage, riskPercentage, account, gageType, 'pending');
        if (req?.data?.results?.length > 0) {
          dispatch(changeAllowedToChangeGage({ permission: false }));
        } else if (req?.data?.results?.length === 0) {
          dispatch(changeAllowedToChangeGage({ permission: true }));
        }
      })();
    }
  }, [amount, asset, account, gageType]);

  return (
    <>
      <HEAD>
        <title>Liquid Gage | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <div className='container select-bg'>
            <CreateLiquidGage 
            optionsToMap={tokenOptionData} 
            handleClickOnApproveBtn={handleClickOnApproveBtn} 
            handleClickOnConfirmBtn={handleClickOnConfirmBtn}
            handleOnAssetSelect={handleOnAssetSelect}
            handleOnAmountSelect={handleOnAmountSelect}
            handlePercents={handlePercents} />
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;