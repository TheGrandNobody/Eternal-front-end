import { React, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { getUserData } from '../../services';
import DropDownComponent from '../DropDown/DropDown';
import { socialDropDownData, infoDropDownData } from '../../constant/data';
import useStore from "../../store/useStore";
import shallow from 'zustand/shallow';
import { chainSupported } from '../../hooks/useAuth';

export default function TemporaryDrawer() {
  const router = useRouter();
  const { setVisible, hooks, reset, setType } = useStore(state => ({
    setVisible: state.setVisible,
    hooks: state.hooks,
    reset: state.reset,
    setType: state.setType
    }), shallow);
  const { useWeb3React } = hooks;
  const { account, active } = useWeb3React();

  const [state, setState] = useState({
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

  const handleAccount = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push('/user-info');
      return;
    }
    router.push('/gage-selection');
  };

  const handleClickOnEarn = async (number = 0) => {
    if (!active) {
      if (await chainSupported()) {
        setVisible(true);
      }
    }
    if (account && active) {
      reset();
      switch (number) {
      case 0:
        router.push('/');
        break;
      case 1: 
        handleAccount(account);
        break;
      case 2:
        router.push('/stake');
        break;
      case 3:
        setType('Loyalty');
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
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul className='navbar-nav m-automt-5 mb-0'>
          <li className='nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(3) && 'active border'} disabled`} 
              //onClick={() => handleClickOnEarn(3)}
              >
                Coming soon
              </a>
            ) : (
              <a className='nav-link disabled' 
              //onClick={() => handleClickOnEarn(3)}
              >
                Coming soon
              </a>
            )}
            </li>
          <li className='nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(1) && 'active border'}`} 
              onClick={() => handleClickOnEarn(1)}
              >
                Gage
              </a>
            ) : (
              <a className='nav-link disabled' 
              >
                Gage
              </a>
            )}
          </li>
          <li className= 'nav-item mx-4 py-2'>
            {active ? (
              <a className={`nav-link ${handleActiveNavMenu(2) && 'active border'}`} 
              onClick={() => handleClickOnEarn(2)}
              >
                Stake
              </a>
            ) : (
              <a className={`nav-link disabled`} 
              >
                Stake
              </a>
            )}
          </li>
          <li className='nav-item mx-4 py-2'>
            <a className='nav-link' target='_blank' href="https://snapshot.org/#/etrnl.eth">
              Governance
            </a>
          </li>
          <DropDownComponent name={'Social'} optionsToMap={socialDropDownData} />
          <DropDownComponent name={'Info'} optionsToMap={infoDropDownData} />
        </ul>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton sx={{
            transition: 'all 0.4s',
            ':hover': {
              opacity: '0.65'
            }
          }} onClick={toggleDrawer(anchor, true)}><i className='fas fa-bars'></i></IconButton>
          <Drawer
          sx={{".MuiPaper-root":{bgcolor: 'hsl(287, 76%, 13%)'}}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
