import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gageType: null,
  loadedContracts: {},
  gageDepositAmount: null,
  gageAsset: null,
  gageRiskPercentage: null,
  gageBonusPercentage: null,
  gageCondition: null,
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
    changeGageBonusPercentage: (state, action) => {
      state.gageBonusPercentage = action.payload.bonusPercentage;
    },
    changeGageCondition: (state, action) => {
      state.gageCondition = action.payload.condition;
    },
    changeGageDepositAmount: (state, action) => {
      state.gageDepositAmount = action.payload.depositAmount;
    },
    changeGageAsset: (state, action) => {
      state.gageAsset = action.payload.asset;
    },
    changeLoadedContracts: (state, action) => {
      state.loadedContracts = action.payload.loadedContracts;
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
      state.gageBonusPercentage = null;
      state.gageCondition = null;
      state.gageAsset = null;
      state.approval = false;
      state.selectedGage = null;
    },
  },
});

export const {
  changeGageType,
  changeGageRiskPercentage,
  changeGageBonusPercentage,
  changeGageCondition,
  changeGageAsset,
  changeApproval,
  changeGageDepositAmount,
  changeLoadedContracts,
  changeAllowedToChangeGage,
  changeSelectedGage,
  reset,
} = eternalSlice.actions;

export default eternalSlice.reducer;
