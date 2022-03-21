import { connectorsByName } from "../constant/constants";

const createWalletSlice = (set, get) => ({
    first: true,
    hooks: connectorsByName['MetaMask'][1],
    connector: connectorsByName['MetaMask'][0],
    visible: false,
    current: undefined,
    force: false,
    setFirst: (value) => {
        set({ first: value });
    },
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
    },
    setForce: (value) => {
        set({ force: value });
    }
});

export default createWalletSlice;