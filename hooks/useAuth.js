import { WalletConnect } from '@web3-react/walletconnect';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import { chainInfo, connectorsByName } from '../constant/constants';
import useStore from '../store/useStore';
import shallow from 'zustand/shallow';

const handleActive = (active) => {
  if (active[0]) {
    return 'MetaMask';
  } else if (active[1]) {
    return 'WalletConnect';
  } else if (active[2]) {
    return 'WalletLink';
  }
  return false;
};

const handleLogin = async (id, chainId, error, actives) => {
  const active = handleActive(actives);
  if (active) {
    connectorsByName[active][0].deactivate();
  }
  try {
    if (connectorsByName[id][0] instanceof WalletConnect) {
      await connectorsByName[id][0].activate(chainId).catch(() => {
        toast.error('Something went wrong. Try again.', { toastId: 1})
        return Promise.reject()
      });
    } else {
      await connectorsByName[id][0].activate(chainInfo[chainId]).catch(() => {
        toast.error('Something went wrong. Try again.', { toastId: 1})
        return Promise.reject()
      });
    }
    if (error) {
      if (error.constructor.name != 'ChainIdNotAllowedError') {
        toast.error('Login canceled. Try again?', { toastId: 1});
        return Promise.reject();
      }
    }
  }
  catch {
    toast.error('Something went wrong. Try again.', { toastId: 1});
    return Promise.reject(error)
  }
  return Promise.resolve(true);
};

export const chainSupported = async () => {
  const web3 = new Web3(window.ethereum);
  const id = await web3.eth.net.getId();
  return [Object.keys(chainInfo).includes(id.toString()), id];
};

export function useActive() {
  const { useIsActive : useActiveM } = connectorsByName['MetaMask'][1];
  const { useIsActive : useActiveW } = connectorsByName['WalletConnect'][1];
  const { useIsActive: useActiveC } = connectorsByName['WalletLink'][1];
  const activeM = useActiveM();
  const activeW = useActiveW();
  const activeC = useActiveC();
  const active = activeM || activeW || activeC;

  return { activeM, activeW, activeC, active };
}

export function loginEarly() {
  const preference = localStorage.getItem('preference');
  const id = preference ? preference : 'MetaMask';
  const { useError, useChainId } = connectorsByName[id][1];
  const { activeM, activeW, activeC, active } = useActive();
  const error = useError();
  const chain = useChainId();
  const { setConnector, setHook, setCurrent } = useStore(state => ({
    setConnector: state.setConnector,
    setHook: state.setHook,
    setCurrent: state.setCurrent,
    }), shallow);

  useEffect(() => {
    (async () => {
      if (preference) {
        if (!active) {
          const userChain = await chainSupported(); 
          if (userChain[0]) {
            await handleLogin(id, userChain[1], error, [activeM, activeW, activeC]);
          } else {
            if (window.ethereum && window.ethereum.on) {
              toast.error('Invalid chain: switch to Avalanche!')
              await handleLogin(id, 43114, error, active);
            } else {
              toast.error('This app requires a valid wallet. Please install MetaMask or another wallet supported by this website', { toastId: 1 });
            }
          }
        }
      }
    })();
    if (active) {
      const wallet = handleActive([activeM, activeW, activeC]);
      setCurrent(connectorsByName[wallet][0].constructor.name);
      setConnector(connectorsByName[wallet][0]);
      setHook(connectorsByName[wallet][1]);
    } else {
      setCurrent();
    }
  }, [active, chain]);
};

export default function useAuth() {
  const { useError : useErrorM } = connectorsByName['MetaMask'][1];
  const { useError : useErrorW } = connectorsByName['WalletConnect'][1];
  const { useError : useErrorC } = connectorsByName['WalletLink'][1];
  const errorM = useErrorM();
  const errorW = useErrorW();
  const errorC = useErrorC();
  const { activeM, activeW, activeC } = useActive();

  const login = async (id) => {
    if (!localStorage.getItem('preference')) {
      localStorage.setItem('preference', id);
    }
    const userChain = await chainSupported(); 
    if (id == 'MetaMask') {
      return (userChain[0] ? 
        await handleLogin(id, userChain[1], errorM, [activeM, activeW, activeC])
       : 
        await handleLogin(id, 43114, errorM, [activeM, activeW, activeC]));
    } else if (id == 'WalletLink') {
      return (userChain[0] ? 
          await handleLogin(id, userChain[1], errorC, [activeM, activeW, activeC]) 
        : 
          await handleLogin(id, 43114, errorC, [activeM, activeW, activeC]));
    } else {
      return (userChain[0] ? 
          await handleLogin(id, userChain[1], errorW, [activeM, activeW, activeC]) 
        : 
          await handleLogin(id, 43114, errorW, [activeM, activeW, activeC]));
    }
  };

  const logout = (connector) => {
    connector.deactivate();
  }

  return { login, logout };
};
