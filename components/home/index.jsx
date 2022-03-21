import HEAD from "next/head";
import Navbar from "../navbar";
import { chainSupported } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { getUserData } from "../../services";
import Footer from "../Footer/Footer";
import useStore from "../../store/useStore";
import shallow from "zustand/shallow";
import NoobToast from '../Toasts/NoobToast';
import HomeButton from "../Buttons/HomeButton";
import WalletToast from "../Toasts/WalletToast";
import { useEffect, useState } from "react";

function IndexPage() {
  const [connect, setConnect] = useState(true);
  const router = useRouter();
  const { setVisible, hooks, force } = useStore(state => ({
    setVisible: state.setVisible,
    hooks: state.hooks,
    force: state.force
    }), shallow);
  const { useWeb3React } = hooks;
  const { account, active, chainId } = useWeb3React();

  useEffect(() => {
    (async () => {
      const userChain = await chainSupported();
      setConnect(userChain && userChain[0]);
    })();
  }, [chainId]);

  const handleAccount = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push("/user-info");
      return;
    }
    router.push("/gage-selection");
  };

  const handleClickOnEarn = async () => {
    if (!active) {
      if (connect) {
        setVisible(true);
      }
      return true;
    } else {
      if (account) {
        handleAccount(account);
      }
    }
  };
  return (
    <>
      <HEAD>
        <title>Eternal</title>
      </HEAD>

      <body className="main">
        <div className="header d-flex align-items-center">
          <Navbar />
          <div className="container banner-content text-center">
            <h1 className="color-white bold mb-5">Less Risk, More Reward.</h1>
            <HomeButton text={'Go to platform'} handleClick={handleClickOnEarn} force={force}></HomeButton>
          </div>
          <WalletToast init={!connect}></WalletToast>
          <NoobToast duration={localStorage.getItem('preference') ? 1500 : null}></NoobToast>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default IndexPage;
