import { toNumber } from "lodash";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ConfirmButton from "../Buttons/ConfirmButton";
import Tooltip from "../ToolTip/Tooltip";
import useStore from '../../store/useStore';
import shallow from "zustand/shallow";
import { Grid } from "@mui/material";

const SelectBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  justify-content: center;
  margin: 0 auto;
  max-width: 698px;
  border-top: 7.5px groove #e6e6fa;
  border-bottom: 7.5px ridge #e6e6fa;
  margin-bottom: 30px;
  @media (min-width: 2160px) {
    max-width: 1344px;
  }
`;

const SelectHeader = styled.p`
  padding-top: 2.5%;
  font-weight: 550;
  font-size: 16px;
  @media (min-width: 360px) {
    font-size: clamp(2rem, 3vmin, 3.5rem);
  }
`;

const InputContainer = styled.div`
  height: 60%;
  min-height: 45px;
  background: hsl(287, 76%, 13%);
  border: 5px solid hsl(287, 90%, 13%);
  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 65%;
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
  width: 42.5%;
  position: relative;
  right: 30%;
`;

const TokenName = styled.header`
  position: relative;
  font-weight: 525;
  right: 15%;
  transition: color 0.25s;
  font-size: 16px;
  @media (min-width: 360px) {
    font-size: clamp(0.75rem, 2vmin, 2rem);
  }
`;

const TokenList = styled.ul`
  width: 15%;
  margin-left: 67.5%;
  margin-top: -7.5%;
  top: 80%;
  background: #30083b;
  border-radius: 6px;
  padding-left: 0;
  z-index: 100;
  position: relative;
  @media (max-width: 768px) {
    top: 55%;
  }
`;

const Chevron = styled.img`
  position: relative;
  left: 2.5%;
  width: 12.5%;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(72deg) brightness(111%)
    contrast(103%);
  transition: transform 0.4s;
`;

const RewardsBlock = styled.div`
  height: 125%;
  margin: 0 auto;
  width: 65%;
  background: hsl(287, 76%, 13%);
  border: 5px solid hsl(287, 90%, 13%);
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  min-height: 40px;
`;

const RewardsText = styled.h2`
  @media (max-width: 2160px) {
    font-size: clamp(1.75rem, 2.25vmin, 2.5rem);
  }
  @media (min-width: 2160px) {
    font-size: clamp(2.5rem, 2.25vmin, 3.25rem);
  }
`;

const Amount = styled.div`
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
  font-size: 16px;
  @media (min-width: 360px) {
    font-size: clamp(0.5rem, 2.5vmin, 2.5rem);
  }
`;

function CreateLiquidGage({
  optionsToMap,
  handleClickOnApproveBtn,
  handleClickOnConfirmBtn,
  handleOnAssetSelect,
  handleOnAmountSelect,
  handleConversionToETRNL,
  handlePercents,
  library
}) {
  const [deposit, setDeposit] = useState('Select');
  const [icon, setIcon] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [amount, setAmount] = useState('0.0');
  const [period, setPeriod] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { setApproval, approval, risk, bonus, condition, depositInETRNL } = useStore(state => ({
    setApproval: state.setApproval,
    approval: state.approval,
    risk: state.risk,
    bonus: state.bonus,
    condition: state.condition,
    depositInETRNL: state.depositInETRNL,
  }), shallow);

  useEffect(async () => {
    await handleConversionToETRNL(toNumber(amount) > 0 && deposit != 'Select', true, 0);
  }, [amount, loaded]);

  useEffect(() => {
    if (deposit != 'Select' && library) {
      (async () => {
        const bonusPercentage = await handlePercents(false);
        await handleConversionToETRNL(toNumber(amount) > 0, true, bonusPercentage);
        setLoaded(true);
      })();
    }
  }, [deposit, library]);

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
      <Grid container direction={'column'} justifyContent={'space-around'} rowSpacing={8}>
        <Grid container item xs={12}>
          <Grid className="d-flex align-items-center justify-content-center" item xs={12}>
              <SelectHeader>Select a deposit</SelectHeader>
              <Tooltip
                text={
                  "The deposit is the asset you add to the gage to provide liquidity to an ETRNL pair. You can withdraw it whenever you want."
                }
              ></Tooltip>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
        <Grid xs={12} item container direction={'row'} alignItems={"center"} justifyContent={"space-around"} className="gage-stats">
            <Grid item xs={4}>
              <div className="d-flex align-center justify-content-center">
                <h2>Bonus (%)</h2>
                <Tooltip
                  text={
                    "The percentage of Eternal's liquidity rewards and deposit you gain on top of your deposit/rewards if the gage closes in your favor."
                  }
                ></Tooltip>
              </div>
              <p className="text-center">{bonus == null ? '' : `${bonus}%`}</p>
            </Grid>
            <Grid item xs={4}>
              <div className="d-flex align-center justify-content-center">
                <h2>Risk (%)</h2>
                <Tooltip
                  text={
                    "The net loss you would incur if the gage closed in favor of Eternal."
                  }
                ></Tooltip>
              </div>
              <p className="text-center">{(risk == null ? '' : `${risk - bonus}%`)}</p>
            </Grid>
            <Grid item xs={4}>
              <div className="d-flex align-center justify-content-center">
                <h2>Condition</h2>
                <Tooltip
                  text={
                    "The percent by which the ETRNL supply must decrease before the gage closes in your favor."
                  }
                ></Tooltip>
              </div>
              <p className="text-center">{condition == null ? '' : `${condition}%`}</p>
            </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} className="d-flex align-center justify-content-center">
            <RewardsText>Instant Reward</RewardsText>
            <Tooltip
              text={
                "The amount of ETRNL you instantly receive upon entering the gage."
              }
            ></Tooltip>
          </Grid>
          <Grid container item xs={12} rowSpacing={5} justifyContent={"space-around"}>
            <Grid item xs={12}>
              <RewardsBlock>
                <Amount>{amount == "0" || amount == "" ? "0.0" : depositInETRNL}</Amount>
                <SelectToken style={{ cursor: "auto" }}>
                  <TokenIcon src="img/etrnl.png"></TokenIcon>
                  <TokenName>ETRNL</TokenName>
                </SelectToken>
              </RewardsBlock>
            </Grid>
            <Grid item xs={12} className={"text-center"}>
              {(deposit == "Select" || amount == '0.0' || amount == '' || amount == '0') ?
                <ConfirmButton larger disabled={true} text={'Confirm'}></ConfirmButton>
                :
                ((approval) ?
                  <ConfirmButton
                    handleClick={async () => {
                      const result = await handleClickOnConfirmBtn(2);
                      return result
                    }}
                    larger
                    disabled={false}
                    delay={true}
                    text={'Confirm'}></ConfirmButton>
                  :
                  <ConfirmButton
                    handleClick={async () => {
                      let result;
                      try {
                        result = await handleClickOnApproveBtn('factory');
                      }
                      catch {
                        return false;
                      }
                      return result;
                    }}
                    success={() => setApproval(true)}
                    message={'Approval successful!'}
                    larger
                    disabled={false}
                    delay={true}
                    text={'Approve'}></ConfirmButton>
                )
              }
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </SelectBackground>
  );
}

export default CreateLiquidGage;
