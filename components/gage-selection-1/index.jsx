import React from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import Footer from '../Footer/Footer';
import Tooltip from '../ToolTip/Tooltip';
import useStore from '../../store/useStore';

function index() {
  const setType = useStore(state => state.setType);
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
              <h1 className='color-white bold mb-5 mt-5'>Select a Gage</h1>
            </div>
            <div className='row m-0 position-relative select-gage'>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <div
                  onClick={() => {
                    setType('Liquid');
                  }}>
                  <a className='text-center'>
                    <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                      <img src='img/standard-gage.svg' />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                      <h2 style={{paddingTop: '2.5%'}} className='color-white'>Liquid Gage</h2>
                      <Tooltip
                        text={
                          'Provide liquidity at a 50% discount, instantly earn 10% of your original deposit and leave it be for long enough to win another 10%!'
                        }>
                      </Tooltip>
                    </div>
                  </a>
                </div>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <a className='text-center'>
                  <div className='gage-block inactive d-flex align-items-center justify-content-center flex-column'>
                    <h2>Coming to Eternal</h2>
                    <h1>Soon</h1>
                  </div>
                  <div className='d-flex justify-content-center mt-4'>
                    <h2 style={{paddingTop: '2.5%'}} className='color-white'>Yield Gage</h2>
                    <Tooltip
                      text={
                        'Contender for the highest earning potential of all DeFi! A yield gage is a liquid gage whose deposit is sent to a yield farming strategy.'
                      }>
                    </Tooltip>
                  </div>
                </a>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <a className='text-center'>
                  <div className='gage-block inactive d-flex align-items-center justify-content-center flex-column'>
                    <h2>Coming to Eternal</h2>
                    <h1>Soon</h1>
                  </div>
                  <div className='d-flex justify-content-center mt-4'>
                    <h2 style={{paddingTop: '2.5%'}} className='color-white'>Loyalty Gage</h2>
                    <Tooltip
                      text={
                        'A loyalty gage provides instantaneous profit to the investor, and long-term healthy investors to the firm. The conditions depend on what both parties have agreed upon.'
                      }>
                    </Tooltip>
                  </div>
                </a>
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
