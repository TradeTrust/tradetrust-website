import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers, Signer } from "ethers";
import { TitleEscrowEvent } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";

export const useEndorsementChain = (tokenRegistryAddress: string, tokenId: string) => {
  const { provider: providerOrSigner } = useProviderContext();
  const provider = (providerOrSigner as Signer).provider
    ? (providerOrSigner as Signer).provider
    : (providerOrSigner as providers.Provider);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<TitleEscrowEvent[]>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      // Fetch transfer logs from token registry
      const transferLogFilter = tokenRegistry.filters.Transfer(null, null, tokenId);
      const logs = await provider.getLogs({ ...transferLogFilter, fromBlock: 0 });
      const parsedLogs = logs.map((log) => ({ ...log, ...tokenRegistry.interface.parseLog(log) }));
      const formattedLogs = parsedLogs.map((log) => {
        const { blockNumber, values, transactionHash } = log;
        if (!values) throw new Error(`Transfer log malformed: ${log}`);
        return {
          blockNumber,
          transactionHash,
          from: values["from"] as string,
          to: values["to"] as string,
        };
      });

      // Removing transactions with surrender
      const intermediateOwners = formattedLogs.filter(({ to }) => to !== tokenRegistryAddress);
      const titleEscrowLogs = await Promise.all(
        intermediateOwners.map((log) => fetchEscrowTransfers(log.to, provider))
      );
      setEndorsementChain(titleEscrowLogs);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
    setPending(false);
  }, [provider, tokenId, tokenRegistry, tokenRegistryAddress]);

  useEffect(() => {
    fetchEndorsementChain();
  }, [fetchEndorsementChain]);

  return { endorsementChain, pending, error };
};
