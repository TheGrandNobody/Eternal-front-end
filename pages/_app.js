import '../styles/globals.css';
import Web3ReactManager from '../Web3Manager/Web3Manager';
import React from 'react';
import { Toaster, ToastBar } from 'react-hot-toast'

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
      <Web3ReactManager>
        <Component {...pageProps} />
      </Web3ReactManager>
      <Toaster position='bottom-right'/>
    </>
  );
}

export default MyApp;
