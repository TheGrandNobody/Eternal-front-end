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

export const findAndUpdateGageStatus = async (id, status, winner) => {
  return api.post('findAndUpdateGageStatus', { id: id, status: status, winner: winner });
};

export const getGagesAccordingToStatus = async (account, status, limit, currentPage) => {
  return api.get(`getAllGages/${account}/${status}?page=${currentPage}&limit=${limit}`);
};
