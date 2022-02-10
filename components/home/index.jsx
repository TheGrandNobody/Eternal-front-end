import React, { useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { getUserData } from '../../services';
import Footer from '../Footer/Footer';

function IndexPage() {
  const router = useRouter();

  const { account, active } = useWeb3React();
  const { login, logout } = useAuth();

  const checkUserStatusOnConnect = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push('/user-info');
      return;
    }
    router.push('/gage-selection');
  };

  const handleClickOnEarn = () => {
    if (!active) {
      login("Injected");
    }
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
            <button className='btn theme-btn' onClick={() => handleClickOnEarn()}>
              Go to platform
            </button>
          </div>
        </div>

        <Footer />
      </body>
    </>
  );
}

export default IndexPage;
