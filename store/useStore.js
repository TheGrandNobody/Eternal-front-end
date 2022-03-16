import create from 'zustand';
import createWalletSlice from './createWalletSlice';
import createGageSlice from './createGageSlice';

const useStore = create((set, get) => ({
    ...createWalletSlice(set, get),
    ...createGageSlice(set, get)
}));

export default useStore;