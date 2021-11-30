import React, { useState, useEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import Table from '../../components/table/table';
import { tableTabs } from '../../constant/constants';
import { getGagesAccordingToStatus } from '../../services/index';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';

function index() {
  const { account } = useWeb3React();
  const [currentTab, setCurrentTab] = useState(tableTabs[0]);
  const [data, setData] = useState();

  useEffect(() => {
    fetchDataForTable();
  }, [currentTab, account]);

  const fetchDataForTable = async () => {
    const req = await getGagesAccordingToStatus(account, currentTab);
    setData(req.data);
  };

  const handleChangeOnTab = (currentTab) => {
    setCurrentTab(currentTab);
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
              <ul className='nav nav-tabs mb-3' id='ex1' role='tablist'>
                {tableTabs.map((item, index) => (
                  <li className='nav-item' role='presentation' key={index}>
                    <a
                      className={`nav-link bold ${item === currentTab && 'active'}`}
                      id='ex1-tab-1'
                      data-mdb-toggle='tab'
                      role='tab'
                      aria-controls='ex1-tabs-1'
                      aria-selected='false'
                      onClick={() => handleChangeOnTab(item)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <div className='tab-content mb-5' id='ex1-content'>
                <div className='tab-pane fade show active' id='ex1-tabs-1' role='tabpanel' aria-labelledby='ex1-tab-1'>
                  <Table data={data?.results || []} />

                  <div className='container text-center my-5 px-0'>
                    <Link href='/gage-selection'>
                      <button className='btn grid-btn mx-sm-2 mx-1'>New Gage</button>
                    </Link>
                    <button className='btn grid-btn mx-sm-2 mx-1'>Forfeit</button>
                    <button className='btn next-btn mx-sm-2 mx-1'>
                      <svg width='32' height='17' viewBox='0 0 32 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M22.8668 0L21.5117 1.38056L27.5417 7.52382H0.789062V9.47625H27.5417L21.5117 15.6194L22.8668 17L31.2101 8.49997L22.8668 0Z'
                          fill='white'
                        />
                      </svg>
                    </button>
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
