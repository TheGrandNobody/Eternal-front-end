import React from 'react';
import HEAD from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer/Footer';
import StakeUI from '../../components/StakeUI/Stake';
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { createUserApprovalStatus } from '../../services';

function index() {

    const handleClickOnApproveBtn = async (amount) => {
        const approvalreq = await eternalTokenContract.approve('0x2fDA645542F0495a30312A49e5804Efb91409544', Web3.utils.toWei(`${amount}`, 'ether'));
        let interval = setInterval(async () => {
          let reciept = await getWeb3NoAccount().eth.getTransactionReceipt(approvalreq.hash);
          if (reciept) {
            dispatch(changeApproval({ approval: true }));
            await createUserApprovalStatus(account, true);
            toast.success('Approved Successful !', { toastId: 2 });
            clearInterval(interval);
          }
        }, 500);
    };

    return (
        <>
            <HEAD>
                <title>Stake | Eternal</title>
            </HEAD>

            <body className='secondary select-deposit-pg'>
                <div className='header d-flex align-items-center'>
                    <Navbar />
                    <StakeUI handleClickOnApproveBtn={handleClickOnApproveBtn} />
                </div>
                <Footer />
            </body>
        </>
    );
}

export default index;