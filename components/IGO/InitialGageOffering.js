import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Tooltip from '../ToolTip/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { Typography } from '@mui/material';

const IGOSwitch = styled(Switch)(() => ({
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
    width: 70%;
    justify-content: center;
    position: relative;
    border-top: 7.5px groove #ece3e1;
    border-bottom: 7.5px ridge #ece3e1;
    transition: height 0.25s;
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

const SelectHeader = styled.p`
    font-size: 3.5vh;
    font-weight: 550;
    padding-top: 3.75%;
`;

const HeaderContainer = styled.div`
    margin-top: -3.75%;
`;

const SmallHeader = styled.p`
    font-size: 240%;
    font-weight: 550;
    border-bottom: 5px ridge #d3d3d3;
`;

const InputContainer = styled.div`
    width: 60%;
    background: hsl(287, 76%, 13%);
    border: 5px solid hsl(287, 90%, 13%);
    box-sizing: border-box;
    border-radius: 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 5%;
`;

const SelectToken = styled.div`
    width: 15%;
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
`;

const TokenIcon = styled.img`
    width: 50%;
    position: relative;
    right: 30%;
`;

const TokenName = styled.header`
    position: relative;
    font-weight: 535;
    right: 15%;
    transition: color 0.25s;
    &:hover{
        color: #bbabe3;
    }
`;

const SelectContainer = styled.div`
    height: 10%;
    margin: 0 auto;
`;

const TokenList = styled.ul`
    width: 15%;
    height: 150%;
    background: #30083b;
    border-radius: 6px;
    margin-left: 65%;
    padding-left: 0;
    margin-top: -3.5%;
    z-index: 100;
    position: relative;
`;

const Chevron = styled.img`
    position: relative;
    left: 2.5%;
    width: 12.5%;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(72deg) brightness(111%) contrast(103%);
    transition: transform 0.4s;
`;

const RewardsContainer = styled.div`
    height: 15%;
`

const RewardsBlock = styled.div`
    margin: 0 auto;
    width: 60%;
    background: hsl(287, 76%, 13%);
    border: 5px solid hsl(287, 90%, 13%);
    border-radius: 16px;
    align-items: center;
    justify-content: space-around;
    display: flex;
`

const Amount = styled.div`
    overflow: hidden;
    width: 60%;
    text-overflow: ellipsis;
    font-size: 2.5vh;
`


function InitialGageOffering({optionsToMap, 
    handleClickOnApproveBtn, 
    handleClickOnConfirmBtn, 
    handleOnAssetSelect, 
    handleOnAmountSelect,
    handlePercents}) {

    const [deposit, setDeposit] = useState('Select');
    const [icon, setIcon] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [amount, setAmount] = useState('0.0');
    const [period, setPeriod] = useState(false);
    const [offering, setIGO] = useState('Gage');
    const [height, setHeight] = useState('82.5%')

    const { approval, allowedToCreateGage } = useSelector((state) => state.eternal);

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

    useEffect(() => {
        if (deposit) {
            (async () => {
                await handlePercents(deposit);
            })();
        }
      }, [deposit]);

    return (
        <div className='container select-bg d-flex justify-content-center'>
            <SmallBackground>
                <SmallHeader className='text-center'>IGO Stats</SmallHeader>
                <div className='stake-stats' style={{paddingTop: '3.75%'}}>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Total Contribution</h2>
                        <Tooltip
                        text={
                        'The total amount of ETRNL sent to liquidity pairs as a result of your MIM/AVAX contributions to gages or simple deposits.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>5000 ETRNL</p>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Amount Gaged</h2>
                        <Tooltip
                        text={
                        'The total amount of ETRNL sent to liquidity pairs as a result of your usage of a loyalty gage.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>4500 ETRNL</p>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Amount Deposited</h2>
                        <Tooltip
                        text={
                        'The total amount of ETRNL you have sent to liquidity pairs as a result of depositing MIM or AVAX.'
                        }>
                        </Tooltip>
                    </div>
                    <p className='text-center'>500 ETRNL</p>
                </div>    
            </SmallBackground>
            <SelectBackground style={{height: height}}>
                <FormControlLabel 
                    className='position-relative'
                    style={{left: '85%', top: '1.25%'}} 
                    control={<IGOSwitch defaultChecked 
                    onClick={() => {
                        setIGO(offering === 'Gage' ? 'Deposit' : 'Gage'); 
                        setHeight(height === '70%' ? '85%' : '70%')}}/>} 
                    label={<Typography color={'#ffff'} fontWeight={450}>{offering}</Typography>}
                    labelPlacement='bottom' 
                />
              { offering === 'Deposit' ? 
              <>
                <HeaderContainer className='d-flex align-items-center justify-content-center'>
                    <SelectHeader>Select a deposit</SelectHeader>
                    <Tooltip
                    text={
                    "Deposit MIM or AVAX and get ETRNL in return. The deposit will be automatically added to its corresponding ETRNL liquidity pair's reserves."
                    }>
                    </Tooltip>
                </HeaderContainer>
                <SelectContainer style={{marginBottom: '9%'}}>
                    <InputContainer className='input-container' style={{height: '125%'}}>
                        <input type='text' inputMode='decimal' title='Token Amount' autoComplete='off' autoCorrect='off' pattern='^[0-9]*[.,]?[0-9]*$' placeholder = '0.0' minLength='1' maxLength='79' spellCheck='false' onKeyPress={handleKeyPress} onChange={handleChange}></input>
                        <SelectToken onClick={() => setVisibility(!visibility)}>
                            <TokenIcon src={icon}></TokenIcon>
                            <TokenName className={(visibility && 'hover')}>{deposit}</TokenName>
                            <Chevron className={visibility && 'rotate'} src='img/down.png'></Chevron>
                        </SelectToken>
                    </InputContainer>
                    <TokenList className={(!visibility && 'hide')}>
                        {optionsToMap.map((item, index) => (
                        <li className='token-option d-flex align-items-center justify-content-start' key={index} onClick={() => {setDeposit(item.token); setIcon(item.icon); setVisibility(!visibility); handleOnAssetSelect(deposit);}}>
                            <img className='vertical-center' src={item.icon}></img>
                            <header>{item.token}</header>
                        </li>
                        ))}
                    </TokenList>
                </SelectContainer>
                <RewardsContainer style={{marginBottom: '10%'}}>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>You get</h2>
                        <Tooltip
                            text={
                            'The amount of ETRNL you receive in return for your deposit.'
                            }>
                        </Tooltip>
                    </div>
                    <RewardsBlock style={{height: '82.5%'}}>
                        <Amount>{(amount == '0' || amount == '' ? '0.0' : amount)}</Amount>
                        <SelectToken style={{cursor: 'auto'}}>
                            <TokenIcon src='img/etrnl.png'></TokenIcon>
                            <TokenName>ETRNL</TokenName>
                        </SelectToken>
                    </RewardsBlock>
                </RewardsContainer>
             </>
            : 
             <>
                <HeaderContainer className='d-flex align-items-center justify-content-center'>
                    <SelectHeader>Select a deposit</SelectHeader>
                    <Tooltip
                    text={
                    "The deposit is the asset you provide to the loyalty gage. You can withdraw it whenever you want."
                    }>
                    </Tooltip>
                </HeaderContainer>
                <SelectContainer style={{marginBottom: '8.5%'}}>
                    <InputContainer className='input-container' style={{height: '102.5%'}}>
                        <input type='text' inputMode='decimal' title='Token Amount' autoComplete='off' autoCorrect='off' pattern='^[0-9]*[.,]?[0-9]*$' placeholder = '0.0' minLength='1' maxLength='79' spellCheck='false' onKeyPress={handleKeyPress} onChange={handleChange}></input>
                        <SelectToken onClick={() => setVisibility(!visibility)}>
                            <TokenIcon src={icon}></TokenIcon>
                            <TokenName className={visibility && 'hover'}>{deposit}</TokenName>
                            <Chevron className={visibility && 'rotate'} src='img/down.png'></Chevron>
                        </SelectToken>
                    </InputContainer>
                    <TokenList className={(!visibility && 'hide')}>
                        {optionsToMap.map((item, index) => (
                        <li className='token-option d-flex align-items-center justify-content-start' key={index} onClick={() => {setDeposit(item.token); setIcon(item.icon); setVisibility(!visibility); handleOnAssetSelect(deposit);}}>
                            <img className='vertical-center' src={item.icon}></img>
                            <header>{item.token}</header>
                        </li>
                        ))}
                    </TokenList>
                </SelectContainer>
                <div className='gage-stats' style={{marginBottom: '4.5%'}}>
                    <div className='d-flex align-items-center justify-content-around'>
                        <div>
                            <div className='d-flex align-center justify-content-center'>
                                <h2>Bonus (%)</h2>
                                <Tooltip
                                text={
                                "The additional percentage of your deposit you gain if the gage closes in your favor."
                                }>
                                </Tooltip>
                            </div>
                            <p className='text-center'>10%</p>
                        </div>
                        <div>
                            <div className='d-flex align-center justify-content-center'>
                                <h2>Risk (%)</h2>
                                <Tooltip
                                text={
                                'The net loss you would incur if the gage closed in favor of Eternal.'
                                }>
                                </Tooltip>
                            </div>
                            <p className='text-center'>1%</p>
                        </div>
                        <div>
                            <div className='d-flex align-center justify-content-center'>
                                <h2>Condition</h2>
                                <Tooltip
                                text={
                                'The percentage by which the ETRNL supply must decrease before the gage closes in your favor.'
                                }>
                                </Tooltip>
                            </div>
                            <p className='text-center'>0.025%</p>
                        </div>
                    </div>
                </div>
                <RewardsContainer style={{marginBottom: '6.5%'}}>
                    <div className='d-flex align-center justify-content-center'>
                        <h2>Instant Reward</h2>
                        <Tooltip
                        text={
                        'The amount of ETRNL you instantly receive upon entering the loyalty gage.'
                        }>
                        </Tooltip>
                    </div>
                    <RewardsBlock style={{height: '67.5%'}}>
                        <Amount>{(amount == '0' || amount == '' ? '0.0' : amount)}</Amount>
                        <SelectToken style={{cursor: 'auto'}}>
                            <TokenIcon src='img/etrnl.png'></TokenIcon>
                            <TokenName>ETRNL</TokenName>
                        </SelectToken>
                    </RewardsBlock>
                </RewardsContainer>
             </> }
                <div className='text-center'>
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

export default InitialGageOffering;
