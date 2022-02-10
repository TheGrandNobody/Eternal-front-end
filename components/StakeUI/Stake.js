import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '../ToolTip/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { Typography } from '@mui/material';

const StakeSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: blueGrey[100],
    '&:hover': {
      backgroundColor: alpha(blueGrey[500], 0.2),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: blueGrey[100],
  },
}));

const SelectBackground = styled.div`
    background-color: #bbabe34d;
    border-radius: 16px;
    height: 70%;
    margin: 0 auto;
    width: 70%;
    justify-content: center;
    position: relative;
    border-top: 7.5px groove #ece3e1;
    border-bottom: 7.5px ridge #ece3e1;
`;

const SmallBackground = styled.div`
    background-color: #bbabe34d;
    border-radius: 16px;
    height: 47.5%;
    width: 35%;
    justify-content: center;
    position: relative;
    right: 5%;
    border-top: 5px groove #ece3e1;
    border-bottom: 5px ridge #ece3e1;
`;

const SmallHeader = styled.p`
    font-size: 5vh;
    font-weight: 550;
    border-bottom: 5px ridge #ece3e1;
`;

const HeaderContainer = styled.div`
    margin-top: -3.75%;
`;

const SelectHeader = styled.p`
    padding-top: 3.75%;
    font-weight: 550;
    font-size: 3.5vh;
`;

const InputContainer = styled.div`
    width: 60%;
    height: 12.5%;
    background: hsl(287, 76%, 13%);
    border: 5px solid hsl(287, 90%, 13%);
    box-sizing: border-box;
    border-radius: 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 11%;
`;

const SelectToken = styled.div`
    width: 15%;
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TokenIcon = styled.img`
    width: 50%;
    position: relative;
    right: 35%;
`;

const TokenName = styled.header`
    position: relative;
    font-weight: 535;
    right: 15%;
    &:hover{
        color: #bbabe3;
    }
`;

function StakeUI({handleClickOnApproveBtn, handleClickOnConfirmBtn, handleOnAmountSelect}) {
    const [amount, setAmount] = useState(0);
    const [period, setPeriod] = useState(false);
    const [stake, setStake] = useState('Stake');

    const handleKeyPress = (event) => {
        if ((period && !/[0-9]/.test(event.key)) || !/[0-9\.]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleChange = (event) => {
        setPeriod(/\./.test(event.target.value));
        setAmount(event.target.value);
        handleOnAmountSelect(amount);
    };

    return (
        <div className='container select-bg d-flex justify-content-center'>
            <SmallBackground>
                <SmallHeader className='text-center'>Staking Info</SmallHeader>
                <div className='stake-stats' style={{paddingTop: '3.75%'}}>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Total Stake</h2>
                        <Tooltip
                        text={
                        'The total amount of ETRNL you are currently actively staking.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>10 ETRNL</p>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Total Treasury Share</h2>
                        <Tooltip
                        text={
                        'The total percentage of all Eternal treasury revenue you earn.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>1%</p>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Total Rewards</h2>
                        <Tooltip
                        text={
                        'The total amount of staking rewards available for withdrawal.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>500 ETRNL</p>
                </div>    
            </SmallBackground>
            <SelectBackground>
                <FormControlLabel 
                className='position-relative'
                style={{left: '85%', top: '1.25%'}} 
                control={<StakeSwitch defaultChecked 
                onClick={() => {setStake(stake === 'Stake' ? 'Unstake' : 'Stake')}} />} 
                label={<Typography color={'#ffff'} fontWeight={450}>{stake}</Typography>}
                labelPlacement='bottom' 
                />
                { stake === 'Stake' ? 
                    <HeaderContainer className='d-flex align-items-center justify-content-center'>
                        <SelectHeader>Deposit ETRNL</SelectHeader>
                        <Tooltip
                        text={
                        "Join forces with the Eternal Treasury by staking your ETRNL. You earn a percentage of all gaging fees!"
                        }>
                        </Tooltip>
                    </HeaderContainer>
                :
                    <HeaderContainer className='d-flex align-items-center justify-content-center'>
                        <SelectHeader>Withdraw ETRNL</SelectHeader>
                        <Tooltip
                        text={
                        "Unstake your ETRNL and earn any accumulated rewards proportional to the amount you withdraw. See you later!"
                        }>
                        </Tooltip>
                    </HeaderContainer>  
                }
                <InputContainer className='input-container'>
                    <input type='text' inputMode='decimal' title='Token Amount' autoComplete='off' autoCorrect='off' pattern='^[0-9]*[.,]?[0-9]*$' placeholder = '0.0' minLength='1' maxLength='79' spellCheck='false' onKeyPress={handleKeyPress} onChange={handleChange}></input>
                    <SelectToken>
                        <TokenIcon src='img/etrnl.png'></TokenIcon>
                        <TokenName>ETRNL</TokenName>
                    </SelectToken>
                </InputContainer>
                <div className='gage-stats'>
                    <div className='d-flex align-items-center justify-content-around'>
                        <div>
                          { stake === 'Stake' ?
                            <>
                                <div className='d-flex align-center justify-content-center'>
                                    <h2>Added Share</h2>
                                    <Tooltip
                                    text={
                                    "The additional share of the treasury's revenue you will receive from staking this amount."
                                    }>
                                    </Tooltip>
                                </div>
                                <p className='text-center'>10%</p>
                            </>
                          :
                            <>
                                <div className='d-flex align-center justify-content-center'>
                                    <h2>Deducted Share</h2>
                                    <Tooltip
                                    text={
                                    "The share of the treasury's revenue you will give up from unstaking this amount of ETRNL."
                                    }>
                                    </Tooltip>
                                </div>
                                <p className='text-center'>0.1%</p>
                            </>
                          }
                        </div>
                        <div>
                          {stake === 'Stake' ?
                            <>
                                <div className='d-flex align-center justify-content-center'>
                                    <h2>Estimated APY</h2>
                                    <Tooltip
                                    text={
                                    'The estimated annual percentage yield that this added treasury share will earn you.'
                                    }>
                                    </Tooltip>
                                </div>
                                <p className='text-center'>1%</p>
                            </>
                          :
                            <>
                                <div className='d-flex align-center justify-content-center'>
                                    <h2>Rewards</h2>
                                    <Tooltip
                                    text={
                                    'The rewards you will receive from unstaking this amount of ETRNL.'
                                    }>
                                    </Tooltip>
                                </div>
                                <p className='text-center'>50 ETRNL</p>
                            </>
                          }
                        </div>
                    </div>
                </div>
                <div className='text-center' style={{paddingTop: '7.5%'}}>
                    <button
                        onClick={async () => {await handleClickOnApproveBtn(amount);}}
                        className='btn theme-btn'>
                        Approve
                    </button>
                </div>
            </SelectBackground>         
        </div>
  );
}

export default StakeUI;
