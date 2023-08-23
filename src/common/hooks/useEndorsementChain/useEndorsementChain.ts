import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { EndorsementChain } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";
import { mergeTransfers } from "./helpers";
import { fetchTokenTransfers } from "./fetchTokenTransfer";
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
      const tokenLogs = await fetchTokenTransfers(tokenRegistry, tokenId);
      const escrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, providerOrSigner);
      const titleEscrowLogs = await fetchEscrowTransfers(provider, escrowAddress);
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

type ErrorWithMessage = {
  message: string;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown): string => {
  return toErrorWithMessage(error).message;
};
