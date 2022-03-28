import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "../ToolTip/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { Typography, Grid, Box, CircularProgress, Stack } from "@mui/material";
import { toNumber } from "lodash";
import ConfirmButton from "../Buttons/ConfirmButton";
import useStore from '../../store/useStore';
import shallow from "zustand/shallow";

const IGOSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: blueGrey[100],
    "&:hover": {
      backgroundColor: alpha(blueGrey[500], 0.2),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: blueGrey[100],
  },
}));

const SelectBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  justify-content: center;
  position: relative;
  border-top: 7.5px groove #e6e6fa;
  border-bottom: 7.5px ridge #e6e6fa;
  margin-bottom: 20px;
  @media (min-width: 1200px) and (max-width: 2160px) {
    min-width: 450px;
  }
  @media (min-width: 800px) and (max-width: 1200px) {
    min-width: 350px;
  }
`;

const SmallBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  justify-content: center;
  position: relative;
  border-top: 5px groove #e6e6fa;
  border-bottom: 5px ridge #e6e6fa;
  @media (min-width: 800px) and (max-width: 1200px) {
    min-width: 250px;
  }
  @media (max-width: 800px) {
    max-width: 300px
  }
`;

const SmallLongBackground = styled.div`
  background-color: #bbabe34d;
  border-radius: 16px;
  justify-content: center;
  position: relative;
  border-top: 5px groove #e6e6fa;
  border-bottom: 5px ridge #e6e6fa;
  @media (min-width: 900px) and (max-width: 1000px) {
    min-width: 250px;
    right: 55%;
  }
  @media (max-width: 900px) {
    max-width: 350px
  }
`;

const SelectHeader = styled.p`
  font-weight: 550;
  padding-top: 3.75%;
  font-size: 12px;
  @media (min-width: 360px) {
    font-size: clamp(2rem, 3.5vmin, 3rem);
  }
`;

const SmallHeader = styled.p`
  font-weight: 550;
  border-bottom: 3.5px ridge #e6e6fa;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  font-size: 10px;
  @media (min-width: 360px) {
    font-size: clamp(1.5rem, 3vmin, 2.5rem);
  }
`;

const StatText = styled.p`
  color: #fff;
  font-weight: 550;
  font-size: 6px;
  @media (min-width: 360px) {
    font-size: clamp(0.8rem, 2vmin, 1.75rem);
  }
`;

const StatTitle = styled.h2`
  padding-top: 2.5%;
  color: rgba(255, 255, 255, 0.70);
  font-size: 8px;
  @media (min-width: 360px) {
    font-size: clamp(1rem, 2.25vmin, 2rem);
  }
`;

const RateText = styled.p`
  color: rgba(255, 255, 255, 0.70);
  font-size: 8px;
  @media (min-width: 360px) {
    font-size: clamp(0.75rem, 2vmin, 1.75rem);
  }
`;

const CountdownText = styled.p`
  font-weight: 550;
  font-size: 6px;
  @media (min-width: 360px) {
    font-size: clamp(0.5rem, 1.25vmin, 1.5rem);
  }
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
  min-height: 40px;
`;

const SelectToken = styled.div`
  width: 15%;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #bbabe3;
  }
`;

const TokenIcon = styled.img`
  width: 50%;
  position: relative;
  right: 30%;
  max-width: 40px;
`;

const TokenName = styled.header`
  position: relative;
  font-weight: 535;
  right: 15%;
  transition: color 0.25s;
  @media (min-width: 360px) {
    font-size: clamp(1rem, 2vmin, 2rem);
  }
`;

const SelectContainer = styled.div`
  height: 10%;
  margin: 0 auto;
`;

const TokenList = styled.ul`
  width: 15%;
  background: #30083b;
  border-radius: 6px;
  margin-left: 65%;
  padding-left: 0;
  z-index: 100;
  position: absolute;
  top: 30%;
`;

const Chevron = styled.img`
  position: relative;
  left: 2.5%;
  width: 12.5%;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(72deg) brightness(111%)
    contrast(103%);
  transition: transform 0.4s;
`;

const RewardsContainer = styled.div`
  height: 15%;
`;

const RewardsBlock = styled.div`
  margin: 0 auto;
  width: 60%;
  background: hsl(287, 76%, 13%);
  border: 5px solid hsl(287, 90%, 13%);
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  min-height: 40px;
`;

const Amount = styled.div`
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
  font-size: 12px;
  @media (min-width: 360px) {
  font-size: clamp(1rem, 2.5vmin, 2.5rem);
  }
`;

