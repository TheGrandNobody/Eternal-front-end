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
import { tokenOptionData } from '../../constant/data';
import CreateLiquidGage from '../LiquidGage/LiquidGage';

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
        <title>Liquid Gage | Eternal</title>
      </HEAD>

      <body className='secondary select-deposit-pg'>
        <div className='header d-flex align-items-center'>
          <Navbar />

          <div className='container select-deposit-container'>
            <CreateLiquidGage optionsToMap={tokenOptionData}></CreateLiquidGage>
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default index;


              /**
              <React.Fragment>
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
                </React.Fragment>
              */