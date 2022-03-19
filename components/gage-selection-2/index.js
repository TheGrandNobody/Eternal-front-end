import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import useEternalHook from '../../hooks/useEternalHook';
import Footer from '../Footer/Footer';
import { tokenOptionData } from '../../constant/data';
import CreateLiquidGage from '../LiquidGage/LiquidGage';
import useStore from '../../store/useStore';

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
    handleUserApproval,
    account,
    goodLibrary
  } = useEternalHook();

  const setApproval = useStore(state => state.setApproval);

  useEffect(() => {
    (async () => {
      if (account) {
        const approved = await handleUserApproval('factory');
        setApproval(approved);
      }
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
            handlePercents={handlePercents} 
            library={goodLibrary}
            />
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;