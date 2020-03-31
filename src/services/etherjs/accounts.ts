import { ethers } from "ethers";

// Wrap provider.listAccounts in a Promise
export const getAccounts = (provider: ethers.providers.JsonRpcProvider) =>
  new Promise((resolve, reject) => {
    provider
      .listAccounts()
      .then((accounts) => resolve(accounts))
      .catch((error) => reject(error));
  });

export default getAccounts;
