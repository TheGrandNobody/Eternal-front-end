import React from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import Link from 'next/link';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { changeGageType } from '../../reducers/main';
import { useRouter } from 'next/router';
import Tooltip from '../ToolTip/Tooltip';

function index() {
  const dispatch = useDispatch();
  return (
    <>
      <HEAD>
        <title>Gage Selection | Eternal</title>
      </HEAD>

      <body className='secondary'>
        <div className='header d-flex align-items-center'>
          <Navbar />

          <div className='container select-gage-container'>
            <div className='row m-0 position-relative text-center'>
              <h1 className='color-white bold mb-5'>Select a Gage</h1>
            </div>
            <div className='row m-0 position-relative select-gage'>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <div
                  onClick={() => {
                    dispatch(changeGageType({ gageType: 'Standard Gage' }));
                  }}>
                  <a className='text-center'>
                    <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                      <img src='img/standard-gage.svg' />
                    </div>
                    <div className='d-flex align-items-center justify-content-center mt-4'>
                      <h2 className='color-white mt-1'>Standard Gage</h2>
                      <Tooltip
                        text={
                          'A standard 6-holder gage contract with 1:5 risk to reward. Deposit an asset, choose a risk percentage and get paired with five other users. Last one to withdraw his funds wins the risk percentage of the others and a percentage of their accumulated fees. Are you the most patient? (Reward redistribution-friendly)'
                        }>
                        <a className='ms-2'>
                          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <circle cx='6' cy='6' r='6' fill='white' />
                            <path
                              d='M6.416 7.264H5.512V6.776C5.512 6.56267 5.536 6.40533 5.584 6.304C5.63733 6.19733 5.74933 6.05867 5.92 5.888L6.504 5.304C6.62667 5.17067 6.688 5.00533 6.688 4.808C6.688 4.61067 6.624 4.448 6.496 4.32C6.368 4.18667 6.20267 4.12 6 4.12C5.79733 4.12 5.62667 4.184 5.488 4.312C5.35467 4.43467 5.27733 4.6 5.256 4.808H4.288C4.34133 4.33333 4.52533 3.96267 4.84 3.696C5.16 3.424 5.55733 3.288 6.032 3.288C6.50667 3.288 6.89333 3.41867 7.192 3.68C7.49067 3.936 7.64 4.296 7.64 4.76C7.64 5.08 7.552 5.34667 7.376 5.56C7.27467 5.688 7.19733 5.77867 7.144 5.832C7.09067 5.88533 7.01867 5.95467 6.928 6.04C6.84267 6.12 6.768 6.192 6.704 6.256C6.64533 6.31467 6.59733 6.36533 6.56 6.408C6.464 6.52533 6.416 6.69067 6.416 6.904V7.264ZM5.976 9.04C5.81067 9.04 5.66667 8.984 5.544 8.872C5.42133 8.75467 5.36 8.616 5.36 8.456C5.36 8.29067 5.41867 8.14933 5.536 8.032C5.65867 7.91467 5.80267 7.856 5.968 7.856C6.13867 7.856 6.28533 7.91467 6.408 8.032C6.53067 8.144 6.592 8.28267 6.592 8.448C6.592 8.608 6.53067 8.74667 6.408 8.864C6.29067 8.98133 6.14667 9.04 5.976 9.04Z'
                              fill='#440C54'
                            />
                          </svg>
                        </a>
                      </Tooltip>
                    </div>
                  </a>
                </div>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <a className='text-center'>
                  <div className='gage-block inactive d-flex align-items-center justify-content-center flex-column'>
                    <h2>Coming in</h2>
                    <h1>Q1</h1>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-4'>
                    <h2 className='color-white mt-1'>Loyalty Gage</h2>
                    <Tooltip
                      text={
                        'A loyalty gage creates a symbiotic relationship between the investor and the firm offering it, by providing instantaneous profit to the investor, and long-term healthy investors to the firm. The conditions depend on what both parties have agreed upon.'
                      }>
                      <a className='ms-2'>
                        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <circle cx='6' cy='6' r='6' fill='white' />
                          <path
                            d='M6.416 7.264H5.512V6.776C5.512 6.56267 5.536 6.40533 5.584 6.304C5.63733 6.19733 5.74933 6.05867 5.92 5.888L6.504 5.304C6.62667 5.17067 6.688 5.00533 6.688 4.808C6.688 4.61067 6.624 4.448 6.496 4.32C6.368 4.18667 6.20267 4.12 6 4.12C5.79733 4.12 5.62667 4.184 5.488 4.312C5.35467 4.43467 5.27733 4.6 5.256 4.808H4.288C4.34133 4.33333 4.52533 3.96267 4.84 3.696C5.16 3.424 5.55733 3.288 6.032 3.288C6.50667 3.288 6.89333 3.41867 7.192 3.68C7.49067 3.936 7.64 4.296 7.64 4.76C7.64 5.08 7.552 5.34667 7.376 5.56C7.27467 5.688 7.19733 5.77867 7.144 5.832C7.09067 5.88533 7.01867 5.95467 6.928 6.04C6.84267 6.12 6.768 6.192 6.704 6.256C6.64533 6.31467 6.59733 6.36533 6.56 6.408C6.464 6.52533 6.416 6.69067 6.416 6.904V7.264ZM5.976 9.04C5.81067 9.04 5.66667 8.984 5.544 8.872C5.42133 8.75467 5.36 8.616 5.36 8.456C5.36 8.29067 5.41867 8.14933 5.536 8.032C5.65867 7.91467 5.80267 7.856 5.968 7.856C6.13867 7.856 6.28533 7.91467 6.408 8.032C6.53067 8.144 6.592 8.28267 6.592 8.448C6.592 8.608 6.53067 8.74667 6.408 8.864C6.29067 8.98133 6.14667 9.04 5.976 9.04Z'
                            fill='#440C54'
                          />
                        </svg>
                      </a>
                    </Tooltip>
                  </div>
                </a>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <a className='text-center'>
                  <div className='gage-block inactive d-flex align-items-center justify-content-center flex-column'>
                    <h2>Coming in</h2>
                    <h1>Q2</h1>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-4'>
                    <h2 className='color-white mt-1'>Yield Gage</h2>
                    <Tooltip
                      text={
                        '“A yield gage adds additional layers of passive revenue, by sending the deposit of your gage to a yield farming strategy. Profit from ETRNL fees, yield farming and gaging all at once: exponentially more money for your patience!”'
                      }>
                      <a className='ms-2'>
                        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <circle cx='6' cy='6' r='6' fill='white' />
                          <path
                            d='M6.416 7.264H5.512V6.776C5.512 6.56267 5.536 6.40533 5.584 6.304C5.63733 6.19733 5.74933 6.05867 5.92 5.888L6.504 5.304C6.62667 5.17067 6.688 5.00533 6.688 4.808C6.688 4.61067 6.624 4.448 6.496 4.32C6.368 4.18667 6.20267 4.12 6 4.12C5.79733 4.12 5.62667 4.184 5.488 4.312C5.35467 4.43467 5.27733 4.6 5.256 4.808H4.288C4.34133 4.33333 4.52533 3.96267 4.84 3.696C5.16 3.424 5.55733 3.288 6.032 3.288C6.50667 3.288 6.89333 3.41867 7.192 3.68C7.49067 3.936 7.64 4.296 7.64 4.76C7.64 5.08 7.552 5.34667 7.376 5.56C7.27467 5.688 7.19733 5.77867 7.144 5.832C7.09067 5.88533 7.01867 5.95467 6.928 6.04C6.84267 6.12 6.768 6.192 6.704 6.256C6.64533 6.31467 6.59733 6.36533 6.56 6.408C6.464 6.52533 6.416 6.69067 6.416 6.904V7.264ZM5.976 9.04C5.81067 9.04 5.66667 8.984 5.544 8.872C5.42133 8.75467 5.36 8.616 5.36 8.456C5.36 8.29067 5.41867 8.14933 5.536 8.032C5.65867 7.91467 5.80267 7.856 5.968 7.856C6.13867 7.856 6.28533 7.91467 6.408 8.032C6.53067 8.144 6.592 8.28267 6.592 8.448C6.592 8.608 6.53067 8.74667 6.408 8.864C6.29067 8.98133 6.14667 9.04 5.976 9.04Z'
                            fill='#440C54'
                          />
                        </svg>
                      </a>
                    </Tooltip>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script type='text/javascript' src='/js/mdb.min.js'></script>
        <script src='/js/autodrop.js'></script>
      </body>
    </>
  );
}

export default index;
