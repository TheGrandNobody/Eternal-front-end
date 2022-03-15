import { connectorsByName } from "../constant/constants";

const createWalletSlice = (set, get) => ({
    hooks: connectorsByName['MetaMask'][1],
    connector: connectorsByName['MetaMask'][0],
    visible: false,
    current: undefined,
    setHook: (newHooks) => {
        set({ hooks: newHooks });
    },
    setConnector: (newConnector) => {
        set({ connector: newConnector });
    },
    setVisible: (value = false) => {
        set({ visible: value });
    },
    setCurrent: (value) => {
        set({ current: value });
    }
});

export default createWalletSlice;