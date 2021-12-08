import React, { useState, useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import Table from '../../components/table/table';
import { tableTabs } from '../../constant/constants';
import { getGagesAccordingToStatus, findAndUpdateGageStatus, removeUserAddressToGage } from '../../services/index';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import CustomSelectDropdown from '../../components/CustomSelectDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoadedContracts, changeSelectedGage } from '../../reducers/main';
import { useAllGagesSolContract } from '../../hooks/useContract';
import { getWeb3NoAccount } from '../../utils/web3';
import { toast } from 'react-toastify';
import Web3 from 'web3';


function index() {
  const { account, library } = useWeb3React();
  const [currentTab, setCurrentTab] = useState(tableTabs[0]);
  const [data, setData] = useState();
  const [gageCount, setGageCount] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { selectedGage, loadedContracts } = useSelector((state) => state.eternal);

  useEffect(() => {
    fetchDataForTable(currentTab);
  }, [currentTab, account, gageCount, currentPage]);

  const fetchDataForTable = async (currentStatusTab) => {
    const req = await getGagesAccordingToStatus(account, currentStatusTab, gageCount, currentPage);
    setData(req.data);
    let contracts = useAllGagesSolContract(library, account, req?.data?.results || []);
    console.log(contracts);
    dispatch(changeLoadedContracts({ loadedContracts: contracts }));
  };

  const handleChangeOnTab = (currentTab) => {
    if (currentTab === 'Closed') {
      dispatch(changeSelectedGage({ selectedGage: null }));
    }
    setCurrentTab(currentTab);
    fetchDataForTable(currentTab);
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

  const handleClickOnForfietButton = async () => {
    let contract = loadedContracts[selectedGage];
    const exit = await contract.exit();
    let interval = setInterval(async () => {
      let reciept = await getWeb3NoAccount().eth.getTransactionReceipt(exit.hash);
      if (reciept) {
        clearInterval(interval);
        toast.success('Gage Exited Successfully', { toastId: 3 });
        let id = Web3.utils.toDecimal(reciept.logs[0].data);
        new Promise(function (resolve, reject) {
          resolve(removeUserAddressToGage(id, account));
        })
          .then(() => {
            fetchDataForTable(currentTab);
          })
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
                      <a className={`nav-link bold ${item === currentTab && 'active'}`} onClick={() => handleChangeOnTab(item)}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>

                <CustomSelectDropdown handleOnChange={handleOnChangeGageCount} />
              </div>

              <div className='tab-content mb-5' id='ex1-content'>
                <div className='tab-pane fade show active' id='ex1-tabs-1' role='tabpanel' aria-labelledby='ex1-tab-1'>
                  <Table data={data?.results || []} clickableRow={currentTab !== 'Closed'} />
                  <div className='container text-center my-5 px-0'>
                    {data?.previous && data?.results?.length > 0 && (
                      <button onClick={handleChangeOnPrevPage} style={{ transform: 'rotate(180deg)' }} className='btn next-btn mx-sm-2 mx-1'>
                        <svg width='32' height='17' viewBox='0 0 32 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M22.8668 0L21.5117 1.38056L27.5417 7.52382H0.789062V9.47625H27.5417L21.5117 15.6194L22.8668 17L31.2101 8.49997L22.8668 0Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                    )}
                    <Link href='/gage-selection'>
                      <button className='btn grid-btn mx-sm-2 mx-1'>New Gage</button>
                    </Link>
                    {selectedGage && (
                      <button onClick={handleClickOnForfietButton} className='btn grid-btn mx-sm-2 mx-1'>
                        Forfeit
                      </button>
                    )}
                    {data?.next && data?.results?.length > 0 && (
                      <button onClick={handleChangeOnNextPage} className='btn next-btn mx-sm-2 mx-1'>
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
                <div className='tab-pane fade' id='ex1-tabs-2' role='tabpanel' aria-labelledby='ex1-tab-2'>
                  <h1 className='text-center color-white bold'>No data</h1>
                </div>
                <div className='tab-pane fade' id='ex1-tabs-3' role='tabpanel' aria-labelledby='ex1-tab-3'>
                  <h1 className='text-center color-white bold'>No data</h1>
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
