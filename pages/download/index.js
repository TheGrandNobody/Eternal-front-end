import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
function Download() {
  const handleOnClick = (id) => {
    window.open(`/api/${id}/download`);
  };
  return (
    <>
      <HEAD>
        <title>Eternal</title>
      </HEAD>

      <body className='secondary'>
        <div className='header d-flex align-items-center'>
          <Navbar />

          <div className='container select-gage-container'>
            <div className='row m-0 position-relative'>
              <h1 className='color-white bold mb-5'>Downloads</h1>
            </div>
            <div className='row m-0 position-relative select-gage'>
              <div className='col-sm-4 mb-4 mb-sm-0'>
                <div className='text-center' onClick={() => handleOnClick('gases_whitepaper')}>
                  <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                    <img src='img/pdf.svg' />
                    <h5 className='color-white bold mt-5'>
                      Whitepaper:
                      <br /> Introduction to Gages
                    </h5>
                  </div>
                </div>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0' onClick={() => handleOnClick('eternal_whitepaper')}>
                <div className='text-center'>
                  <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                    <img src='img/pdf.svg' />
                    <h5 className='color-white bold mt-5'>Whitepaper: Eternal</h5>
                  </div>
                </div>
              </div>
              <div className='col-sm-4 mb-4 mb-sm-0' onClick={() => handleOnClick('eternal_litepaper')}>
                <div className='text-center'>
                  <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                    <img src='img/pdf.svg' />
                    <h5 className='color-white bold mt-5'>Litepaper</h5>
                  </div>
                </div>
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

export default Download;
