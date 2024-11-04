import { Provider } from "@ethersproject/abstract-provider";
import { EndorsementChain, TransferBaseEvent, TransferEvent } from "../../../types";
import { sortLogChain, fetchEventTime } from "./helpers";

/*
  Adds details of previous records (Previous Beneficiary/Holder)
  to current events history
*/
export const getEndorsementChain = async (
  provider: Provider,
  logChain: TransferBaseEvent[]
): Promise<EndorsementChain> => {
  const historyChain: EndorsementChain = [];
  sortLogChain(logChain);
  let previousBeneficiary = "";
  let previousHolder = "";

  const timestampPromises = logChain.map((log) => fetchEventTime(log.blockNumber, provider));
  const timestamps = await Promise.all(timestampPromises);

  logChain.forEach((log, index) => {
    const timestamp = timestamps[index];
    const transactionDetails = {
      type: log.type,
      transactionHash: log.transactionHash,
      transactionIndex: log.transactionIndex,
      blockNumber: log.blockNumber,
      owner: log.owner || previousBeneficiary || "",
      holder: log.holder || previousHolder || "",
      timestamp: timestamp,
    } as TransferEvent;

    if (
      log.type === "TRANSFER_OWNERS" ||
      log.type === "TRANSFER_BENEFICIARY" ||
      log.type === "TRANSFER_HOLDER" ||
      log.type === "INITIAL"
    ) {
      // Owner/Holder change
      historyChain.push(transactionDetails);
      previousHolder = transactionDetails.holder;
      previousBeneficiary = transactionDetails.owner;
    } else if (log.type === "SURRENDER_ACCEPTED") {
      // Title Escrow Voided
      previousHolder = "";
      previousBeneficiary = "";
      historyChain.push(transactionDetails);
    } else if (log.type === "SURRENDERED" || log.type === "SURRENDER_REJECTED") {
      // No state changes, except document owner
      historyChain.push(transactionDetails);
    } else {
      // No state changes
      historyChain.push(transactionDetails);
    }
  });
  return historyChain;
};
