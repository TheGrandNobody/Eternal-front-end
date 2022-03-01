import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import StakeUI from '../../components/StakeUI/Stake';
import useEternalHook from '../../hooks/useEternalHook';
import { useDispatch } from 'react-redux';

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
    handleUserApproval
  } = useEternalHook();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const approved = await handleUserApproval('treasury');
      dispatch(changeApproval({ approval: approved }));
    })();
  }, [account, asset, amount]);

  return (
    <>
      <HEAD>
        <title>Stake | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <StakeUI handleClickOnApproveBtn={handleClickOnApproveBtn} />
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;