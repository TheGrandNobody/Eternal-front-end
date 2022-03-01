import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import useEternalHook from '../../hooks/useEternalHook';
import Footer from '../Footer/Footer';
import { useWeb3React } from '@web3-react/core';
import { changeApproval } from '../../reducers/main';
import { useDispatch } from 'react-redux';
import { tokenOptionData } from '../../constant/data';
import CreateLiquidGage from '../LiquidGage/LiquidGage';

function index() {
  const {
    amount,
    asset,
    handleOnAmountSelect,
    handleOnAssetSelect,
    handleConversionToETRNL,
    handlePercents,
    handleClickOnConfirmBtn,
    handleClickOnApproveBtn,
    handleUserApproval
  } = useEternalHook();

  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    (async () => {
      const approved = await handleUserApproval('treasury');
      dispatch(changeApproval({ approval: approved}));
    })();
  }, [account, asset, amount]);

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
            handleConversionToETRNL={handleConversionToETRNL}
            handlePercents={handlePercents} />
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;