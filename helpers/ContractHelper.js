import { getAddress, getABI} from '../helpers/addressHelper';
import { Contract } from '@ethersproject/contracts';

export function getContract(entity, ABI, library, account) {
  return new Contract(getAddress(entity), getABI(ABI), getProviderOrSigner(library, account));
}

export const getGage = async (ABI, library, account, id) => {
  const storage = useContract('storage', 'storage', library, account);
  const address = await storage.getAddress(Web3.utils.soliditySha3(getAddress('factory')), Web3.utils.soliditySha3('gages', id));
  return getContract(address, getABI(ABI), library, account);
};

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
