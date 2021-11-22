import { injected } from '../connector/connector';
import { toWei, toGwei } from '../utils/utils';
import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000/api/' });

export const connectorsByName = {
  Injected: injected,
};

export const Addresses = {
  eternalPlatform: {
    4: '0xD61b6a50d9B15072bEd107FBbAD542EE93e2F068',
  },
};

export const TokenToBeAuctioned = 20000000;

export const AmountExpected = 200000;

export const Injected = 'Injected';

export const auctioningToken = '0x51a32114E3F759179B7EF6Aa41c8f5F1269D429D';

export const biddingToken = '0x28BDc4Ac5447376cE4394f6bf98D4ACeF3789D2F';

export const orderCancellationEndDate = '1633612393';

export const auctionEndDate = '1633612393';

export const auctionedSellAmount = toGwei(TokenToBeAuctioned);

export const _minBuyAmount = toWei(AmountExpected);

export const minimumBiddingAmountPerOrder = toWei(0);

export const minFundingThreshold = 0;

export const isAtomicClosureAllowed = false;

export const accessManagerContract = 0x0000000000000000000000000000000000000000;

export const accessManagerContractData = toWei(0);

export const connectorLocalStorageKey = 'web3Connection';
