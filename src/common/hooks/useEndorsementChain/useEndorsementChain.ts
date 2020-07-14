import { useState, useEffect } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers } from "ethers";
import { TradeTrustERC721 } from "@govtechsg/token-registry/dist/ts/contracts/TradeTrustERC721";
import { TitleEscrowEvent } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";

export const useEndorsementChain = (tokenRegistryAddress: string, tokenId: string, provider: providers.Provider) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<TitleEscrowEvent[]>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchEndorsementChain = async (contract: TradeTrustERC721, token: string, provider: providers.Provider) => {
    setEndorsementChain(undefined);
    setPending(true);
    try {
      // Fetch transfer logs from token registry
      const transferLogFilter = contract.filters.Transfer(null, null, token);
      const logs = await contract.queryFilter(transferLogFilter);
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
  };

  useEffect(() => {
    if (!tokenRegistry) return;
    fetchEndorsementChain(tokenRegistry, tokenId, provider);
  }, [tokenRegistry, tokenId, provider]);

  return { endorsementChain, pending, error };
};
