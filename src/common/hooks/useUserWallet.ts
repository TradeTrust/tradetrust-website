import { getLogger } from "../utils/logger";

import { useEffect, useState, useCallback } from "react";
import { useEthereumTransactionState, TransactionStateStatus } from "./useEthereumTransactionState";
import { useInjectedProvider } from "./useInjectedProvider";
const { trace, error } = getLogger("hooks:useEscrowContractUsers");

export const useUserWallet = () => {
  const { provider } = useInjectedProvider();
  const [state, dispatch] = useEthereumTransactionState();
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [networkId, setNetworkId] = useState(3);
  const [network, setNetwork] = useState("ropsten");

  const loadUserWalletAddress = useCallback(async () => {
    const accounts = await provider?.listAccounts();
    if (!accounts || !accounts.length || accounts.length === 0) throw new Error("Accounts not found");
    trace(`user wallet address: ${accounts[0]}`);
    setUserWalletAddress(accounts[0]);
  }, [provider]);

  const getNetwork = useCallback(async () => {
    const network = await provider?.getNetwork();
    if (!network) throw new Error("Can not detect metamask network");
    trace(`network fetched: ${JSON.stringify(network)}`);
    setNetwork(network.name);
    setNetworkId(network.chainId);
  }, [provider]);

  const enableMetamask = () => {
    window.ethereum?.enable();
  };

  const fetchUserWallet = useCallback(async () => {
    try {
      dispatch({ type: TransactionStateStatus.LOADING });
      await Promise.all([loadUserWalletAddress(), getNetwork()]);
      dispatch({ type: TransactionStateStatus.SUCCESS });
    } catch (e) {
      error(`Error fetching network: ${e}`);
      dispatch({ type: TransactionStateStatus.ERROR, message: e.message });
    }
  }, [dispatch, getNetwork, loadUserWalletAddress]);

  useEffect(() => {
    window.ethereum?.on("networkChanged", () => fetchUserWallet());
    window.ethereum?.on("accountsChanged", () => fetchUserWallet());
  }, [fetchUserWallet]);

  useEffect(() => {
    if (provider) fetchUserWallet();
  }, [fetchUserWallet, provider]);

  return { state, userWalletAddress, network, networkId, enableMetamask };
};
