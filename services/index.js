import { api } from '../constant/constants';

export const getUserData = async (account) => {
  return api.get(`getUserStatus/${account}`);
};

export const createGage = async (gageType, gageAddress, amount, riskType, riskPercentage, gageId, ownedByAddress) => {
  return api.post('register-user-gage', { gageType, gageAddress, amount, riskType, riskPercentage, gageId, ownedByAddress });
};

export const findExistingGage = async (gageType, amount, riskType, riskPercentage, status) => {
  return api.post('find-gage', { gageType, amount, riskType, riskPercentage, status });
};

export const findAndUpdateGageAddress = async (gageId, gageAddress, account) => {
  return api.post('findAndUpdateGageAddress', { gageId, gageAddress, account });
};

export const getAllGagesAddresses = async (account) => {
  return api.get(`getAllGagesAddresses/${account}?page=1&limit=10`);
};

export const findAndUpdateGageStatus = async (id, status) => {
  return api.post('findAndUpdateGageStatus', { id: id, status: status });
};

export const addUserAddressToGage = async (gageId, userAddress) => {
  return api.post('addUserToGage', { gageId, userAddress });
};

export const getGagesAccordingToStatus = async (account, status) => {
  return api.get(`getAllGages/${account}/${status}?page=1&limit=10`);
};

export const createUserApprovalStatus = async (account, status) => {
  return api.post('createUserApprovalStatus', { account, status });
};

export const getUserApprovalStatus = async (account) => {
  return api.get(`findUserApprovalStatus/${account}`, { account });
};
