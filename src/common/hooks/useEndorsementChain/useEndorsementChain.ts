import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { EndorsementChain } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";
import { mergeTransfers } from "./helpers";
import { fetchTokenTransfers } from "./fetchTokenTransfer";
import { getEndorsementChain } from "./retrieveEndorsementChain";
import { retrieveTitleEscrowAddressOnFactory } from "../useTitleEscrowContract";
import { getErrorMessage } from "../../utils/errorHandling";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
export const useEndorsementChain = (
  tokenRegistryAddress: string,
  tokenId: string
): {
  endorsementChain?: EndorsementChain;
  pending: boolean;
  error: string;
} => {
  const { providerOrSigner, provider } = useProviderContext();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<EndorsementChain>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner);
  /*
    retrieve transactions from token registry and title escrow events
    merge, sort and provide history of events
  */
  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      const chainId: ChainId = (await provider.getNetwork()).chainId;
      const fromBlockNumber = ChainInfo[chainId]?.blockNumber ?? 0;
      const tokenLogs = await fetchTokenTransfers(provider, tokenRegistry, tokenId, fromBlockNumber);
      const escrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, providerOrSigner);
      const titleEscrowLogs = await fetchEscrowTransfers(provider, escrowAddress, fromBlockNumber);
      const transferEvents = mergeTransfers([...titleEscrowLogs, ...tokenLogs]);
      const retrievedEndorsementChain = await getEndorsementChain(provider, transferEvents);
      setEndorsementChain(retrievedEndorsementChain);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
    setPending(false);
  }, [provider, providerOrSigner, tokenId, tokenRegistry]);

  useEffect(() => {
    fetchEndorsementChain();
  }, [fetchEndorsementChain]);

  return { endorsementChain, pending, error };
};
