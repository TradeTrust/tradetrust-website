import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { EndorsementChain } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";
import { mergeTransfers } from "./helpers";
import { fetchTokenTransfers } from "./fetchTokenTransfer";
import { ChainId } from "../../../constants/chain-info";
import { getEndorsementChain } from "./retrieveEndorsementChain";
import { retrieveTitleEscrowAddressOnFactory } from "../useTitleEscrowContract";

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
      const networkId = await provider.getNetwork();
      if (networkId.chainId === ChainId.Local) {
        // Ganache crashes when querying logs
        // https://github.com/trufflesuite/ganache/issues/1575
        setEndorsementChain([]);
        setPending(false);
        return;
      }
      const tokenLogs = await fetchTokenTransfers(tokenRegistry, tokenId);
      const escrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, providerOrSigner);
      const titleEscrowLogs = await fetchEscrowTransfers(provider, escrowAddress);
      const transferEvents = mergeTransfers([...titleEscrowLogs, ...tokenLogs]);
      const retrievedEndorsementChain = await getEndorsementChain(provider, transferEvents);
      setEndorsementChain(retrievedEndorsementChain);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError(e.message);
      }
    }
    setPending(false);
  }, [provider, providerOrSigner, tokenId, tokenRegistry]);

  useEffect(() => {
    fetchEndorsementChain();
  }, [fetchEndorsementChain]);

  return { endorsementChain, pending, error };
};
