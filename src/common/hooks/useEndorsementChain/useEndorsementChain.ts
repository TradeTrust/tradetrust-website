import { useCallback, useEffect, useState } from "react";
import { providers } from "ethers";
import { EndorsementChain, fetchEndorsementChain } from "@trustvc/trustvc";
import { useProviderContext } from "../../contexts/provider";
import { useTokenInformationContext } from "../../contexts/TokenInformationContext";
import { getErrorMessage } from "../../utils/errorHandling";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

/**
 * Read-only Infura (or ChainInfo) RPC — same idea as trustvc-website.
 * Do not use the wallet Web3Provider here: MetaMask/Magic eth_getLogs caps
 * (e.g. 10k blocks) break endorsement-chain scans.
 */
const createEndorsementChainProvider = (chainId: ChainId): providers.JsonRpcProvider => {
  const rpcUrl = ChainInfo[chainId]?.rpcUrl;
  if (!rpcUrl) {
    throw new Error(`No RPC URL configured for chain ${chainId}`);
  }
  return new providers.JsonRpcProvider(rpcUrl, chainId);
};

export const useEndorsementChain = (
  tokenRegistryAddress: string,
  tokenId: string,
  keyId?: string,
  isObligation?: boolean
): {
  endorsementChain?: EndorsementChain;
  pending: boolean;
  error: string;
} => {
  const { providerOrSigner, provider, currentChainId } = useProviderContext();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<EndorsementChain>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner, isObligation);
  const { titleEscrowAddress } = useTokenInformationContext();
  /*
    retrieve transactions from token registry and title/obligation escrow events
    merge, sort and provide history of events
    (fetchEndorsementChain auto-detects ObligationEscrow via supportsInterface)
  */
  const fetchEndorsementChainV5 = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner || !currentChainId) return;
    setEndorsementChain(undefined);
    setPending(true);
    setError("");
    try {
      const readProvider = createEndorsementChainProvider(currentChainId);
      const retrievedEndorsementChain = await fetchEndorsementChain(
        tokenRegistryAddress,
        tokenId,
        readProvider,
        keyId,
        titleEscrowAddress
      );
      setEndorsementChain(retrievedEndorsementChain);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
    setPending(false);
  }, [
    provider,
    providerOrSigner,
    tokenId,
    tokenRegistry,
    tokenRegistryAddress,
    keyId,
    titleEscrowAddress,
    currentChainId,
  ]);

  useEffect(() => {
    fetchEndorsementChainV5();
  }, [fetchEndorsementChainV5]);

  return { endorsementChain, pending, error };
};
