import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gageType: null,
  loadedContracts: {},
  gageDepositAmount: null,
  gageRiskPercentage: null,
  gageRiskType: null,
  gageAddress: null,
  approval: false,
  selectedGage: null,
  allowedToCreateGage: false,
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
    changeSelectedGage: (state, action) => {
      if (state.selectedGage === action.payload.selectedGage) {
        state.selectedGage = null;
        return;
      }
      state.selectedGage = action.payload.selectedGage;
    },
    changeAllowedToChangeGage: (state, action) => {
      state.allowedToCreateGage = action.payload.permission;
    },
    reset: (state) => {
      state.gageType = null;
      state.loadedContracts = {};
      state.gageDepositAmount = null;
      state.gageRiskPercentage = null;
      state.gageRiskType = null;
      state.gageAddress = null;
      state.approval = false;
      state.selectedGage = null;
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
  changeAllowedToChangeGage,
  changeSelectedGage,
  reset,
} = eternalSlice.actions;

export default eternalSlice.reducer;
