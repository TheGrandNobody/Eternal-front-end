import React, { useState, useEffect } from 'react';
import HEAD from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import Table from '../../components/table/table';
import ExitGage from '../../components/ExitGage/ExitGage'
import CustomSelectDropdown from '../../components/CustomSelectDropdown';
import { tableTabs } from '../../constant/constants';
import { getGagesAccordingToStatus, findAndUpdateGageStatus} from '../../services/index';
import { useWeb3React } from '@web3-react/core';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoadedContracts, changeSelectedGage, reset } from '../../reducers/main';
import { getAllGages } from '../../hooks/useContract';
import { getWeb3NoAccount } from '../../utils/web3';
import { toast } from 'react-toastify';
import { getContract, getContractFast } from '../../helpers/ContractHelper';
import { toBN } from 'web3-utils';


function index() {
  const { account, library } = useWeb3React();
  const [currentTab, setCurrentTab] = useState(tableTabs[0]);
  const [data, setData] = useState();
  const [gageCount, setGageCount] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const [exitable, setExitable] = useState(false);
  const dispatch = useDispatch();
  const { selectedGage, loadedContracts, gageType } = useSelector((state) => state.eternal);

  useEffect(() => {
    fetchDataForTable(currentTab);
  }, [currentTab, account, gageCount, currentPage]);

  useEffect(() => {
    if (selectedGage) {
      (async () => {
        const status = await checkForLoss();
        if (!status) {
          setExitable(true);
        } else {
          setExitable(false)
        }
      })();
    }
  }, [selectedGage]);

  const fetchDataForTable = async (currentStatusTab) => {
    const req = await getGagesAccordingToStatus(account, currentStatusTab, gageCount, currentPage);
    setData(req.data);
    let contracts = await getAllGages(library, account, req?.data?.results || []);
    dispatch(changeLoadedContracts({ loadedContracts: contracts }));

    return req.data?.results.length;
  };

  const handleChangeOnTab = (currentTab) => {
    dispatch(changeSelectedGage({ selectedGage: null }));
    setCurrentTab(currentTab);
    setCurrentPage(1);
  };

  const handleOnChangeGageCount = (Event) => {
    setGageCount(Event.target.value);
  };

  const handleChangeOnNextPage = () => {
    setCurrentPage((prev) => {
      return data?.next && data?.next?.page > currentPage && prev + 1;
    });
  };

  const handleChangeOnPrevPage = () => {
    setCurrentPage(data?.previous && data?.previous?.page);
  };
  
  const checkForLoss = async () => {
    const token = getContract('ETRNL', 'ERC20', library, account);
    const gage = (gageType == 'Liquid' || gageType == 'Loyalty') ? getContractFast(loadedContracts[selectedGage].address, 'loyalty', library, account) : loadedContracts[selectedGage];
    const condition = toBN(await gage.viewTarget());
    const supply = toBN(await token.totalSupply());

    return condition.lt(supply);
  }

  const handleExitGage = async () => {
    let contract = loadedContracts[selectedGage];
    const exit = await contract.exit();
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(exit.hash);
      if (receipt) {
        clearInterval(interval);
        toast.success('Gage Exited Successfully', { toastId: 3 });
        let length = data?.results.length;
        let winnerData= receipt.logs[0].data.slice(66);
        const winner = getWeb3NoAccount().eth.abi.decodeParameter('bool', winnerData);
        new Promise(function (resolve, reject) {
          resolve(findAndUpdateGageStatus(selectedGage, 'closed', winner));
        }).then((() => {let endLoop = setInterval(async () => {
          let newLength = await fetchDataForTable(currentTab);
          if (length > newLength) {
            clearInterval(endLoop);
          }
        }, 200)})())
          .catch((err) => {
            toast.error('Error while fetching data !', { toastId: 3 });
          });
      }
    }, 1000);
  };

  return (
    <>
      <HEAD>
        <title>User Info | Eternal</title>
      </HEAD>

      <body className='secondary user-info-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />
          <div className='container user-info-container'>
            <div className='row m-0 position-relative '>
              <h1 className='color-white bold mb-5'>Your Gages</h1>
            </div>

            <div className='row m-0 position-relative gage-tabs'>
              <div style={{justifyContent: 'space-between', alignItems: 'center' }}>
                <ul className='nav nav-tabs mb-3' id='ex1' role='tablist'>
                  {tableTabs.map((item, index) => (
                    <li className={`nav-item ${item === currentTab && 'active'}`} role='presentation' key={index}>
                      <a className={`nav-link ${item === currentTab && 'active'}`} onClick={() => handleChangeOnTab(item)}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <CustomSelectDropdown handleOnChange={(event) => handleOnChangeGageCount(event)} />
              <div className='tab-content mb-5' id='ex1-content'>
                <div className='tab-pane fade show active' id='ex1-tabs-1' role='tabpanel' aria-labelledby='ex1-tab-1'>
                  <Table data={data?.results || []} 
                  clickableRow={currentTab !== 'Closed'} 
                  account={account} 
                  library={library}
                  />
                  <div className='container text-center my-5 px-0'>
                    {data?.previous && data?.results?.length > 0 && (
                      <button onClick={() => handleChangeOnPrevPage()} style={{ transform: 'rotate(180deg)' }} className='btn next-btn mx-sm-2 mx-1'>
                        <svg width='32' height='17' viewBox='0 0 32 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M22.8668 0L21.5117 1.38056L27.5417 7.52382H0.789062V9.47625H27.5417L21.5117 15.6194L22.8668 17L31.2101 8.49997L22.8668 0Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                    )}
                    <Link href='/gage-selection'>
                      <button onClick={() => dispatch(reset())} className='btn grid-btn mx-sm-2 mx-1'>New Gage</button>
                    </Link>
                    {selectedGage && (
                      <ExitGage 
                        handleExitGage={handleExitGage}
                        exitable={exitable}
                      />
                    )}
                    {data?.next && data?.results?.length > 0 && (
                      <button onClick={() => handleChangeOnNextPage()} className='btn next-btn mx-sm-2 mx-1'>
                        <svg width='32' height='17' viewBox='0 0 32 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M22.8668 0L21.5117 1.38056L27.5417 7.52382H0.789062V9.47625H27.5417L21.5117 15.6194L22.8668 17L31.2101 8.49997L22.8668 0Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </body>
    </>
  );
}

export default index;
