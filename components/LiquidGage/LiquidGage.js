import { Box } from "@mui/system";
import { toNumber } from "lodash";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeApproval } from "../../reducers/main";
import ConfirmButton from "../Buttons/ConfirmButton";
import Tooltip from "../ToolTip/Tooltip";

const SelectBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  height: 90%;
  justify-content: center;
  margin-bottom: 110%;
  margin: 0 auto;
  width: 100%;
  max-width: 698px;
  border-top: 7.5px groove #e6e6fa;
  border-bottom: 7.5px ridge #e6e6fa;
  margin-bottom: 30px;
  @media screen and (min-width: 2160px) {
    max-width: 1344px;
  }
`;

const SelectHeader = styled.p`
  padding-top: 2.5%;
  font-size: 3.5vmin;
  font-weight: 550;
`;

const SelectContainer = styled.div`
  width: 65%;
  height: 10%;
  margin: 0 auto;
  margin-bottom: 11%;
`;

const InputContainer = styled.div`
  width: 84.5%;
  height: 110%;
  background: hsl(287, 76%, 13%);
  border: 5px solid hsl(287, 90%, 13%);
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
  &:hover {
    color: #bbabe3;
  }
`;

const TokenIcon = styled.img`
  width: 47.5%;
  position: relative;
  right: 30%;
`;

const TokenName = styled.header`
  position: relative;
  font-weight: 525;
  right: 15%;
  transition: color 0.25s;
`;

const TokenList = styled.ul`
  width: 20%;
  height: 125%;
  background: #30083b;
  border-radius: 6px;
  margin-left: 65%;
  padding-left: 0;
  margin-top: 2%;
  z-index: 100;
  position: relative;
`;

const Chevron = styled.img`
  position: relative;
  left: 2.5%;
  width: 12.5%;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(72deg) brightness(111%)
    contrast(103%);
  transition: transform 0.4s;
`;

const StatsContainer = styled.div`
  margin-bottom: 7%;
`;

const RewardsContainer = styled.div`
  height: 15%;
  margin-bottom: 6.75%;
`;

const RewardsBlock = styled.div`
  margin: 0 auto;
  width: 55%;
  height: 72.5%;
  background: hsl(287, 76%, 13%);
  border: 5px solid hsl(287, 90%, 13%);
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
  display: flex;
`;

const Amount = styled.div`
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
  font-size: 2.5vmin;
