import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { chainSupported } from "../../hooks/useAuth";
import Drawer from "./Drawer";
import { getUserData } from "../../services";
import { useRouter } from "next/router";
import DropDownComponent from "../DropDown/DropDown";
import { socialDropDownData, infoDropDownData } from "../../constant/data";
import ConnectButton from "../Buttons/ConnectButton";
import useStore from "../../store/useStore";
import shallow from 'zustand/shallow'
import { Link } from "@mui/material";

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [connect, setConnect] = useState(false);
  const { setVisible, hooks, reset, setType, setForce } = useStore(state => ({
    setVisible: state.setVisible,
    hooks: state.hooks,
    reset: state.reset,
    setType: state.setType,
    setForce: state.setForce
    }), shallow);
  const { useWeb3React } = hooks;
  const { account, active, connector, chainId } = useWeb3React();
  const { login  } = useAuth();
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
      const userChain = await chainSupported();
      if (userChain && userChain[0]) {
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
    setForce(true);
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push("/user-info");
      setForce(false);
      return;
    }
    setForce(false);
    router.push("/gage-selection");
  };

  const handleClickOnEarn = (number = 0) => {
    if (!active) {
      if (connect) {
        setVisible(true);
      }
    }
    if (account && active) {
      reset();
      switch (number) {
        case 1:
          handleAccount(account);
          break;
        case 2:
          router.push("/stake");
          break;
        case 3:
          /**
          setType('Loyalty');
          router.push("/igo");
          */
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
            <Link
              className="navbar-brand"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
              sx={{
                transition: 'all 0.4s',
                ':hover': {
                  opacity: '0.65'
                }
              }}
            >
              <img src="img/logo.svg" height="15" alt="" loading="lazy" />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-4">
                {active ? (
                  <a
                    className={`nav-link ${
                      handleActiveNavMenu(3) && "active border"
                    } disabled`}
                    //onClick={() => handleClickOnEarn(3)}
                  >
                    IGO
                  </a>
                ) : (
                  <a
                    className="nav-link disabled"
                    //onClick={() => handleClickOnEarn(3)}
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
                  >
                    Stake
                  </a>
                )}
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link" target='_blank' href="https://snapshot.org/#/etrnl.eth">
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
