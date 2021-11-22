import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';

function index() {
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
                <li className='nav-item' role='presentation'>
                  <a
                    className='nav-link bold active'
                    id='ex1-tab-1'
                    data-mdb-toggle='tab'
                    href='#ex1-tabs-1'
                    role='tab'
                    aria-controls='ex1-tabs-1'
                    aria-selected='true'>
                    Active
                  </a>
                </li>
                <li className='nav-item' role='presentation'>
                  <a
                    className='nav-link bold'
                    id='ex1-tab-2'
                    data-mdb-toggle='tab'
                    href='#ex1-tabs-2'
                    role='tab'
                    aria-controls='ex1-tabs-2'
                    aria-selected='false'>
                    Pending
                  </a>
                </li>
                <li className='nav-item' role='presentation'>
                  <a
                    className='nav-link bold'
                    id='ex1-tab-3'
                    data-mdb-toggle='tab'
                    href='#ex1-tabs-3'
                    role='tab'
                    aria-controls='ex1-tabs-3'
                    aria-selected='false'>
                    Closed
                  </a>
                </li>
              </ul>

              <div className='tab-content mb-5' id='ex1-content'>
                <div className='tab-pane fade show active' id='ex1-tabs-1' role='tabpanel' aria-labelledby='ex1-tab-1'>
                  <div className='grid'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Gage Type</th>
                          <th scope='col'>Date of Initiation</th>
                          <th scope='col'>Total Number of Users</th>
                          <th scope='col'>Deposit</th>
                          <th scope='col'>Risk</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Gage X</td>
                          <td>25-04-2021</td>
                          <td>10</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>3% </span> <span className='risk-val safe'>Safe</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Gage Y</td>
                          <td>13-05-2021</td>
                          <td>06</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>30% </span> <span className='risk-val superior'>Superior</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Gage Z</td>
                          <td>12-06-2021</td>
                          <td>10</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>5% </span> <span className='risk-val safe'>Safe</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Gage X</td>
                          <td>25-04-2021</td>
                          <td>10</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>3% </span> <span className='risk-val safe'>Safe</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Gage Y</td>
                          <td>13-05-2021</td>
                          <td>06</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>30% </span> <span className='risk-val superior'>Superior</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Gage Z</td>
                          <td>12-06-2021</td>
                          <td>10</td>
                          <td>
                            <span>10,000 </span> <span className='coin-name'>ETRNL</span>
                          </td>
                          <td>
                            <span>5% </span> <span className='risk-val safe'>Safe</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='container text-center my-5 px-0'>
                    <button className='btn grid-btn mx-sm-2 mx-1'>New Gage</button>
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

        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script src='/js/autodrop.js'></script>
      </body>
    </>
  );
}

export default index;