const RewardsText = styled.h2`
  @media (max-width: 2160px) {
    font-size: clamp(1.75rem, 2.25vmin, 2.5rem);
  }
  @media (min-width: 2160px) {
    font-size: clamp(2.5rem, 2.5vmin, 3.25rem);
  }
`;

function InitialGageOffering({
  optionsToMap,
  handleClickOnApproveBtn,
  handleClickOnConfirmBtn,
  handleOnAssetSelect,
  handleOnAmountSelect,
  handleConversionToETRNL,
  handlePercents,
  offeringStats,
  account,
  library
}) {
  const [deposit, setDeposit] = useState("Select");
  const [icon, setIcon] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [amount, setAmount] = useState("0.0");
  const [period, setPeriod] = useState(false);
  const [offering, setIGO] = useState("Gage");
  const [totalContribution, setTotalContribution] = useState('');
  const [liquidityDeposited, setLiquidityDeposited] = useState('');
  const [liquidityGaged, setLiquidityGaged] = useState('');
  const [remainingETRNL, setRemainingETRNL] = useState('');
  const [priceAVAX, setpriceAVAX] = useState('');
  const [priceUSDC, setpriceUSDC] = useState('');

  const { setApproval, approval, risk, bonus, condition, depositInETRNL } = useStore(state => ({
    setApproval: state.setApproval,
    reset: state.reset,
    approval: state.approval,
    risk: state.risk,
    bonus: state.bonus,
    condition: state.condition,
    depositInETRNL: state.depositInETRNL,
  }), shallow);
  
  useEffect( () => {
    if (library && account) {
      refreshStats();
    }
  }, [account, library]);

  useEffect(async () => {
    if (library) {
      await handleConversionToETRNL(toNumber(amount) > 0 && deposit != 'Select', offering == 'Gage', 0);
    }
  }, [amount, offering]);

  useEffect(() => {
    if (deposit != 'Select' && library) {
      if (offering == 'Gage') {
        (async () => {
          const bonusPercentage = await handlePercents(true);
          handleConversionToETRNL(toNumber(amount) > 0, true, bonusPercentage);
        })();
      } else {
        handleConversionToETRNL(toNumber(amount) > 0, false, 0);
      }
    }
  }, [deposit, library]);

  const refreshStats = async () => {
    const {
      totalContribution, 
      liquidityDeposited,
      liquidityGaged,
      remainingETRNL,
      priceAVAX,
      priceUSDCe,
    } = await offeringStats();

    setTotalContribution(totalContribution);
    setLiquidityDeposited(liquidityDeposited);
    setLiquidityGaged(liquidityGaged);
    setRemainingETRNL(remainingETRNL);
    setpriceAVAX(priceAVAX);
    setpriceUSDC(priceUSDCe);
  }

  const handleChange = (event) => {
    setPeriod(/\./.test(event.target.value));
    setAmount(event.target.value);
    handleOnAmountSelect(event.target.value);
  };

  const handleKeyPress = (event) => {
    if ((period && !/[0-9]/.test(event.key)) || !/[0-9\.]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="container select-bg d-flex justify-content-center">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          <SmallLongBackground className="container">
            <SmallHeader className="text-center">Your stats</SmallHeader>
            <Stack spacing={1}>
              <Stack className="align-center">
                <Box className="d-flex">
                  <StatTitle>Total Contribution</StatTitle>
                  <Tooltip
                    text={
                      "The total amount of ETRNL used in your USDC.e/AVAX contributions to gages or simple deposits."
                    }
                  ></Tooltip>
                </Box>
                {totalContribution == '' ? 
                  <CircularProgress color='inherit' size={15} />
                :
                  <StatText className="text-center">
                    {`${totalContribution} ETRNL`}
                  </StatText>
                }
              </Stack>
              <Stack className="align-center">
                <Box className="d-flex">
                  <StatTitle>Amount Gaged</StatTitle>
                  <Tooltip
                    text={
                      "The total amount of ETRNL used in your USDC.e/AVAX contributions with loyalty gages."
                    }
                  ></Tooltip>
                </Box>
                {liquidityGaged == '' ? 
                  <CircularProgress color='inherit' size={15} />
                :
                  <StatText className="text-center">
                    {`${liquidityGaged} ETRNL`}
                  </StatText>
                }
              </Stack>
              <Stack className="align-center">
                <Box className="d-flex">
                  <StatTitle>Amount Deposited</StatTitle>
                  <Tooltip
                    text={
                      "The total amount of ETRNL you have sent to liquidity pairs as a result of depositing USDC.e or AVAX."
                    }
                  ></Tooltip>
                </Box>
                {liquidityDeposited == '' ? 
                  <CircularProgress color='inherit' style={{marginBottom: '7.5%'}} size={15} />
                :
                  <StatText className="text-center">
                    {`${liquidityDeposited} ETRNL`}
                  </StatText>
                }
              </Stack>
            </Stack>
          </SmallLongBackground>
        </Grid>
        <Grid item md={6} xs={12}>
          <SelectBackground className="center-sec">
            <FormControlLabel
              className="position-absolute"
              style={{ right: "1%", top: "1%" }}
              sx={{ width: "5%", height: "5%", minHeight: 2, minWidth: 2 }}
              control={
                <IGOSwitch
                  defaultChecked
                  onClick={() => {
                    setIGO(offering === "Gage" ? "Deposit" : "Gage");
                  }}
                />
              }
              label={
                <Typography
                  fontSize={"calc(0.7rem + 0.5vmin)"}
                  color={"#ffff"}
                  fontWeight={450}
                >
                  {offering}
                </Typography>
              }
              labelPlacement="bottom"
            />
            {offering === "Deposit" ? (
              <>
              <Stack spacing={16} sx={{marginBottom: '4.5%'}}>
                <Box>
                  <div className="d-flex align-items-center justify-content-center">
                    <SelectHeader>Select a deposit</SelectHeader>
                    <Tooltip
                      text={
                        "Deposit USDC.e or AVAX and get ETRNL in return. The deposit will be automatically added to its corresponding ETRNL liquidity pair's reserves."
                      }
                    ></Tooltip>
                  </div>
                  <SelectContainer>
                    <InputContainer
                      className="input-container"
                      style={{ height: "125%" }}
                    >
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
                        <TokenName className={visibility && "hover"}>
                          {deposit}
                        </TokenName>
                        <Chevron
                          className={visibility && "rotate"}
                          src="img/down.png"
                        ></Chevron>
                      </SelectToken>
                    </InputContainer>
                    <TokenList className={!visibility && "hide"}>
                      {optionsToMap.map((item, index) => (
                        <li
                          className="token-option igo-option-padding  d-flex align-items-center justify-content-start"
                          key={index}
                          onClick={() => {
                            setDeposit(item.token);
                            setIcon(item.icon);
                            setVisibility(!visibility);
                            handleOnAssetSelect(item.token);
                          }}
                        >
                          <img className="vertical-center" src={item.icon}></img>
                          <header>{item.token}</header>
                        </li>
                      ))}
                    </TokenList>
                  </SelectContainer>
                </Box>
                <RewardsContainer>
                  <div className="d-flex justify-content-center">
                    <RewardsText>You get</RewardsText>
                    <Tooltip
                      text={
                        "The amount of ETRNL you receive in return for your deposit."
                      }
                    ></Tooltip>
                  </div>
                  <RewardsBlock>
                    <Amount>
                      {amount == "0" || amount == "" ? "0.0" : depositInETRNL}
                    </Amount>
                    <SelectToken style={{ cursor: "auto" }}>
                      <TokenIcon src="img/etrnl.png"></TokenIcon>
                      <TokenName>ETRNL</TokenName>
                    </SelectToken>
                  </RewardsBlock>
                </RewardsContainer>
              </Stack>
              </>
            ) : (
              <>
                <Stack spacing={5} sx={{marginBottom: "4.5%"}}>
                  <Stack spacing={5}>
                    <Box>
                      <div className="d-flex align-items-center justify-content-center">
                        <SelectHeader>Select a deposit</SelectHeader>
                        <Tooltip
                          text={
                            "The deposit is the asset you provide to the loyalty gage. You can withdraw it whenever you want."
                          }
                        ></Tooltip>
                      </div>
                      <SelectContainer>
                        <InputContainer
                          className="input-container"
                          style={{ height: "102.5%" }}
                        >
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
                            <TokenName className={visibility && "hover"}>
                              {deposit}
                            </TokenName>
                            <Chevron
                              className={visibility && "rotate"}
                              src="img/down.png"
                            ></Chevron>
                          </SelectToken>
                        </InputContainer>
                        <TokenList className={!visibility && "hide"}>
                          {optionsToMap.map((item, index) => (
                            <li
                              className="token-option igo-option-padding d-flex align-items-center justify-content-start"
                              key={index}
                              onClick={() => {
                                setDeposit(item.token);
                                setIcon(item.icon);
                                setVisibility(!visibility);
                                handleOnAssetSelect(item.token);
                              }}
                            >
                              <img className="vertical-center" src={item.icon}></img>
                              <header>{item.token}</header>
                            </li>
                          ))}
                        </TokenList>
                      </SelectContainer>
                    </Box>
                    <div className="stake-stats">
                      <div className="d-flex align-items-center justify-content-around">
                        <div>
                          <div className="d-flex justify-content-center">
                            <h2 style={{paddingTop: '2.5%'}}>Bonus (%)</h2>
                            <Tooltip
                              text={
                                "The additional percentage of your deposit you gain if the gage closes in your favor."
                              }
                            ></Tooltip>
                          </div>
                          <p className="text-center">
                            {bonus == null ? '' : `${bonus}%`}
                          </p>
                        </div>
                        <div>
                          <div className="d-flex justify-content-center">
                              <h2 style={{paddingTop: '2.5%'}}>Risk (%)</h2>
                              <Tooltip
                                text={
                                  "The net loss you would incur if the gage closed in favor of Eternal."
                                }
                              ></Tooltip>
                          </div>
                          <p className="text-center">
                            {(risk == null ? '' : `${risk - bonus}%`)}
                          </p>
                        </div>
                        <div>
                          <div className="d-flex justify-content-center">
                            <h2 style={{paddingTop: '2.5%'}}>Condition</h2>
                            <Tooltip
                              text={
                                "The percentage by which the ETRNL supply must decrease before the gage closes in your favor."
                              }
                            ></Tooltip>
                          </div>
                          <p className="text-center">
                            {condition == null ? '' : `${condition}%`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Stack>
                  <RewardsContainer>
                    <div className="d-flex justify-content-center">
                      <RewardsText>Instant Reward</RewardsText>
                      <Tooltip
                        text={
                          "The amount of ETRNL you instantly receive upon entering the loyalty gage."
                        }
                      ></Tooltip>
                    </div>
                    <RewardsBlock>
                      <Amount>
                        {amount == "0" || amount == "" ? "0.0" : depositInETRNL}
                      </Amount>
                      <SelectToken style={{ cursor: "auto" }}>
                        <TokenIcon style={{width: '50.4%'}} src="img/etrnl.png"></TokenIcon>
                        <TokenName>ETRNL</TokenName>
                      </SelectToken>
                    </RewardsBlock>
                  </RewardsContainer>
                </Stack>
              </>
            )}
            <Box className="text-center" sx={{ pb: 3 }}>
              {(deposit == "Select" || amount <= 0) ?
                  <ConfirmButton disabled={true} text={'Confirm'}></ConfirmButton>
                :
                  ( (approval)  ?
                  <ConfirmButton 
                    handleClick={async () => {
                      const result = await handleClickOnConfirmBtn(offering == 'Gage' ? 3 : 1);
                      return result;
                    }} 
                    refresh={refreshStats} 
                    message={offering == 'Gage' ? '' : 'Deposit succesful!'}
                    disabled={false} 
                    delay={true}
                    text={'Confirm'}></ConfirmButton>
                  :
                    <ConfirmButton 
                    handleClick={async () => {
                      let result;
                      try {
                        result = await handleClickOnApproveBtn('offering');
                      }
                      catch {
                        return false;
                      }
                      return result;
                    }} 
                    success={() => setApproval(true)}
                    message={'Approval successful!'}
                    disabled={false} 
                    delay={true}
                    text={'Approve'}></ConfirmButton>
                  )}
            </Box>
          </SelectBackground>
        </Grid>
        <Grid item md={3} xs={12}>
          <SmallBackground className="text-center container">
            <SmallHeader>IGO Info</SmallHeader>
            {remainingETRNL == '' || priceAVAX == '' || priceUSDC == '' ?
              <Box sx={{ color: '#d8bfd8' }}>
                <CircularProgress color='inherit' style={{ marginBottom: "5%"}} className="align-center" size={30}/>
              </Box>
            :
              <Stack>
                <RateText>
                  1 ETRNL = {priceAVAX} AVAX
                </RateText>
                <RateText>
                  1 ETRNL = {priceUSDC} USDC.e
                </RateText>
                <CountdownText>
                  {remainingETRNL} ETRNL left before gaging bonus decreases
                </CountdownText>
              </Stack>
            }
          </SmallBackground>
        </Grid>
      </Grid>
    </div>
  );
}

export default InitialGageOffering;
