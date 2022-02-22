import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { getUserData } from '../../services';
import DropDownComponent from '../DropDown/DropDown';
import { socialDropDownData, infoDropDownData } from '../../constant/data';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const router = useRouter();

  const { account, active } = useWeb3React();
  const { login, logout } = useAuth();

  const handleActiveNavMenu = (number = 0) => {
    switch (number) {
      case 1: 
        return router.route === '/user-info' || router.route === '/gage-selection';
      case 2:
        return router.route === '/stake';
      case 3:
        return router.route === '/igo';
      default:
        return;
    }
  };

  const checkUserStatusOnConnect = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push('/user-info');
      return;
    }
    router.push('/gage-selection');
  };

  const handleClickOnEarn = (number = 0) => {
    if (!active) {
      login('Injected');
    }
    if (account && active) {
      switch (number) {
      case 0:
        router.push('/');
        break;
      case 1: 
        checkUserStatusOnConnect(account);
        break;
      case 2:
        router.push('/stake');
        break;
      case 3:
        router.push('/igo');
        break;
      default:
        return;
    }
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul className='navbar-nav m-automt-5 mb-0'>
          <li className='nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(3) && 'active border'}`} onClick={() => handleClickOnEarn(3)}>
                IGO
              </a>
            ) : (
              <a className='nav-link disabled' onClick={() => handleClickOnEarn(3)}>
                IGO
              </a>
            )}
            </li>
          <li className='nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(1) && 'active border'}`} onClick={() => handleClickOnEarn(1)}>
                Gage
              </a>
            ) : (
              <a className='nav-link disabled' onClick={() => handleClickOnEarn(1)}>
                Gage
              </a>
            )}
          </li>
          <li className='nav-item mx-4 py-2'>
            <a className='nav-link disabled' href='#'>
              Governance
            </a>
          </li>
          <li className= 'nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(2) && 'active border'}`} onClick={() => handleClickOnEarn(2)}>
                Stake
              </a>
            ) : (
              <a className={`nav-link disabled`} onClick={() => handleClickOnEarn(2)}>
                Stake
              </a>
            )}
          </li>
          <DropDownComponent name={'Social'} optionsToMap={socialDropDownData} />
          <DropDownComponent name={'Info'} optionsToMap={infoDropDownData} />
        </ul>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}><i className='fas fa-bars'></i></IconButton>
          <Drawer
          sx={{".MuiPaper-root":{bgcolor: 'hsl(287, 76%, 13%)'}}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
