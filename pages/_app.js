import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Web3ReactManager from '../Web3Manager/Web3Manager';
import React from 'react';

function MyApp({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <ToastContainer />
      <Web3ReactManager>
        <Component {...pageProps} />
      </Web3ReactManager>
    </>
  );
}

export default MyApp;
