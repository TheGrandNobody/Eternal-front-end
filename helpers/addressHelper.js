import { Addresses } from '../constant/constants';
export const getAddress = (address) => {
  // const chainId = 97;
  const chainId = 4;

  return address[chainId];
};

export const getEternalPlatformAddress = () => {
  return getAddress(Addresses.eternalPlatform);
};
