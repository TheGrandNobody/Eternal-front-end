import { api } from '../constant/constants';

export const getUserData = async (account) => {
  return api.get(`getUserStatus/${account}`);
};

export const createGage = async (amount, riskType, riskPercentage, gageId, ownedByAddress) => {
  return api.post('register-user-gage', { amount, riskType, riskPercentage, gageId, ownedByAddress });
};

export const findExistingGage = async (amount, riskType, riskPercentage, status) => {
  return api.post('find-gage', { amount, riskType, riskPercentage, status });
};

export const findAndUpdateGageAddress = async (gageId, gageAddress, account) => {
  return api.post('findAndUpdateGageAddress', { gageId, gageAddress, account });
};
