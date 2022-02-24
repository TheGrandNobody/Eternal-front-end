import { api } from '../constant/constants';

export const getUserData = async (account) => {
  return api.get(`getUserStatus/${account}`);
};

export const createGage = async (id, type, receiver, deposit) => {
  return api.post('register-user-gage', { id, type, receiver, deposit });
};

export const findExistingGage = async (type, receiver, deposit) => {
  return api.post('find-gage', { type, receiver, deposit});
};

export const getAllGageIDs = async (account) => {
  return api.get(`getAllGagesAddresses/${account}?page=1&limit=10`);
};

export const findAndUpdateGageStatus = async (id, status) => {
  return api.post('findAndUpdateGageStatus', { id: id, status: status });
};

export const getGagesAccordingToStatus = async (account, status, limit, currentPage) => {
  return api.get(`getAllGages/${account}/${status}?page=${currentPage}&limit=${limit}`);
};
