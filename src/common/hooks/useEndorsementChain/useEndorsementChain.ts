import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers } from "ethers";
import { TitleEscrowEvent } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";

export const useEndorsementChain = (tokenRegistryAddress: string, tokenId: string, provider: providers.Provider) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<TitleEscrowEvent[]>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      // Fetch transfer logs from token registry
      const transferLogFilter = tokenRegistry.filters.Transfer(null, null, tokenId);
      const logs = await tokenRegistry.queryFilter(transferLogFilter);
      const formattedLogs = logs.map((log) => {
        const { blockNumber, args, transactionHash } = log;
        if (!args) throw new Error(`Transfer log malformed: ${log}`);
        return {
          blockNumber,
          transactionHash,
          from: args["from"] as string,
          to: args["to"] as string,
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
