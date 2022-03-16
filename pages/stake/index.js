import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import StakeUI from '../../components/StakeUI/Stake';
import useEternalHook from '../../hooks/useEternalHook';
import useStore from '../../store/useStore';
import shallow from 'zustand/shallow';

function index() {

  const {
    amount,
    handleOnAmountSelect,
    handleClickOnConfirmBtn,
    handleClickOnApproveBtn,
    handleUserApproval,
    stakingStats,
    stakingEstimates,
    account
  } = useEternalHook();

  const { setApproval, setAsset } = useStore(state => ({
    setApproval: state.setApproval,
    setAsset: state.setAsset
  }), shallow)

  useEffect(() => {
    (async () => {
      if (account) {
        const approved = await handleUserApproval('treasury');
        setApproval(approved);
      }
    })();
  }, [account, amount]);

  useEffect(() => {
    setAsset('ETRNL');
  }, []);

  return (
    <>
      <HEAD>
        <title>Stake | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <StakeUI handleClickOnApproveBtn={handleClickOnApproveBtn}
            handleClickOnConfirmBtn={handleClickOnConfirmBtn}
            handleOnAmountSelect={handleOnAmountSelect}
            stakingStats={stakingStats}
            stakingEstimates={stakingEstimates}
            account={account} />
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;