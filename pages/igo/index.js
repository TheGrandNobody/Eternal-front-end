import { React, useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import InitialGageOffering from '../../components/IGO/InitialGageOffering';
import { tokenOptionData } from '../../constant/data';
import useEternalHook from '../../hooks/useEternalHook';
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
    offeringStats, 
    account, 
    goodLibrary
  } = useEternalHook();

  const setApproval = useStore(state => state.setApproval);

  useEffect(() => {
    (async () => {
      if (account) {
        const approved = await handleUserApproval('offering');
        setApproval(approved);
      }
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
            library={goodLibrary}
          />
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;