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

function IndexPage() {
  const router = useRouter();
  const { setVisible, hooks } = useStore(state => ({
    setVisible: state.setVisible,
    hooks: state.hooks,
    }), shallow);
  const { useAccount, useIsActive } = hooks;
  const account = useAccount();
  const active = useIsActive();

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
      if (await chainSupported()) {
        setVisible(true);
      }
    }
    if (account && active) {
      handleAccount(account);
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
            <HomeButton text={'Go to platform'} handleClick={() => handleClickOnEarn()}></HomeButton>
          </div>
          <NoobToast duration={localStorage.getItem('preference') ? 5000 : null}></NoobToast>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default IndexPage;
