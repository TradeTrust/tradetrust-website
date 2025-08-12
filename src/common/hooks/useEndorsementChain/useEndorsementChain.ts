import { useCallback, useEffect, useState } from "react";
import { useProviderContext } from "../../contexts/provider";
import { useTokenInformationContext } from "../../contexts/TokenInformationContext";
import { getErrorMessage } from "../../utils/errorHandling";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { EndorsementChain, fetchEndorsementChain } from "@trustvc/trustvc";

export const useEndorsementChain = (
  tokenRegistryAddress: string,
  tokenId: string,
  keyId?: string
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
  const { titleEscrowAddress } = useTokenInformationContext();
  /*
    retrieve transactions from token registry and title escrow events
    merge, sort and provide history of events
  */
  const fetchEndorsementChainV5 = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner) return;
    setEndorsementChain(undefined);
    setPending(true);
    setError("");
    try {
      const retrievedEndorsementChain = await fetchEndorsementChain(
        tokenRegistryAddress,
        tokenId,
        provider,
        keyId,
        titleEscrowAddress
      );
      setEndorsementChain(retrievedEndorsementChain);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
    setPending(false);
  }, [provider, providerOrSigner, tokenId, tokenRegistry, tokenRegistryAddress, keyId, titleEscrowAddress]);

  useEffect(() => {
    fetchEndorsementChainV5();
  }, [fetchEndorsementChainV5]);

  return { endorsementChain, pending, error };
};
