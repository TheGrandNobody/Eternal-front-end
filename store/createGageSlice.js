const createGageSlice = (set, get) => ({
  type: null,
  loadedContracts: {},
  amount: null,
  asset: 'AVAX',
  risk: null,
  bonus: null,
  condition: null,
  approval: false,
  selectedGage: null,
  depositInETRNL: '0.0',
  setType: (value) => {
    set({ type: value });
  },
  setContracts: (value) => {
    set({ loadedContracts: value });
  },
  setAmount: (value) => {
    set({ amount: value });
  },
  setAsset: (value) => {
    set({ asset: value });
  },
  setRisk: (value) => {
    set({ risk: value });
  },
  setBonus: (value) => {
    set({ bonus: value });
  },
  setCondition: (value) => {
    set({ condition: value });
  },
  setApproval: (value) => {
    set({ approval: value });
  },
  setSelected: (value) => {
    if (get().selectedGage === value) {
      set({ selectedGage: null });
      return;
    }
    set({ selectedGage: value });
  },
  setDepositInETRNL: (value) => {
    set({ depositInETRNL: value });
  },
  reset: () => {
    set({   
      type: null,
      loadedContracts: {},
      amount: null,
      asset: 'AVAX',
      risk: null,
      bonus: null,
      condition: null,
      approval: false,
      selectedGage: null,
      depositInETRNL: '0.0', });
  }
});

export default createGageSlice;