import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import { api } from '../../constant/constants';
import fileDownload from 'js-file-download';

function Download() {
  const handleDownload = (file) => {
    api.get(`download/${file}`, {responseType: 'blob'}).then((response) => {
      fileDownload(response.data, file);
    });
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
                <div onClick={() => handleDownload('whitepaper-gages.pdf')}>
                  <a className='text-center'>
                    <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                      <img src='img/pdf.svg' />
                      <h5 className='color-white bold mt-5'>
                        Whitepaper:
                        <br /> Introduction to Gages
                      </h5>
                    </div>
                  </a>
                </div>
              </div>

              <div className='col-sm-4 inactive mb-4 mb-sm-0'>
                <div onClick={() => handleDownload('whitepaper-eternal.pdf')}>
                  <a className='text-center'>
                    <div className='gage-block d-flex align-items-center justify-content-center flex-column'>
                      <img src='img/pdf.svg' />
                      <h5 className='color-white bold mt-5'>Whitepaper: Eternal</h5>
                    </div>
                  </a>
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

export default Download;
