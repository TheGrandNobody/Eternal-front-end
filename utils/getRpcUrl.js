import random from 'lodash/random';

export const nodes = ['https://rinkeby.infura.io/v3/ec993d7b098c43e99c9a0fae4cb7b109'];

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getNodeUrl;
