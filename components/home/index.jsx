import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import { handleClickOnConfirmBtn } from '../../hooks/useEternalHook';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { getUserData } from '../../services';
import { Injected } from '../../constant/constants';
import Footer from '../Footer/Footer';

function IndexPage() {
  const [clicked, setClicked] = React.useState(false);
  const router = useRouter();

  const { account, active } = useWeb3React();
  const { login, logout } = useAuth();

  const checkUserStatusOnConnect = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push('/user-info');
      return;
    }
    router.push('/gage-selection-1');
  };

  const handleClickOnEarn = () => {
    if (!active) {
      login(Injected);
    }
    setClicked(true);
    if (account && active) {
      checkUserStatusOnConnect(account);
    }
  };
  return (
    <>
      <HEAD>
        <title>Eternal</title>
      </HEAD>

      <body className='main'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <div className='container banner-content text-center'>
            <h1 className='color-white bold mb-5'>Less Risk, More Reward.</h1>
            <button className='btn theme-btn' onClick={handleClickOnEarn}>
              Go to platform
            </button>
          </div>
        </div>

        <Footer />

        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script type='text/javascript' src='/js/mdb.min.js'></script>
        <script src='/js/autodrop.js'></script>
      </body>
    </>
  );
}

export default IndexPage;
