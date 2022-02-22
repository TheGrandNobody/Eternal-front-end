import React from "react";
import useAuth from "../../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import Drawer from "./Drawer";
import { getUserData } from "../../services";
import { useRouter } from "next/router";
import useEternalPlatformContractfunction from "../../hooks/useEternalPlatformContractFunctions";
import DropDownComponent from "../DropDown/DropDown";
import { socialDropDownData, infoDropDownData } from "../../constant/data";

function Navbar() {
  const [scroll, setScroll] = React.useState(false);
  const { account, active } = useWeb3React();
  const { login, logout } = useAuth();
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
  React.useEffect(() => {
    if (!active) {
      router.push("/");
    }
  }, [active]);

  React.useEffect(() => {
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

  const checkUserStatusOnConnect = async (account) => {
    const req = await getUserData(account);
    if (req.data.length > 0) {
      router.push("/user-info");
      return;
    }
    router.push("/gage-selection");
  };

  const handleClickOnEarn = (number = 0) => {
    if (!active) {
      login("Injected");
    }
    if (account && active) {
      switch (number) {
        case 1:
          checkUserStatusOnConnect(account);
          break;
        case 2:
          router.push("/stake");
          break;
        case 3:
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
          {/* <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <i className='fas fa-bars'></i>
          </button> */}

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
            {active ? (
              <button className="btn theme-btn top-nav-btn" onClick={logout}>
                {"Connected " +
                  account.slice(0, 5) +
                  "..." +
                  account.slice(account.length - 5, account.length)}
              </button>
            ) : (
              <button
                className="btn theme-btn top-nav-btn"
                onClick={() => login("Injected")}
              >
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