`;

function CreateLiquidGage({
  optionsToMap,
  handleClickOnApproveBtn,
  handleClickOnConfirmBtn,
  handleOnAssetSelect,
  handleOnAmountSelect,
  handleConversionToETRNL,
  handlePercents
}) {
  const [deposit, setDeposit] = useState('Select');
  const [icon, setIcon] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [amount, setAmount] = useState('0.0');
  const [period, setPeriod] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const { approval,
          gageRiskPercentage, 
          gageBonusPercentage,
          gageCondition, 
          depositInETRNL } = useSelector((state) => state.eternal);

  useEffect(async () => {
    await handleConversionToETRNL(toNumber(amount) > 0 && deposit != 'Select', true, 0);
  }, [amount, loaded]);

  useEffect(() => {
    if (deposit != 'Select') {
      (async () => {
        const bonus = await handlePercents(false);
        await handleConversionToETRNL(toNumber(amount) > 0, bonus);
        setLoaded(true);
      })();
    }
  }, [deposit]);

  const handleKeyPress = (event) => {
    if ((period && !/[0-9]/.test(event.key)) || !/[0-9\.]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    setPeriod(/\./.test(event.target.value));
    setAmount(event.target.value);
    handleOnAmountSelect(event.target.value);
  };

  return (
    <SelectBackground>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "3%" }}
      >
        <SelectHeader>Select a deposit</SelectHeader>
        <Tooltip
          text={
            "The deposit is the asset you add to the gage to provide liquidity to an ETRNL pair. You can withdraw it whenever you want."
          }
        ></Tooltip>
      </div>
      <SelectContainer>
        <InputContainer className="input-container">
          <input
            type="text"
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minLength="1"
            maxLength="79"
            spellCheck="false"
            onKeyPress={(event) => handleKeyPress(event)}
            onChange={(event) => handleChange(event)}
          ></input>
          <SelectToken onClick={() => setVisibility(!visibility)}>
            <TokenIcon src={icon}></TokenIcon>
            <TokenName className={visibility && "hover"}>{deposit}</TokenName>
            <Chevron
              className={visibility && "rotate"}
              src="img/down.png"
            ></Chevron>
          </SelectToken>
        </InputContainer>
        <TokenList className={!visibility && "hide"}>
          {optionsToMap.map((item, index) => (
            <li
              className="token-option option-padding d-flex align-items-center justify-content-start"
              key={index}
              onClick={() => {
                setIcon(item.icon);
                handleOnAssetSelect(item.token);
                setDeposit(item.token);
                setVisibility(!visibility);
              }}
            >
              <img className="vertical-center" src={item.icon}></img>
              <header>{item.token}</header>
            </li>
          ))}
        </TokenList>
      </SelectContainer>
      <StatsContainer className="gage-stats">
        <div className="d-flex align-items-center justify-content-around">
          <div>
            <div className="d-flex align-center justify-content-center">
              <h2>Bonus (%)</h2>
              <Tooltip
                text={
                  "The percentage of Eternal's liquidity rewards and deposit you gain on top of your deposit/rewards if the gage closes in your favor."
                }
              ></Tooltip>
            </div>
            <p className="text-center">{gageBonusPercentage == null ? '' : `${gageBonusPercentage}%`}</p>
          </div>
          <div>
            <div className="d-flex align-center justify-content-center">
              <h2>Risk (%)</h2>
              <Tooltip
                text={
                  "The net loss you would incur if the gage closed in favor of Eternal."
                }
              ></Tooltip>
            </div>
            <p className="text-center">{(gageRiskPercentage == null ? '' : `${gageRiskPercentage - gageBonusPercentage}%`)}</p>
          </div>
          <div>
            <div className="d-flex align-center justify-content-center">
              <h2>Condition</h2>
              <Tooltip
                text={
                  "The percent by which the ETRNL supply must decrease before the gage closes in your favor."
                }
              ></Tooltip>
            </div>
            <p className="text-center">{gageCondition == null ? '' : `${gageCondition}%`}</p>
          </div>
        </div>
      </StatsContainer>
      <RewardsContainer>
        <div className="d-flex align-center justify-content-center">
          <h2>Instant Reward</h2>
          <Tooltip
            text={
              "The amount of ETRNL you instantly receive upon entering the gage."
            }
          ></Tooltip>
        </div>
        <RewardsBlock>
          <Amount>{amount == "0" || amount == "" ? "0.0" : depositInETRNL}</Amount>
          <SelectToken style={{ cursor: "auto" }}>
            <TokenIcon src="img/etrnl.png"></TokenIcon>
            <TokenName>ETRNL</TokenName>
          </SelectToken>
        </RewardsBlock>
      </RewardsContainer>
      <Box className="col-sm-12 my-5 text-center">
        {(deposit == "Select" || amount == '0.0' || amount == '' || amount == '0') ?
          <ConfirmButton disabled={true} text={'Confirm'}></ConfirmButton>
        :
          ( (approval)  ?
            <ConfirmButton 
            handleClick={async () => {
              const result = await handleClickOnConfirmBtn(2);
              return result
            }} 
            disabled={false} 
            delay={true}
            text={'Confirm'}></ConfirmButton>
          :
            <ConfirmButton 
            handleClick={async () => {
              let result;
              try {
                result = await handleClickOnApproveBtn('treasury');
              }
              catch {
                return false;
              }
              return result;
            }} 
            success={() => dispatch(changeApproval({ approval: true }))}
            message={'Approval successful!'}
            disabled={false} 
            delay={true}
            text={'Approve'}></ConfirmButton>
          )
        }
      </Box>
    </SelectBackground>
  );
}

export default CreateLiquidGage;
