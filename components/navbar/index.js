import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { getUserData } from '../../services';
import { useRouter } from 'next/router';
import useEternalPlatformContractfunction from '../../hooks/useEternalPlatformContractFunctions';
import DropDownComponent from '../DropDown/DropDown';
import { socialDropDownData, infoDropDownData } from '../../constant/data';

function Navbar() {
  const [scroll, setScroll] = React.useState(false);
  const { account, active } = useWeb3React();
  const { login, logout } = useAuth();
  const router = useRouter();

  const handleActiveNavMenu = () => {
    return router.route === '/user-info' || router.route === '/gage-selection';
  };
  React.useEffect(() => {
    if (!active) {
      router.push('/');
    }
  }, [active]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScroll(!scroll);
      return;
    }
    setScroll(false);
  };

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
      login('Injected');
    }
    if (account && active) {
      checkUserStatusOnConnect(account);
    }
  };

  return (
    <>
      <nav className={`${scroll && 'nav-box-shadow'} navbar navbar-expand-lg px-4 py-4`}>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <i className='fas fa-bars'></i>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <Link href='/'>
              <div className='navbar-brand' style={{ cursor: 'pointer' }}>
                <img src='img/logo.svg' height='15' alt='' loading='lazy' />
              </div>
            </Link>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item mx-4'>
                {active ? (
                  <a className={`nav-link ${handleActiveNavMenu() && 'active border'}`} onClick={handleClickOnEarn}>
                    Earn
                  </a>
                ) : (
                  <a className='nav-link disabled' onClick={handleClickOnEarn}>
                    Earn
                  </a>
                )}
              </li>
              <li className='nav-item mx-4'>
                <a className='nav-link disabled' href='#'>
                  Governance
                </a>
              </li>
              <DropDownComponent name={'Social'} optionsToMap={socialDropDownData} />
              <DropDownComponent name={'Info'} optionsToMap={infoDropDownData} />
            </ul>
            {active ? (
              <button className='btn theme-btn top-nav-btn' onClick={logout}>
                {'Connected ' + account.slice(1, 5) + '...' + account.slice(account.length - 5, account.length)}
              </button>
            ) : (
              <button className='btn theme-btn top-nav-btn' onClick={() => login('Injected')}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
