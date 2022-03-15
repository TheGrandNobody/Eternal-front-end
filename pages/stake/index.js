import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import StakeUI from '../../components/StakeUI/Stake';
import useEternalHook from '../../hooks/useEternalHook';
import { useDispatch } from 'react-redux';
import { changeApproval, changeGageAsset } from '../../reducers/main';

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
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (account) {
        const approved = await handleUserApproval('treasury');
        dispatch(changeApproval({ approval: approved }));
      }
    })();
  }, [account, amount]);

  useEffect(() => {
    dispatch(changeGageAsset({ asset: 'ETRNL' }));
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