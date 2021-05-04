import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers, Signer } from "ethers";
import { TradeTrustErc721Event } from "../../../types";
import { fetchEvents, fetchEventInfo } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";

export const useEndorsementChain = (
  tokenRegistryAddress: string,
  tokenId: string
): {
  endorsementChain?: TradeTrustErc721Event[];
  pending: boolean;
  error: string;
} => {
  const { provider: providerOrSigner } = useProviderContext();
  const provider = (providerOrSigner as Signer).provider
    ? (providerOrSigner as Signer).provider
    : (providerOrSigner as providers.Provider);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<TradeTrustErc721Event[]>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      // Fetch transfer logs from token registry
      const transferLogFilter = tokenRegistry.filters.Transfer(null, null, tokenId);
      const logs = await tokenRegistry.queryFilter(transferLogFilter, 0);
      const formattedLogs = logs.map((log) => {
        const { blockNumber, args: values, transactionHash } = log;
        if (!values) throw new Error(`Transfer log malformed: ${log}`);
        return {
          blockNumber,
          transactionHash,
          from: values["from"] as string,
          to: values["to"] as string,
        };
      });

      const titleEscrowLogs: TradeTrustErc721Event[] = await Promise.all(
        formattedLogs.map((log) => {
          switch (log.to) {
            case tokenRegistryAddress:
              return fetchEventInfo(log.to, log.blockNumber, "Surrender", provider);
            case "0x000000000000000000000000000000000000dEaD":
              return fetchEventInfo(log.to, log.blockNumber, "Burnt", provider);
            default:
              return fetchEvents(log.to, log.blockNumber, provider);
          }
        })
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
