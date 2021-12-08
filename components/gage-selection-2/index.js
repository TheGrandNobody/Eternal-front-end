import React, { useEffect, useLayoutEffect } from 'react';
import HEAD from 'next/head';
import Navbar from '../navbar';
import useEternalHook from '../../hooks/useEternalHook';
import Footer from '../Footer/Footer';
import { useWeb3React } from '@web3-react/core';
import { changeApproval } from '../../reducers/main';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOwnedGages } from '../../services';
import { changeAllowedToChangeGage } from '../../reducers/main';

function index() {
  const {
    gageType,
    amount,
    riskType,
    riskPercentage,
    handleClickOnRiskPercentage,
    handleClickOnRiskType,
    handleOnAmountSelect,
    handleClickOnConfirmBtn,
    handleClickOnApproveBtn,
    handleUserApproval,
  } = useEternalHook();

  const dispatch = useDispatch();
  const { approval, allowedToCreateGage } = useSelector((state) => state.eternal);
  const { account } = useWeb3React();

  useEffect(() => {
    (async () => {
      const req = await handleUserApproval(account);
      dispatch(changeApproval({ approval: req?.approvalStatus || false }));
    })();
  }, [account]);

  useEffect(() => {
    if (amount && riskType && riskPercentage && account && gageType) {
      (async () => {
        const req = await getUserOwnedGages(amount, riskType, riskPercentage, account, gageType, 'pending');
        if (req?.data?.results?.length > 0) {
          dispatch(changeAllowedToChangeGage({ permission: false }));
        } else if (req?.data?.results?.length === 0) {
          dispatch(changeAllowedToChangeGage({ permission: true }));
        }
      })();
    }
  }, [amount, riskType, riskPercentage, account, gageType]);

  return (
    <>
      <HEAD>
        <title>Gage Selection | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />

          <div className='container select-gage-container' style={{ marginBottom: 50 }}>
            <div className='row m-0 position-relative text-center'>
              <h1 className='color-white bold mb-5'>Select a deposit</h1>
            </div>
            <div className='row m-0 position-relative select-gage select-deposit'>
              <div className='col-sm-4 mb-4 mb-sm-0' onClick={() => handleOnAmountSelect(10000)}>
                <a className='text-center'>
                  <div className={`gage-block ${amount === 10000 && 'active-gage'} d-flex align-items-center justify-content-center flex-column`}>
                    <svg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0.000177008 42.1882C0.349959 41.4048 0.971066 40.9816 1.78628 40.7623C2.55297 40.556 3.30195 40.2839 4.05925 40.0427C5.24443 39.6651 6.2093 40.0656 6.56156 41.0795C6.91294 42.0908 6.38552 43.0252 5.21946 43.4245C4.42585 43.6964 3.62463 43.9463 2.82606 44.204C1.34175 44.6829 0.754999 44.4567 0 43.1176C0.000177105 42.808 0.000177008 42.4979 0.000177008 42.1882Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M68.0001 43.1177C67.2462 44.4575 66.6578 44.685 65.1748 44.2065C64.3344 43.9355 63.4893 43.677 62.6558 43.3854C61.6247 43.025 61.1226 42.0981 61.4122 41.1451C61.7081 40.1703 62.6861 39.6643 63.7517 39.981C64.746 40.2764 65.7628 40.542 66.6975 40.9763C67.209 41.214 67.571 41.7736 68.0001 42.188C68.0001 42.4978 68.0001 42.8079 68.0001 43.1177Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M64.0596 23.9159C64.0681 25.2561 63.532 26.3503 62.5813 27.2744C59.1386 30.6213 55.7068 33.9798 52.2602 37.3228C51.831 37.7388 51.6291 38.1407 51.742 38.7805C52.5937 43.6127 53.4144 48.4505 54.2244 53.2899C54.5172 55.0398 53.9156 56.493 52.5248 57.559C51.1079 58.6452 49.5113 58.8361 47.9032 58.0409C45.7647 56.983 43.6679 55.8405 41.5547 54.7317C39.3044 53.5508 37.049 52.3792 34.8114 51.1745C34.2456 50.8697 33.7741 50.8688 33.1999 51.1736C28.9261 53.444 24.6458 55.7028 20.3497 57.9314C17.4183 59.4522 14.0186 57.6736 13.7492 54.42C13.6603 53.3448 13.9485 52.2285 14.1311 51.1423C14.8349 46.9575 15.5599 42.7764 16.2931 38.5967C16.3932 38.0259 16.1083 37.6821 15.7475 37.3311C12.3384 34.0131 8.94506 30.6785 5.52127 27.3757C4.11275 26.0169 3.56373 24.421 4.16252 22.5606C4.7707 20.6708 6.16947 19.7145 8.1387 19.4419C12.8681 18.7873 17.5874 18.0609 22.3144 17.388C22.9156 17.3025 23.2504 17.0143 23.5065 16.4915C25.6356 12.1463 27.7745 7.80559 29.9246 3.47059C30.9564 1.39031 33.0866 0.416767 35.2381 1.03238C36.5963 1.42095 37.5146 2.31533 38.1327 3.57597C40.2338 7.86138 42.3648 12.1323 44.4587 16.4212C44.7525 17.023 45.1306 17.3053 45.8054 17.3999C50.5775 18.0683 55.3432 18.782 60.1123 19.4734C62.4189 19.8083 64.0472 21.6313 64.0596 23.9159ZM19.9169 38.3663C19.901 38.5071 19.8848 38.7504 19.8443 38.9895C19.0227 43.8275 18.2027 48.6658 17.3675 53.5015C17.2876 53.9629 17.2318 54.3833 17.6464 54.7081C18.0966 55.0613 18.5135 54.8535 18.9382 54.63C23.1234 52.4272 27.3224 50.2504 31.4918 48.0183C33.1789 47.1149 34.7824 47.0946 36.4734 47.9982C40.6642 50.2375 44.8806 52.4291 49.0848 54.6431C49.4888 54.8557 49.8894 55.0507 50.3216 54.7338C50.7417 54.4262 50.7247 54.0137 50.6427 53.5421C49.8298 48.8819 49.0599 44.2143 48.2236 39.5586C47.8759 37.6237 48.3801 36.0643 49.8018 34.7015C53.2206 31.4247 56.59 28.0963 59.9869 24.7965C60.4107 24.3847 60.6994 23.9244 60.2735 23.4193C60.0643 23.1714 59.6375 23.0395 59.2895 22.9874C54.6539 22.2951 50.0193 21.5946 45.3747 20.9666C43.4529 20.7068 42.1128 19.8053 41.2637 18.0513C39.3577 14.1132 37.4 10.1999 35.4626 6.27664C35.2572 5.86062 35.0969 5.41042 34.8251 5.0431C34.6375 4.78949 34.2868 4.49124 34.0228 4.50364C33.7228 4.51763 33.4243 4.83908 33.153 5.06081C33.0439 5.15008 33.0081 5.32948 32.9396 5.46798C30.8563 9.68892 28.761 13.9038 26.6961 18.1336C25.9273 19.7086 24.7258 20.657 22.9948 20.9131C20.5015 21.2822 18.0059 21.6345 15.5119 21.997C13.149 22.3402 10.7855 22.6792 8.42508 23.0382C7.68408 23.1509 7.32455 23.7268 7.61377 24.3052C7.71844 24.5146 7.91431 24.6837 8.08699 24.8523C11.4918 28.1759 14.8928 31.5029 18.3102 34.8134C19.2951 35.7675 19.8769 36.8816 19.9169 38.3663Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M35.7604 64.488C35.7604 65.0837 35.8068 65.6843 35.7498 66.2748C35.6602 67.2009 34.9102 67.8324 33.9947 67.8301C33.0831 67.828 32.3019 67.1888 32.2539 66.2633C32.1912 65.0522 32.1914 63.8332 32.2506 62.622C32.2961 61.6902 33.0642 61.0463 33.9736 61.0357C34.9213 61.0247 35.6717 61.6667 35.756 62.634C35.8097 63.2475 35.7661 63.8695 35.7661 64.4876C35.7643 64.4878 35.7626 64.4878 35.7604 64.488Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.3861 2.98669C14.6459 3.16061 15.1958 3.38713 15.5412 3.78933C16.2301 4.59144 16.8264 5.47679 17.4245 6.35275C18.0311 7.24093 17.8464 8.2878 17.0253 8.87561C16.2278 9.44642 15.1886 9.29588 14.5535 8.46756C13.8814 7.59089 13.236 6.69226 12.611 5.78123C12.2013 5.18403 12.1969 4.52804 12.5534 3.89932C12.8848 3.31487 13.42 3.04 14.3861 2.98669Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M55.7545 4.84647C55.6052 5.20635 55.5099 5.60236 55.2967 5.91902C54.7294 6.76222 54.1239 7.5808 53.5101 8.39141C52.8236 9.29818 51.779 9.48343 50.9514 8.87419C50.1096 8.2545 49.9614 7.2195 50.6137 6.29147C51.2366 5.40542 51.8667 4.52272 52.5372 3.67297C53.0386 3.0377 53.7871 2.86856 54.5073 3.13334C55.2317 3.39952 55.6764 4.03923 55.7545 4.84647Z'
                        fill='white'
                      />
                    </svg>

                    <h1 className='color-white bold mt-4 mb-2'>10’000</h1>
                    <p className='color-white'>ETRNL</p>
                  </div>
                </a>
              </div>

              <div className='col-sm-4 mb-4 mb-sm-0' onClick={() => handleOnAmountSelect(100000)}>
                <a className='text-center'>
                  <div className={`gage-block ${amount === 100000 && 'active-gage'} d-flex align-items-center justify-content-center flex-column`}>
                    <svg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0 24.4375C0.26112 23.0094 0.403715 21.547 0.803612 20.1591C2.67578 13.6608 6.68172 8.94103 13.0012 6.47715C19.9225 3.77848 26.4475 4.82653 32.4319 9.21749C32.9642 9.60819 33.4458 10.068 33.9881 10.5271C34.184 10.3696 34.3741 10.2272 34.5529 10.0718C38.9602 6.23738 44.0837 4.57598 49.8824 5.18053C54.8024 5.6936 58.965 7.8425 62.3407 11.4506C65.6414 14.9785 67.4789 19.1803 67.9049 23.997C67.918 24.1456 67.9675 24.2909 68 24.4377C68 25.3233 68 26.2088 68 27.0945C67.888 27.6064 67.7809 28.1191 67.6632 28.6295C66.789 32.4234 64.8018 35.6501 62.4868 38.6986C58.646 43.7565 53.9908 48.0099 49.1507 52.0712C44.6879 55.8161 39.9829 59.2371 35.1473 62.4833C34.3308 63.0314 33.6697 63.0304 32.8532 62.4827C24.5993 56.945 16.7514 50.9079 9.83559 43.734C6.70812 40.4895 3.8836 37.0027 1.8793 32.924C1.01676 31.169 0.365867 29.3425 0.120019 27.3887C0.107237 27.2873 0.0411684 27.1924 0 27.0946C0 26.2086 0 25.3232 0 24.4375ZM20.4771 7.69788C20.4652 7.63628 20.453 7.57468 20.4409 7.51308C18.7296 7.82241 16.9675 7.96537 15.3165 8.47163C9.86132 10.144 6.10105 13.7479 3.96478 19.0128C1.90171 24.0968 2.33066 28.9651 5.26971 33.6519C7.19898 36.7284 9.47154 39.5127 11.9777 42.1107C18.476 48.8469 25.8561 54.5124 33.5683 59.7692C33.8943 59.9916 34.1155 59.9848 34.4365 59.7656C42.1264 54.5168 49.4963 48.8743 55.9812 42.1551C58.5816 39.4607 61.0113 36.6194 62.8865 33.3517C64.219 31.0295 65.3282 28.6088 65.327 25.8716C65.3251 20.894 63.6262 16.5402 60.1393 12.978C53.3304 6.02186 42.5379 5.94084 35.5987 12.7318C34.1707 14.1292 33.8279 14.1295 32.3973 12.7274C29.0851 9.48067 25.0966 7.84035 20.4771 7.69788Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M60.9583 24.7764C60.8831 26.0448 60.4838 26.6583 59.6089 26.6988C58.7189 26.74 58.2407 26.1195 58.1887 24.8558C58.0142 20.6055 55.3023 16.8743 51.3134 15.3967C50.2631 15.0077 49.8508 14.3057 50.2027 13.5054C50.5138 12.7977 51.1815 12.54 52.0495 12.8475C56.2201 14.3244 58.9296 17.2323 60.2656 21.4122C60.6122 22.4967 60.7334 23.653 60.9583 24.7764Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M45.0207 13.6839C45.0325 12.9686 45.6123 12.3937 46.3281 12.3873C47.0668 12.3806 47.6805 12.9938 47.6669 13.7252C47.6533 14.4571 47.0287 15.0375 46.28 15.0142C45.5536 14.9917 45.0086 14.4156 45.0207 13.6839Z'
                        fill='white'
                      />
                    </svg>
                    <h1 className='color-white bold mt-4 mb-2'>100’000</h1>
                    <p className='color-white'>ETRNL</p>
                  </div>
                </a>
              </div>

              <div className='col-sm-4 mb-4 mb-sm-0' onClick={() => handleOnAmountSelect(1000000)}>
                <a className='text-center'>
                  <div className={`gage-block ${amount === 1000000 && 'active-gage'} d-flex align-items-center justify-content-center flex-column`}>
                    <svg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M33.7585 68C32.8501 67.6359 32.2205 66.9583 31.6154 66.2118C23.7289 56.4839 15.8271 46.7684 7.93051 37.0485C6.3626 35.1188 6.42955 32.8705 8.10496 31.0411C10.8253 28.0709 13.5549 25.1093 16.2644 22.1294C17.4202 20.8583 18.834 20.2202 20.5459 20.2203C29.7968 20.221 39.0476 20.2209 48.2985 20.2205C50.0095 20.2203 51.4257 20.8547 52.5822 22.1269C55.2763 25.0909 57.9903 28.0369 60.6964 30.9898C62.428 32.8795 62.4942 35.1069 60.8739 37.1015C52.8801 46.942 44.8926 56.7869 36.8738 66.6071C36.408 67.1775 35.6883 67.5404 35.0865 67.9997C34.6439 68 34.2011 68 33.7585 68ZM8.87378 35.0473C16.4604 44.386 23.9371 53.5895 31.4138 62.793C31.4595 62.531 31.4128 62.3211 31.3437 62.1187C30.0892 58.4392 28.8313 54.7607 27.5761 51.0813C26.228 47.1299 24.8799 43.1789 23.5367 39.2262C23.2903 38.5012 23.5103 37.9318 24.0829 37.7439C24.6732 37.5498 25.1491 37.853 25.4184 38.5943C25.4487 38.6774 25.4829 38.759 25.5112 38.8426C28.2674 46.9342 31.0228 55.0262 33.7796 63.1174C33.9675 63.6684 34.1671 64.2155 34.3612 64.7647C34.4078 64.7627 34.4542 64.761 34.5008 64.7592C37.8705 54.8726 41.2407 44.9859 44.6285 35.0473C32.7054 35.0473 20.9021 35.0473 8.87378 35.0473ZM37.3121 62.7026C37.3562 62.7285 37.4002 62.7545 37.4444 62.7804C44.9186 53.5792 52.393 44.3779 59.8676 35.1767C59.8261 35.1193 59.7845 35.0621 59.7431 35.0046C59.5049 35.0046 59.2668 35.0046 59.0288 35.0046C55.1796 35.0046 51.3302 35.0154 47.4812 34.9925C46.9313 34.9892 46.6823 35.1431 46.4989 35.6863C44.0544 42.9246 41.5802 50.1531 39.1151 57.3847C38.5111 59.1564 37.9131 60.93 37.3121 62.7026ZM36.7945 22.2721C36.9119 22.4288 36.979 22.5363 37.0633 22.6283C40.126 25.972 43.1842 29.32 46.2685 32.6438C46.4713 32.8623 46.8748 32.9951 47.1861 32.9971C51.1234 33.0205 55.0609 33.0123 58.9983 33.0123C59.2079 33.0123 59.4174 33.0123 59.6269 33.0123C59.6487 32.9571 59.6705 32.9016 59.6922 32.8464C56.7496 29.6354 53.8072 26.4247 50.8125 23.1569C50.7146 23.4182 50.6574 23.5602 50.6078 23.7049C49.9927 25.5014 49.379 27.2984 48.7648 29.0951C48.7149 29.2414 48.6738 29.3916 48.6132 29.5333C48.3676 30.1057 47.8621 30.3474 47.3283 30.1537C46.8048 29.964 46.5563 29.4555 46.7547 28.8569C47.3519 27.0545 47.9725 25.2597 48.5812 23.4612C48.7062 23.0925 48.8194 22.7198 48.9623 22.2719C44.8726 22.2721 40.8702 22.2721 36.7945 22.2721ZM34.4232 22.7016C31.2659 26.1465 28.1846 29.5086 25.0244 32.9567C31.3488 32.9567 37.5201 32.9567 43.8236 32.9567C40.6484 29.4925 37.5611 26.1249 34.4232 22.7016ZM9.04893 32.9624C13.2522 32.9624 17.2835 32.9624 21.3978 32.9624C20.2804 29.6857 19.182 26.464 18.0489 23.141C15.0275 26.4382 12.0898 29.6438 9.04893 32.9624ZM23.1814 32.0154C26.1694 28.7554 29.1022 25.5555 32.1111 22.2726C27.9746 22.2726 23.9717 22.2726 19.8626 22.2726C20.9779 25.5464 22.0639 28.7345 23.1814 32.0154Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M34.8213 0C35.3267 0.380777 35.4303 0.90005 35.4282 1.50699C35.4123 5.79312 35.4206 10.0794 35.4174 14.3657C35.4172 14.6075 35.419 14.8576 35.3613 15.0892C35.2383 15.5801 34.8937 15.8258 34.3895 15.8129C33.9136 15.8008 33.5955 15.5488 33.4836 15.0889C33.4273 14.8567 33.4283 14.6069 33.4281 14.3652C33.4251 10.0789 33.4335 5.79277 33.4175 1.50664C33.4152 0.899873 33.5172 0.380068 34.0243 0C34.2899 0 34.5556 0 34.8213 0Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M24.628 16.8835C24.4808 16.7581 24.0905 16.5736 23.9341 16.269C22.5117 13.4987 21.1248 10.7102 19.7409 7.9204C19.4436 7.32107 19.6224 6.76727 20.1396 6.50373C20.6615 6.23808 21.2061 6.42191 21.5138 7.03222C22.9154 9.8133 24.3104 12.5974 25.6848 15.3919C26.0494 16.1338 25.6162 16.8644 24.628 16.8835Z'
                        fill='white'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M49.3588 7.2435C49.1994 7.64854 49.1274 7.88108 49.0204 8.09626C47.6912 10.7658 46.359 13.4337 45.0224 16.0993C44.6524 16.8373 44.11 17.0737 43.5399 16.7672C42.9954 16.4744 42.8816 15.9282 43.2381 15.2134C44.5882 12.506 45.9444 9.80178 47.2966 7.09579C47.5499 6.58874 47.945 6.22514 48.5047 6.45201C48.8544 6.59352 49.0999 6.99254 49.3588 7.2435Z'
                        fill='white'
                      />
                    </svg>

                    <h1 className='color-white bold mt-4 mb-2'>1’000’000</h1>
                    <p className='color-white'>ETRNL</p>
                  </div>
                </a>
              </div>
            </div>
            {amount && (
              <React.Fragment>
                <div className='row m-0 position-relative text-center mt-5'>
                  <h3 className='color-white bold mb-5'>and a risk percentage</h3>
                </div>
                <div className='container risk-container '>
                  <div className='row m-0 position-relative select-gage select-deposit pb-5'>
                    <div className='col-sm-6'>
                      <div className='row m-0 position-relative p-0'>
                        <div className='col-sm-12 p-0' onClick={() => handleClickOnRiskType('safer')}>
                          <a className='text-center'>
                            <div
                              className={`gage-block ${
                                riskType === 'safer' && 'active-gage'
                              } d-flex align-items-center justify-content-center flex-column`}>
                              <svg width='58' height='68' viewBox='0 0 58 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M29.3699 0C31.4267 0.663873 33.4789 1.34184 35.5408 1.98936C42.521 4.18074 49.5046 6.36003 56.486 8.54729C57.7448 8.94162 57.9415 9.22232 57.9416 10.5494C57.9417 17.99 57.9738 25.4308 57.9339 32.8712C57.8757 43.7475 53.8108 52.8557 45.6379 60.0487C40.9569 64.1684 35.4805 66.77 29.3596 67.9628C28.7466 68.0822 28.0431 67.8899 27.4099 67.7301C16.6924 65.0265 8.72433 58.8213 3.70042 48.9469C1.15803 43.9503 -0.00331558 38.6051 7.10886e-06 33.002C0.00439306 25.4728 0.000804838 17.9436 0.00133647 10.4144C0.00146938 9.26273 0.233659 8.9496 1.33666 8.6039C10.2158 5.82108 19.0951 3.0388 27.9733 0.253057C28.1792 0.188464 28.3731 0.0853267 28.5725 0C28.8384 0 29.1042 0 29.3699 0ZM2.65896 10.9686C2.65896 11.1799 2.65896 11.333 2.65896 11.4863C2.65949 18.7947 2.60353 26.104 2.69431 33.4112C2.72209 35.6539 2.91401 37.9482 3.4354 40.1219C6.40947 52.5212 14.0405 60.6922 26.1581 64.6456C27.5216 65.0904 28.875 65.4529 30.4188 65.0572C44.9952 61.3194 55.1428 48.4936 55.2703 33.445C55.3322 26.1369 55.2783 18.828 55.2945 11.5195C55.2955 11.0848 55.1541 10.9067 54.7549 10.7823C46.3135 8.15175 37.8768 5.50676 29.4336 2.88197C29.1432 2.79172 28.7742 2.80967 28.4796 2.90018C24.8875 4.00384 21.302 5.1289 17.7158 6.25131C12.7179 7.81563 7.72074 9.38274 2.65896 10.9686Z'
                                  fill='white'
                                />
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M50.4949 25.2108C50.4949 28.0454 50.5295 30.8805 50.4868 33.7144C50.4214 38.0776 49.3676 42.2037 47.3638 46.0829C46.9172 46.9477 46.1929 47.2457 45.4717 46.8801C44.7487 46.5135 44.5588 45.7498 45.0044 44.8781C46.9673 41.0399 47.8771 36.9665 47.8493 32.6578C47.8159 27.4761 47.8309 22.2938 47.8567 17.112C47.8595 16.5587 47.6784 16.3628 47.1744 16.2065C41.2842 14.381 35.4029 12.5261 29.5131 10.6979C29.2004 10.601 28.8074 10.5857 28.4979 10.6818C22.5866 12.5152 16.6845 14.3774 10.7731 16.2109C10.2768 16.3648 10.0813 16.5459 10.0843 17.1075C10.1131 22.7101 10.0554 28.3134 10.1183 33.9155C10.2403 44.7944 17.9636 54.7143 28.4702 57.5584C28.7901 57.6451 29.1751 57.6461 29.4941 57.5579C32.2268 56.8026 34.7454 55.5869 37.0628 53.9541C37.2075 53.8522 37.3504 53.7469 37.5003 53.6532C38.1898 53.2228 38.9594 53.3468 39.3831 53.9528C39.8089 54.5616 39.7032 55.3782 39.0079 55.8111C37.3961 56.8145 35.7895 57.8486 34.087 58.6768C32.6856 59.3584 31.1578 59.789 29.6666 60.2704C29.2707 60.3983 28.779 60.3987 28.3713 60.297C17.4939 57.5847 9.07456 48.0356 7.69897 36.8465C7.54533 35.5972 7.45934 34.3318 7.45389 33.0733C7.42824 27.3378 7.44219 21.602 7.44286 15.8665C7.44299 14.7256 7.68621 14.4116 8.79174 14.0651C15.2453 12.042 21.6949 10.0064 28.1572 8.01074C28.6499 7.85857 29.2697 7.84993 29.7606 8.00131C36.2661 10.0069 42.7597 12.0515 49.2549 14.0905C50.2315 14.3971 50.4977 14.7666 50.4983 15.7771C50.5005 18.9217 50.4991 22.0663 50.4991 25.2108C50.4979 25.2108 50.4964 25.2108 50.4949 25.2108Z'
                                  fill='white'
                                />
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M26.5574 31.8267C27.6681 30.7053 28.7217 29.6362 29.7812 28.573C31.3748 26.9738 32.9704 25.3766 34.569 23.7826C35.4673 22.887 36.0896 22.8918 36.9971 23.7963C38.3296 25.1245 39.6613 26.4533 40.988 27.7871C41.8322 28.6358 41.8413 29.2886 41.0053 30.1257C36.5792 34.5579 32.1499 38.987 27.7177 43.4134C26.8839 44.2462 26.2253 44.2354 25.3809 43.392C22.562 40.5766 19.7443 37.76 16.9295 34.9405C16.1114 34.1213 16.1089 33.4749 16.9212 32.6569C18.2938 31.2749 19.6704 29.8969 21.0523 28.5244C21.8221 27.7598 22.5152 27.7594 23.2892 28.5297C24.3682 29.6033 25.433 30.691 26.5574 31.8267ZM38.303 28.9808C37.4507 28.1259 36.6115 27.2846 35.732 26.4026C35.5839 26.5443 35.4083 26.7057 35.2399 26.8741C32.7519 29.3604 30.266 31.8487 27.7767 34.3338C26.8742 35.2349 26.2474 35.2344 25.3465 34.3356C24.3005 33.2919 23.2591 32.2437 22.2487 31.2305C21.3481 32.1322 20.4939 32.9873 19.7324 33.7498C22.0125 36.0335 24.3306 38.3548 26.6211 40.6487C30.4769 36.7975 34.3874 32.8916 38.303 28.9808Z'
                                  fill='white'
                                />
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M43.9991 50.6519C43.995 51.3864 43.4268 51.958 42.6965 51.9624C41.9595 51.9669 41.3319 51.3295 41.3577 50.6029C41.3826 49.9002 42.0129 49.3013 42.7122 49.3161C43.4336 49.3315 44.0032 49.9226 43.9991 50.6519Z'
                                  fill='white'
                                />
                              </svg>
                              <h1 className='color-white bold mt-4 mb-2'>Safer</h1>
                            </div>
                          </a>
                        </div>
                        {riskType === 'safer' && (
                          <div className='col-sm-12 d-flex align-items-center justify-content-center my-4 percentage-val'>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 1 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(1)}>
                              1%
                            </a>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 2 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(2)}>
                              2%
                            </a>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 5 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(5)}>
                              5%
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='col-sm-6'>
                      <div className='row m-0 position-relative p-0'>
                        <div className='col-sm-12 p-0' onClick={() => handleClickOnRiskType('safe')}>
                          <a className='text-center'>
                            <div
                              className={`gage-block ${
                                riskType === 'safe' && 'active-gage'
                              } d-flex align-items-center justify-content-center flex-column`}>
                              <svg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M27.6618 65.8966C27.4177 65.4634 27.0564 65.0577 26.9491 64.5929C26.3182 61.8624 25.7475 59.1182 25.1531 56.3793C25.1191 56.223 25.0559 56.0729 24.993 55.8788C22.846 57.0058 20.7336 58.1147 18.6216 59.224C18.0518 59.5234 17.4783 59.8158 16.915 60.127C16.4222 60.3991 15.937 60.5221 15.4875 60.0749C15.0646 59.654 15.1643 59.1952 15.3958 58.7008C17.4738 54.2641 19.5394 49.8214 21.6085 45.3801C21.7049 45.1734 21.7987 44.9654 21.8245 44.9087C21.0918 43.4889 20.3892 42.1751 19.735 40.8379C19.4451 40.2454 19.0412 39.833 18.4452 39.5563C17.5229 39.1278 16.6138 38.6689 15.712 38.1985C14.209 37.4143 13.531 36.1582 13.6344 34.4712C13.6979 33.4339 13.8113 32.3951 13.7935 31.359C13.7847 30.8512 13.6159 30.2981 13.3644 29.8531C12.8647 28.9689 12.2504 28.1503 11.6961 27.2964C10.7608 25.8557 10.771 24.4098 11.7087 22.9736C12.2313 22.1733 12.7429 21.3645 13.3009 20.5893C13.7121 20.018 13.8785 19.4186 13.8168 18.7201C13.7307 17.7474 13.6885 16.7705 13.6322 15.7951C13.5365 14.1358 14.2037 12.8891 15.679 12.1105C16.597 11.626 17.5301 11.1692 18.4687 10.7265C19.0402 10.4571 19.4487 10.0683 19.7165 9.48686C20.1417 8.56324 20.6063 7.65708 21.0711 6.75226C21.817 5.29992 23.0073 4.56319 24.6483 4.6226C25.6866 4.66021 26.7257 4.71846 27.7599 4.81565C28.3956 4.87539 28.9448 4.74425 29.4635 4.37913C30.0579 3.96092 30.6557 3.54187 31.2836 3.17775C32.0139 2.75421 32.7782 2.38992 33.5279 2C33.944 2 34.3599 2 34.7759 2C36.2812 2.45183 37.4516 3.48229 38.7334 4.31472C39.3401 4.70847 39.9411 4.88471 40.6682 4.80616C41.6797 4.69682 42.6998 4.65039 43.7176 4.62227C45.3059 4.57816 46.4699 5.29776 47.2024 6.69734C47.6837 7.61681 48.1524 8.54426 48.587 9.48636C48.8553 10.0678 49.264 10.4566 49.8349 10.7263C50.7735 11.1699 51.7066 11.6263 52.6245 12.1108C54.1 12.8898 54.765 14.1383 54.6707 15.7966C54.6162 16.7512 54.5765 17.7075 54.4886 18.6594C54.42 19.4013 54.5928 20.0372 55.0359 20.6433C55.5993 21.4141 56.1093 22.2247 56.6261 23.0285C57.5252 24.4276 57.5306 25.8427 56.6381 27.2448C56.0802 28.121 55.4492 28.9536 54.9378 29.8551C54.6856 30.2992 54.5182 30.8534 54.5097 31.361C54.4924 32.3973 54.6081 33.4357 54.6695 34.4732C54.7695 36.1587 54.093 37.4168 52.5883 38.1993C51.6122 38.7069 50.6019 39.1519 49.646 39.6936C49.271 39.9058 48.9199 40.2571 48.7004 40.6292C47.9337 41.9304 47.2181 43.2626 46.5163 44.6004C46.4397 44.7462 46.5381 45.024 46.6238 45.2087C48.6771 49.6343 50.7397 54.0552 52.8001 58.4775C52.8878 58.6655 53.0481 58.8611 53.0371 59.045C53.0163 59.3928 52.999 59.8389 52.787 60.0495C52.5758 60.259 52.1296 60.2648 51.7816 60.2886C51.6202 60.2994 51.4448 60.146 51.2797 60.0593C48.8352 58.7742 46.3915 57.4878 43.9468 56.2027C43.7467 56.0977 43.5419 56.0015 43.2701 55.8667C42.9689 57.2446 42.6768 58.5768 42.3871 59.9095C42.0386 61.5125 41.7214 63.1227 41.3253 64.7135C41.2195 65.1384 40.8757 65.5038 40.641 65.8964C40.3916 65.8964 40.1419 65.8964 39.8923 65.8964C39.6473 65.5496 39.3451 65.2299 39.1667 64.8518C37.5936 61.5158 36.0427 58.1693 34.4834 54.8264C34.3933 54.6334 34.29 54.4465 34.1514 54.1759C34.0036 54.4643 33.9052 54.6425 33.8193 54.8264C32.2687 58.1501 30.7261 61.4777 29.1608 64.7944C28.9736 65.1913 28.6637 65.5305 28.4109 65.8964C28.1609 65.8966 27.9113 65.8966 27.6618 65.8966ZM26.3924 43.5643C26.3926 43.5668 26.3926 43.5688 26.3927 43.5711C26.7455 43.5507 27.1025 43.5575 27.4503 43.5051C28.6465 43.3247 29.7053 43.6234 30.683 44.323C31.4257 44.8547 32.2182 45.3172 32.9608 45.8493C33.7839 46.439 34.5589 46.4094 35.3724 45.8338C36.1522 45.2819 36.9718 44.7865 37.7547 44.2387C38.6477 43.6139 39.6151 43.3733 40.7006 43.4871C41.6509 43.5868 42.6089 43.6081 43.5623 43.6797C44.4826 43.7489 45.1124 43.3631 45.5076 42.534C45.9633 41.5784 46.4454 40.6354 46.9157 39.6868C47.3074 38.8963 47.8912 38.3038 48.6899 37.9162C49.6423 37.4538 50.5797 36.9603 51.5357 36.5048C52.394 36.0958 52.7533 35.4437 52.6751 34.4978C52.5859 33.4209 52.5496 32.3397 52.4819 31.261C52.4277 30.3971 52.6636 29.6202 53.1424 28.9063C53.6981 28.078 54.2237 27.2288 54.8045 26.4188C55.417 25.5646 55.4339 24.7571 54.8201 23.8956C54.2295 23.0668 53.6909 22.2013 53.1251 21.3547C52.6598 20.6582 52.431 19.8994 52.4817 19.058C52.547 17.9791 52.5982 16.8992 52.668 15.8206C52.7365 14.7618 52.4601 14.2556 51.5035 13.7738C50.5766 13.3068 49.6483 12.8419 48.7145 12.3885C47.8971 11.9918 47.2988 11.3874 46.9002 10.5736C46.4525 9.65993 45.9713 8.76211 45.5487 7.83732C45.1313 6.92417 44.4627 6.52826 43.4648 6.61613C42.4919 6.70201 41.5141 6.73063 40.541 6.81334C39.5933 6.89372 38.7274 6.69818 37.9356 6.16647C37.073 5.58733 36.1948 5.03132 35.3427 4.43737C34.5466 3.88237 33.7869 3.86173 32.9826 4.42639C32.1157 5.03482 31.22 5.60264 30.3365 6.1876C29.5617 6.70067 28.7121 6.89056 27.7868 6.8155C26.7718 6.73313 25.7535 6.69135 24.738 6.61497C23.8174 6.54574 23.1885 6.9275 22.7939 7.75943C22.3403 8.71584 21.8568 9.65827 21.3855 10.6062C20.9929 11.3959 20.4073 11.9883 19.6105 12.3771C18.6589 12.8414 17.7118 13.3148 16.7672 13.7931C15.8434 14.2606 15.5655 14.7713 15.6321 15.795C15.7008 16.8527 15.7489 17.912 15.8193 18.9697C15.8799 19.8781 15.6337 20.6909 15.1257 21.4396C14.5538 22.2818 14.0098 23.1432 13.431 23.9806C12.894 24.7573 12.8768 25.5069 13.4197 26.2892C13.9644 27.0742 14.4596 27.894 15.0122 28.6731C15.6279 29.542 15.904 30.4821 15.8143 31.5469C15.7323 32.5201 15.7001 33.4975 15.6351 34.4722C15.5643 35.5336 15.8389 36.0337 16.8 36.5175C17.7086 36.975 18.6176 37.4321 19.5348 37.8725C20.3942 38.2852 21.0182 38.9151 21.4304 39.7743C21.8883 40.7287 22.3714 41.671 22.8408 42.6201C23.2123 43.3711 23.8089 43.7341 24.6502 43.68C25.231 43.6425 25.8116 43.6029 26.3924 43.5643ZM34.6727 48.2741C33.4273 48.3883 32.481 47.9704 31.5928 47.3356C30.8839 46.8286 30.1733 46.3072 29.4032 45.9083C28.9155 45.6555 28.3182 45.5063 27.7688 45.5026C26.5873 45.4946 25.405 45.6506 24.223 45.6559C23.7888 45.6579 23.6094 45.786 23.4405 46.152C21.8395 49.6177 20.2216 53.0757 18.6101 56.5364C18.5451 56.6761 18.4951 56.8229 18.3976 57.0682C18.6865 56.9261 18.8691 56.8414 19.047 56.7475C21.0483 55.6936 23.0464 54.6334 25.0511 53.5854C25.9258 53.1281 26.5472 53.4212 26.7638 54.3802C26.9467 55.1897 27.112 56.0031 27.2882 56.8141C27.6332 58.4019 27.9804 59.9894 28.3267 61.5767C28.3713 61.5824 28.4161 61.5882 28.4607 61.594C30.5153 57.1882 32.5702 52.7823 34.6727 48.2741ZM49.8057 57.026C49.8237 56.9406 49.8502 56.8947 49.8372 56.8669C48.141 53.2163 46.4442 49.5659 44.7323 45.9226C44.6732 45.797 44.462 45.678 44.3146 45.669C42.9884 45.586 41.6605 45.5321 40.3335 45.462C39.4233 45.4141 37.7577 46.3963 37.3714 47.221C36.7292 48.593 36.0748 49.9596 35.4604 51.3439C35.3597 51.5708 35.3449 51.9189 35.4459 52.1396C36.8374 55.1769 38.2554 58.202 39.6706 61.2285C39.7312 61.3583 39.8266 61.4722 39.958 61.6739C40.4952 59.2021 41.0073 56.8507 41.5164 54.4984C41.7602 53.3726 42.3264 53.1095 43.3645 53.6483C43.917 53.9352 44.4677 54.226 45.0189 54.515C46.611 55.3499 48.2024 56.185 49.8057 57.026Z'
                                  fill='white'
                                />
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M34.1838 39.8286C26.0419 39.8321 19.4456 33.2552 19.4482 25.1363C19.4509 17.0292 26.0546 10.4663 34.2101 10.4658C42.2711 10.4655 48.87 17.1048 48.848 25.1937C48.826 33.2601 42.248 39.825 34.1838 39.8286ZM34.1271 12.4645C27.1726 12.4534 21.4712 18.1384 21.4458 25.1097C21.4201 32.0986 27.107 37.8115 34.1104 37.8323C41.122 37.8531 46.8312 32.1877 46.852 25.1887C46.8728 18.1595 41.1889 12.4758 34.1271 12.4645Z'
                                  fill='white'
                                />
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M28.3372 35.0566C27.5889 35.0685 27.1193 34.5032 27.2431 33.8259C27.5645 32.069 27.8875 30.312 28.2573 28.5651C28.3816 27.9781 28.2904 27.5878 27.8171 27.1711C26.5227 26.0307 25.2912 24.819 24.0254 23.6455C23.6643 23.3107 23.4193 22.9438 23.5862 22.4403C23.7621 21.9106 24.2001 21.7712 24.7109 21.7118C26.4859 21.5052 28.2573 21.2677 30.0323 21.0617C30.4452 21.0138 30.676 20.8411 30.8522 20.4516C31.5882 18.8249 32.3708 17.2193 33.1192 15.598C33.3347 15.1312 33.607 14.7533 34.163 14.7596C34.7192 14.7659 34.9793 15.157 35.1928 15.6203C35.9315 17.2231 36.7054 18.8097 37.4311 20.4183C37.6152 20.8266 37.8498 21.0165 38.2937 21.0667C40.0484 21.2653 41.7985 21.5047 43.5527 21.7081C44.0579 21.7668 44.5076 21.8802 44.702 22.4047C44.9105 22.9672 44.601 23.3478 44.2142 23.7068C42.919 24.9097 41.6452 26.136 40.334 27.3206C39.9926 27.6291 39.9229 27.9129 40.0105 28.3439C40.3696 30.1144 40.6871 31.8934 41.0378 33.6656C41.1305 34.1338 41.087 34.5362 40.6939 34.8431C40.2676 35.1761 39.8462 35.0622 39.417 34.8241C37.8552 33.9569 36.2782 33.117 34.7308 32.2249C34.292 31.972 33.9674 32.0039 33.5484 32.2428C32.0328 33.1068 30.4984 33.9381 28.9674 34.7746C28.7339 34.9025 28.4803 34.9933 28.3372 35.0566ZM38.6671 32.1273C38.6365 31.8432 38.6307 31.6788 38.6001 31.519C38.3767 30.3576 38.1685 29.193 37.9146 28.0383C37.7605 27.3377 37.9041 26.8025 38.4737 26.3286C39.1592 25.7581 39.7848 25.1157 40.4363 24.5048C40.7737 24.1884 41.1113 23.8722 41.5397 23.4708C40.0521 23.2864 38.7164 23.1009 37.3759 22.9631C36.6912 22.8927 36.2246 22.6302 35.9522 21.9607C35.6087 21.1166 35.186 20.3045 34.795 19.4797C34.5972 19.0625 34.394 18.6476 34.1435 18.1286C33.4913 19.511 32.8769 20.7548 32.3179 22.0231C32.0593 22.6101 31.6575 22.8933 31.0418 22.9454C30.587 22.9839 30.1335 23.0421 29.6807 23.1004C28.7509 23.2198 27.8219 23.3453 26.7771 23.4836C27.9086 24.5445 28.9283 25.5181 29.9689 26.4682C30.3789 26.8425 30.5377 27.2585 30.4174 27.802C30.2876 28.3892 30.1829 28.9821 30.0734 29.5737C29.9225 30.388 29.7775 31.2033 29.6073 32.1434C30.9499 31.4052 32.1583 30.7648 33.3412 30.0803C33.909 29.7516 34.4066 29.7565 34.9721 30.0838C36.1547 30.7676 37.3619 31.4087 38.6671 32.1273Z'
                                  fill='white'
                                />
                              </svg>
                              <h1 className='color-white bold mt-4 mb-2'>Safe</h1>
                            </div>
                          </a>
                        </div>
                        {riskType === 'safe' && (
                          <div className='col-sm-12 d-flex align-items-center justify-content-center my-4'>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 10 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(10)}>
                              10%
                            </a>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 25 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(25)}>
                              25%
                            </a>
                            <a
                              className={`percentage-block ${
                                riskPercentage === 50 && 'active-percentage-block'
                              } d-flex align-items-center justify-content-center bold mx-2`}
                              onClick={() => handleClickOnRiskPercentage(50)}>
                              50%
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {allowedToCreateGage ? (
                      amount && riskType && riskPercentage ? (
                        approval ? (
                          <div className='col-sm-12 my-5 text-center'>
                            <button
                              onClick={() => handleClickOnConfirmBtn(gageType, amount, riskType, riskPercentage, account)}
                              className='btn theme-btn'>
                              Confirm
                            </button>
                          </div>
                        ) : (
                          <div className='col-sm-12 my-5 text-center'>
                            <button
                              onClick={async () => {
                                await handleClickOnApproveBtn(amount);
                              }}
                              className='btn theme-btn'>
                              Approve
                            </button>
                          </div>
                        )
                      ) : (
                        ''
                      )
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <Footer />
      </body>
    </>
  );
}

export default index;