import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '../ToolTip/Tooltip';

const SelectBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  height: 90%;
  justify-content: center;
  margin-bottom: 110%;
`;

const SelectHeader = styled.p`
    padding-top: 2.5%;
    font-size: 275%;
    font-weight: 550;
`;

const SelectContainer = styled.div`
    width: 65%;
    height: 10%;
    margin: 0 auto;
    margin-bottom: 7.5%;
`;

const InputContainer = styled.div`
    width: 70%;
    height: 110%;
    background: #30083b;
    border: 2px solid #bbabe3;
    box-sizing: border-box;
    border-radius: 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
`;

const SelectToken = styled.div`
    width: 15%;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TokenIcon = styled.img`
    width: 45%;
    position: relative;
    right: 30%;
`;

const TokenName = styled.p`
    position: relative;
    font-weight: 525;
    right: 15%;
    top: 15%;
    transition: color 0.25s;
    &:hover{
        color: #bbabe3;
    }
`;

const Chevron = styled.img`
    position: relative;
    left: 2.5%;
    width: 12.5%;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(72deg) brightness(111%) contrast(103%);
    transition: transform 0.4s;
`;

const StatsContainer = styled.div`
    margin-bottom: 3.75%;
`;

const RewardsContainer = styled.div`
    height: 15%;
    margin-bottom: 6.75%;
`

const RewardsBlock = styled.div`
    margin: 0 auto;
    width: 35%;
    height: 70%;
    background: #30083b;
    border: 1px solid #bbabe3;
    border-radius: 16px;
    align-items: center;
    justify-content: space-around;
    display: flex;
`
function CreateLiquidGage({ optionsToMap}) {
    const [deposit, setDeposit] = useState('Select');
    const [icon, setIcon] = useState('');
    const [visibility, setVisibility] = useState(false);
    
    const NUMBERS = /[0-9]+/;

    const handleKeyPress = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
      };

    return (
        <SelectBackground>
            <div className='d-flex align-items-center justify-content-center'>
                <SelectHeader className='text-center'>Select a deposit</SelectHeader>
                <Tooltip
                text={
                "The deposit is the asset you add to the gage to provide liquidity to an ETRNL pair. You can withdraw it whenever you want."
                }>
                    <a className='ms-2 position-relative' style= {{top: 2.5}}>
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
            <SelectContainer>
                <InputContainer className='input-container'>
                    <input type='text' inputMode='decimal' title='Token Amount' autoComplete='off' autoCorrect='off' pattern='^[0-9]*[.,]?[0-9]*$' placeholder = '0.0' minLength='1' maxLength='79' spellCheck='false' onKeyPress={handleKeyPress}></input>
                    <SelectToken onClick={() => setVisibility(!visibility)}>
                        <TokenIcon src={icon}></TokenIcon>
                        <TokenName className={visibility && 'hover'}>{deposit}</TokenName>
                        <Chevron className={visibility && 'rotate'} src='img/down.png'></Chevron>
                    </SelectToken>
                </InputContainer>
                <ul className={'token-list ' + (!visibility && 'hide')}>
                    {optionsToMap.map((item, index) => (
                    <li className='token-option' key={index} onClick={() => {setDeposit(item.token); setIcon(item.icon); setVisibility(!visibility)}}>
                        <img className='vertical-center' src={item.icon}></img>
                        <p>{item.token}</p>
                    </li>
                    ))}
                </ul>
            </SelectContainer>
            <StatsContainer className='gage-stats'>
                <div className='d-flex align-items-center justify-content-around'>
                    <div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h2>Bonus (%)</h2>
                            <Tooltip
                            text={
                            "The percentage of Eternal's liquidity rewards and deposit you gain on top of your deposit/rewards if the gage closes in your favor."
                            }>
                                <a className='ms-2 tooltip-up'>
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
                        <p className='text-center'>10%</p>
                    </div>
                    <div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h2>Risk (%)</h2>
                            <Tooltip
                            text={
                            'The net loss you would incur if the gage closed in favor of Eternal.'
                            }>
                                <a className='ms-2 tooltip-up'>
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
                        <p className='text-center'>1%</p>
                    </div>
                    <div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h2>Condition</h2>
                            <Tooltip
                            text={
                            'The percent by which the ETRNL supply must decrease before the gage closes in your favor.'
                            }>
                                <a className='ms-2 tooltip-up'>
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
                        <p className='text-center'>0.025%</p>
                    </div>
                </div>
            </StatsContainer>
            <RewardsContainer className='text-center'>
                <div className='d-flex align-items-center justify-content-center'>
                    <h2>Instant Reward</h2>
                    <Tooltip
                            text={
                            'The amount of ETRNL you instantly receive upon entering the gage.'
                            }>
                                <a className='ms-2 tooltip-up'>
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
                <RewardsBlock>
                    <b>100 ETRNL</b>
                </RewardsBlock>
            </RewardsContainer>
            <div className='text-center approve-btn'>
              <button
                onClick={async () => {await handleClickOnApproveBtn(amount);}}
                className='btn theme-btn'>
                Approve
              </button>
            </div>
        </SelectBackground>
  );
}

export default CreateLiquidGage;
