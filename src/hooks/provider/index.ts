import { useCallback, useMemo } from "react";
import { useEthereumTransactionState, TransactionStateStatus } from "../helpers";
import { ethers, providers } from "ethers";

import { getLogger } from "../../utils/logger";
const { trace, error } = getLogger("hook:etherjs:provider");

interface Ethereum extends providers.Web3Provider {
  enable: () => void;
}

declare global {
  interface Window {
    ethereum: Ethereum;
    web3: {
      currentProvider: providers.Web3Provider;
    };
  }
}

type GetProvider = { web3Provider: providers.Web3Provider; signer: ethers.Signer };

export const useProvider = () => {
  const [state, dispatch] = useEthereumTransactionState();
  const setDispatchCallback = useCallback(dispatch, []);

  const getProvider = () => {
    try {
      setDispatchCallback({ type: TransactionStateStatus.LOADING });
      const { ethereum, web3 } = window;
      const alreadyInjected = typeof ethereum !== "undefined" || typeof web3 !== "undefined";

      if (!alreadyInjected) throw new Error("Metamask cannot be found");
      const web3Provider = new ethers.providers.Web3Provider(ethereum || web3.currentProvider);
      const signer = web3Provider.getSigner();
      trace(`provider is ${web3Provider} and signer is ${signer}`);
      setDispatchCallback({ type: TransactionStateStatus.SUCCESS });
      return { web3Provider, signer };
    } catch (e) {
      error(`Error in metamask : ${e}`);
      setDispatchCallback({ type: TransactionStateStatus.ERROR, message: e.message });
    }
  };

  const provider = useMemo<GetProvider | undefined>(getProvider, [window.ethereum]);
  return { state, web3Provider: provider?.web3Provider, signer: provider?.signer };
};
