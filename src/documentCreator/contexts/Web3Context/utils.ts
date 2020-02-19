import { providers } from "ethers";
import { getLogger } from "../../logger";

const { trace } = getLogger("getWeb3FromEnvironment");

declare global {
  interface Window {
    ethereum: providers.Web3Provider;
    web3: {
      currentProvider: providers.Web3Provider;
    };
  }
}
export const getWeb3FromEnvironment = (): providers.BaseProvider | undefined => {
  if (window.ethereum) {
    trace(`Got web3 from window.ethereum`);
    return new providers.Web3Provider(window.ethereum);
  }
  if (window.web3) {
    trace(`Got web3 from window.web3.currentProvider`);
    return new providers.Web3Provider(window.web3.currentProvider);
  }
  trace(`Did not find web3 in Window`);
};
