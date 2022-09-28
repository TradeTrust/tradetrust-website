import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { fetchEventTime, fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";
import { TradeTrustERC721 } from "@govtechsg/token-registry/contracts";
import { Provider } from "@ethersproject/abstract-provider";

export const useEndorsementChain = (
  tokenRegistryAddress: string,
  tokenId: string
): {
  endorsementChain?: TradeTrustErc721Event[];
  pending: boolean;
  error: string;
} => {
  const { providerOrSigner, provider } = useProviderContext();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [endorsementChain, setEndorsementChain] = useState<TradeTrustErc721Event[]>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner);

  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      const titleEscrowLogs = await fetchTransfers(provider, tokenRegistry, tokenId);
      setEndorsementChain(titleEscrowLogs);
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

// enum EventType {
//   TRANSFER = "Transfer",
//   SURRENDER = "Surrender",
//   BURNT = "Burnt",
//   TRANSFER_TO_WALLET = "Transfer to Wallet",
// }

// enum ActionType {
//   INITIAL = "Document has been issued",
//   NEW_OWNERS = "Change Owners",
//   ENDORSE = "Endorse change of ownership",
//   TRANSFER = "Transfer holdership",
//   SURRENDERED = "Document surrendered to issuer",
//   SURRENDER_REJECTED = "Surrender of document rejected",
//   SURRENDER_ACCEPTED = "Surrender of document accepted", // burnt token
//   TRANSFER_TO_WALLET = "Transferred to wallet",
// }

const fetchTransfers = async (
  provider: Provider,
  tokenRegistry: TradeTrustERC721,
  tokenId: string
): Promise<(TradeTrustErc721Event | TitleEscrowEvent)[]> => {
  const tokenURI = await tokenRegistry.tokenURI(tokenId);
  console.log(tokenURI);

  const { logs: tokenTransfers, address: titleEscrowAddress } = await fetchTokenTransfers(
    provider,
    tokenRegistry,
    tokenId
  );
  const escrowTransfers = await fetchEscrowTransfers(titleEscrowAddress, provider);
  const transferEvents = [...escrowTransfers, ...tokenTransfers];
  // transferEvents.sort((a, b) => a.eventTimestamp! - b.eventTimestamp!);
  // Promise<(TradeTrustErc721Event | TitleEscrowEvent)[]>
  return transferEvents;
  // return fetchTokenTransfers(provider, tokenRegistry, tokenId);
};

const fetchTokenTransfers = async (
  provider: Provider,
  tokenRegistry: TradeTrustERC721,
  tokenId: string
): Promise<{
  logs: (TradeTrustErc721Event | TitleEscrowEvent)[];
  address: string;
}> => {
  // Fetch transfer logs from token registry
  const tokenRegistryAddress = tokenRegistry.address;
  const transferLogFilter = tokenRegistry.filters.Transfer(null, null, tokenId);
  const logs = await tokenRegistry.queryFilter(transferLogFilter, 0);
  const formattedLogs = logs.map((log) => {
    console.log(log);
    const { blockNumber, args: values, transactionHash } = log;
    if (!values) throw new Error(`Transfer log malformed: ${log}`);
    return {
      blockNumber,
      transactionHash,
      from: values["from"] as string,
      to: values["to"] as string,
    };
  });

  let titleEscrowAddress = "";

  const titleEscrowLogs: TradeTrustErc721Event[] = await Promise.all(
    formattedLogs.map(async (log) => {
      let eventType = "INVALID";
      const documentOwner = log.to;
      const eventTimestamp = await fetchEventTime(log.blockNumber, provider);
      const transactionHash = log.transactionHash;
      switch (log.to) {
        case tokenRegistryAddress:
          eventType = "Surrender";
        case "0x000000000000000000000000000000000000dEaD":
          eventType = "Burnt";
      }
      switch (log.from) {
        case tokenRegistryAddress:
          eventType = "Surrender Rejected";
          break;
        case "0x0000000000000000000000000000000000000000":
          eventType = "Document Issued";
          titleEscrowAddress = log.to;
          break;
      }
      if (eventType === "INVALID") {
        throw new Error("Invalid Log Type: " + JSON.stringify(log));
      }
      return {
        eventType,
        documentOwner,
        eventTimestamp,
        transactionHash,
      } as TradeTrustErc721Event;
    })
  );
  return { logs: titleEscrowLogs, address: titleEscrowAddress };
};
