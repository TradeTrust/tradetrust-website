import { TradeTrustERC721 } from "@govtechsg/token-registry/contracts";
import { TypedEvent } from "@govtechsg/token-registry/dist/contracts/common";
import { LogDescription } from "ethers/lib/utils";
import { TokenTransferEvent, TokenTransferEventType } from "../../../types";

export const fetchTokenTransfers = async (
  tokenRegistry: TradeTrustERC721,
  tokenId: string
): Promise<TokenTransferEvent[]> => {
  // Fetch transfer logs from token registry
  const tokenRegistryAddress = tokenRegistry.address;
  const identifyTokenTransferEvents = identifyTokenTransferEventsFunction(tokenRegistryAddress);
  const transferLogFilter = tokenRegistry.filters.Transfer(null, null, tokenId);
  const logs = await tokenRegistry.queryFilter(transferLogFilter, 0);
  const formattedLogs = logs.map((log) => {
    if (!log.args) throw new Error(`Transfer log malformed: ${log}`);
    if (!log.blockNumber) throw new Error("Block number not present");
    if (!log.transactionHash) throw new Error("Transaction hash not present");
    return {
      ...log,
      ...tokenRegistry.interface.parseLog(log),
    };
  });

  return formattedLogs.map(
    (event) =>
      ({
        type: identifyTokenTransferEvents(event),
        from: event.args.from as string,
        to: event.args.to as string,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        transactionIndex: event.transactionIndex,
      } as TokenTransferEvent)
  );
};

export const identifyTokenTransferEventsFunction = (tokenRegistryAddress: string) => {
  return (log: TypedEvent | LogDescription): TokenTransferEventType => {
    const to = log.args.to as string;
    const from = log.args.from as string;
    switch (to) {
      case tokenRegistryAddress:
        return "SURRENDERED" as TokenTransferEventType;
      case "0x000000000000000000000000000000000000dEaD":
        return "SURRENDER_ACCEPTED" as TokenTransferEventType;
    }
    switch (from) {
      case tokenRegistryAddress:
        return "SURRENDER_REJECTED" as TokenTransferEventType;
      case "0x0000000000000000000000000000000000000000":
        return "INITIAL" as TokenTransferEventType;
    }
    throw new Error("Unidentified transfer event");
  };
};
