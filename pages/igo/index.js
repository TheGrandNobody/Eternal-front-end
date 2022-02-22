import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import InitialGageOffering from '../../components/IGO/InitialGageOffering';
import { tokenOptionData } from '../../constant/data';
import useEternalHook from '../../hooks/useEternalHook';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const IGOSwitch = styled(Switch)(() => ({

}));

function index() {

    const {
        gageType,
        amount,
        asset,
        riskPercentage,
        bonusPercentage,
        condition,
        handleOnAmountSelect,
        handleOnAssetSelect,
        handlePercents,
        handleClickOnConfirmBtn,
        handleClickOnApproveBtn,
        handleUserApproval
      } = useEternalHook();

    return (
        <>
            <HEAD>
                <title>Initial Gage Offering | Eternal</title>
            </HEAD>

            <body className='secondary select-deposit-pg'>
                <div className='header d-flex align-items-center'>
                    <Navbar />
                    <InitialGageOffering 
                    optionsToMap={tokenOptionData}
                    handleClickOnApproveBtn={handleClickOnApproveBtn} 
                    handleClickOnConfirmBtn={handleClickOnConfirmBtn}
                    handleOnAssetSelect={handleOnAssetSelect}
                    handleOnAmountSelect={handleOnAmountSelect}
                    handlePercents={handlePercents}
                    />
                </div>
                <Footer />
            </body>
        </>
    );
}

export default index;