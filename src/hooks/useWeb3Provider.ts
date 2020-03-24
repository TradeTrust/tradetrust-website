import { useMemo } from "react";
import { useEthereumTransactionState, TransactionStateStatus } from "./useEthereumTransactionState";
import { ethers, providers } from "ethers";

import { getLogger } from "../utils/logger";
const { trace, error } = getLogger("hook:etherjs:provider");

type GetProvider = { web3Provider: providers.Web3Provider; signer: ethers.Signer };

export const useWeb3Provider = () => {
  const [state, dispatch] = useEthereumTransactionState();

  const getProvider = () => {
    try {
      dispatch({ type: TransactionStateStatus.LOADING });
      const { ethereum, web3 } = window;
      const provider = ethereum || web3.currentProvider;

      if (!provider) throw new Error("Metamask cannot be found");
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      trace(`provider is ${web3Provider} and signer is ${signer}`);
      dispatch({ type: TransactionStateStatus.SUCCESS });
      return { web3Provider, signer };
    } catch (e) {
      error(`Error in metamask : ${e}`);
      dispatch({ type: TransactionStateStatus.ERROR, message: e.message });
    }
  };

  const provider = useMemo<GetProvider | undefined>(getProvider, [window.ethereum]);
  return { state, web3Provider: provider?.web3Provider, signer: provider?.signer };
};
