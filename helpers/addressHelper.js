import { addresses, abis } from '../constant/constants';

export const getAddress = (entity) => {
  if (window.ethereum && window.ethereum.on) {
    const web3 = new Web3(window.ethereum);
    const id = await web3.eth.net.getId();
    return addresses[entity][id];
  }
  return addresses[entity][43114];
};

export const getABI = (entity) => {
  return abis[entity];
}
