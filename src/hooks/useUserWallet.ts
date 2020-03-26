import { getLogger } from "../utils/logger";

import { useEffect, useState } from "react";
import { useEthereumTransactionState } from "./useEthereumTransactionState";
import { useWeb3Provider } from "./useWeb3Provider";
const { trace, error } = getLogger("hooks:useEscrowContractUsers");

export const useUserWallet = () => {
  const { web3Provider } = useWeb3Provider();
  const [state, dispatch] = useEthereumTransactionState();
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [networkId, setNetworkId] = useState(3);
  const [network, setNetwork] = useState("ropsten");

  const loadUserWalletAddress = useCallback(async () => {
    const accounts = await web3Provider.listAccounts();
    if (!accounts || !accounts.length || accounts.length === 0) throw new Error("Accounts not found");
    trace(`user wallet address: ${accounts[0]}`);
    setUserWalletAddress(accounts[0]);
  }, [web3Provider]);

  const getNetwork = useCallback(async () => {
    const network = await web3Provider.getNetwork();
    if (!network) throw new Error("Can not detect metamask network");
    trace(`network fetched: ${JSON.stringify(network)}`);
    setNetwork(network.name);
    setNetworkId(network.chainId);
  }, [web3Provider]);

  useEffect(() => {
    window.ethereum.on("networkChanged", () => getNetwork());
    window.ethereum.on("accountsChanged", () => loadUserWalletAddress());
  }, [getNetwork, loadUserWalletAddress]);

  useEffect(() => {
    try {
      dispatch({ type: TransactionStateStatus.LOADING });
      loadUserWalletAddress();
      getNetwork();
      dispatch({ type: TransactionStateStatus.SUCCESS });
    } catch (e) {
      error(`Error fetching network: ${e}`);
      let errorMsg = "Metamask not found";
      if (e.message === "Accounts not found" || e.message === "Can not detect metamask network") {
        errorMsg = e.message;
      }
      dispatch({ type: TransactionStateStatus.ERROR, message: errorMsg });
    }
  }, [dispatch, getNetwork, loadUserWalletAddress, web3Provider]);

  return { state, userWalletAddress, network, networkId };
};
