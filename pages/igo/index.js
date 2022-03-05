import { React, useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import InitialGageOffering from '../../components/IGO/InitialGageOffering';
import { tokenOptionData } from '../../constant/data';
import useEternalHook from '../../hooks/useEternalHook';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { changeApproval } from '../../reducers/main';

function index() {

  const { account } = useWeb3React();
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
    offeringStats
  } = useEternalHook();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const approved = await handleUserApproval('offering');
      dispatch(changeApproval({ approval: approved }));
    })();
  }, [account, asset, amount]);

  return (
    <>
      <HEAD>
        <title>Initial Gage Offering | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <InitialGageOffering
            optionsToMap={tokenOptionData}
            handleClickOnApproveBtn={handleClickOnApproveBtn}
            handleClickOnConfirmBtn={handleClickOnConfirmBtn}
            handleOnAssetSelect={handleOnAssetSelect}
            handleOnAmountSelect={handleOnAmountSelect}
            handleConversionToETRNL={handleConversionToETRNL}
            handlePercents={handlePercents}
            offeringStats={offeringStats}
            account={account}
          />
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;