import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gageType: null,
  loadedContracts: {},
  gageDepositAmount: null,
  gageRiskPercentage: null,
  gageRiskType: null,
  gageAddress: null,
  approval: false,
};

export const eternalSlice = createSlice({
  name: 'eternalSlice',
  initialState,
  reducers: {
    changeGageType: (state, action) => {
      state.gageType = action.payload.gageType;
    },
    changeGageRiskPercentage: (state, action) => {
      state.gageRiskPercentage = action.payload.riskPercentage;
    },
    changeGageRiskType: (state, action) => {
      state.gageRiskType = action.payload.riskType;
    },
    changeGageDepositAmount: (state, action) => {
      state.gageDepositAmount = action.payload.depositAmount;
    },
    changeLoadedContracts: (state, action) => {
      state.loadedContracts = action.payload.loadedContracts;
    },
    changeGageAddress: (state, action) => {
      state.gageAddress = action.payload.gageAddress;
    },
    changeApproval: (state, action) => {
      state.approval = action.payload.approval;
    },
  },
});

export const {
  changeGageType,
  changeGageRiskPercentage,
  changeGageRiskType,
  changeApproval,
  changeGageDepositAmount,
  changeLoadedContracts,
  changeGageAddress,
} = eternalSlice.actions;

export default eternalSlice.reducer;
