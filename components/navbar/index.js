import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { chainSupported } from "../../hooks/useAuth";
import Drawer from "./Drawer";
import { getUserData } from "../../services";
import { useRouter } from "next/router";
import DropDownComponent from "../DropDown/DropDown";
import { socialDropDownData, infoDropDownData } from "../../constant/data";
import { useDispatch } from "react-redux";
import { reset, changeGageType } from "../../reducers/main";
import ConnectButton from "../Buttons/ConnectButton";
import useStore from "../../store/useStore";
import shallow from 'zustand/shallow'

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [connect, setConnect] = useState(false);
  const { setVisible, hooks } = useStore(state => ({
    setVisible: state.setVisible,
    hooks: state.hooks,
    }), shallow);
  const { useWeb3React } = hooks;
  const { account, active, connector, chainId } = useWeb3React();
  const { login  } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleActiveNavMenu = (number = 0) => {
    switch (number) {
      case 1:
        return (
          router.route === "/user-info" || router.route === "/gage-selection"
        );
      case 2:
        return router.route === "/stake";
      case 3:
        return router.route === "/igo";
      default:
        return;
    }
  };

  useEffect(() => {
    (async () => {
      if (await chainSupported()) {
        setConnect(true);
      } else {
        setConnect(false);
      }
    })();
  }, [chainId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  const handleAccount = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push("/user-info");
      return;
    }
    router.push("/gage-selection");
  };

  const handleClickOnEarn = (number = 0) => {
    if (!active) {
      if (connect) {
        setVisible(true);
      }
    }
    if (account && active) {
      dispatch(reset());
      switch (number) {
        case 1:
          handleAccount(account);
          break;
        case 2:
          router.push("/stake");
          break;
        case 3:
          dispatch(changeGageType({ gageType: 'Loyalty' }));
          router.push("/igo");
          break;
        default:
          return;
      }
    }
  };

  return (
    <>
      <nav
        className={`${
          scroll && "nav-box-shadow"
        } navbar navbar-expand-lg px-4 py-4`}
      >
        <div className="container-fluid">
          <div className="navbar-drawer">
            <Drawer />
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              className="navbar-brand"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              <img src="img/logo.svg" height="15" alt="" loading="lazy" />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-4">
                {active ? (
                  <a
                    className={`nav-link ${
                      handleActiveNavMenu(3) && "active border"
                    }`}
                    onClick={() => handleClickOnEarn(3)}
                  >
                    IGO
                  </a>
                ) : (
                  <a
                    className="nav-link disabled"
                    onClick={() => handleClickOnEarn(3)}
                  >
                    IGO
                  </a>
                )}
              </li>
              <li className="nav-item mx-4">
                {active ? (
                  <a
                    className={`nav-link ${
                      handleActiveNavMenu(1) && "active border"
                    }`}
                    onClick={() => handleClickOnEarn(1)}
                  >
                    Gage
                  </a>
                ) : (
                  <a
                    className="nav-link disabled"
                    onClick={() => handleClickOnEarn(1)}
                  >
                    Gage
                  </a>
                )}
              </li>
              <li className="nav-item mx-4">
                {active ? (
                  <a
                    className={`nav-link ${
                      handleActiveNavMenu(2) && "active border"
                    }`}
                    onClick={() => handleClickOnEarn(2)}
                  >
                    Stake
                  </a>
                ) : (
                  <a
                    className={`nav-link disabled`}
                    onClick={() => handleClickOnEarn(2)}
                  >
                    Stake
                  </a>
                )}
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link disabled" href="#">
                  Governance
                </a>
              </li>
              <DropDownComponent
                name={"Social"}
                optionsToMap={socialDropDownData}
              />
              <DropDownComponent
                name={"Info"}
                optionsToMap={infoDropDownData}
              />
            </ul>
            <ConnectButton disabled={!(window.ethereum && window.ethereum.on && connect)} 
            active={active} 
            account={account} 
            connector={connector} 
            chainId={chainId} 
            login={login}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
