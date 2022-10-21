import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { EndorsementChain, TitleEscrowTransferEvent, TokenTransferEvent } from "../../../types";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";
import { useProviderContext } from "../../contexts/provider";
import { fetchEscrowAddress, getEndorsementChain, mergeTransfers } from "./helpers";
import { fetchTokenTransfers } from "./fetchTokenTransfer";

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

  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner) return;
    setEndorsementChain(undefined);
    setPending(true);
    try {
      const escrowAddress = await fetchEscrowAddress(tokenRegistry, tokenId);
      const titleEscrowLogsDeferred = fetchEscrowTransfers(provider, escrowAddress);
      const tokenLogsDeferred = fetchTokenTransfers(tokenRegistry, tokenId);
      const [titleEscrowLogs, tokenLogs]: [TitleEscrowTransferEvent[], TokenTransferEvent[]] = await Promise.all([
        titleEscrowLogsDeferred,
        tokenLogsDeferred,
      ]);
      const transferEvents = mergeTransfers([...titleEscrowLogs, ...tokenLogs]);
      const endorsementChain = await getEndorsementChain(provider, transferEvents);
      console.log(JSON.stringify(endorsementChain));
      setEndorsementChain(endorsementChain);
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

//   TRANSFER_TO_WALLET = "Transferred to wallet",

//   SURRENDERED = "Document surrendered to issuer",
//   SURRENDER_REJECTED = "Surrender of document rejected",
//   SURRENDER_ACCEPTED = "Surrender of document accepted", // burnt token

//   NEW_OWNERS = "Change Owners",
//   ENDORSE = "Endorse change of ownership",
//   TRANSFER = "Transfer holdership",
// }
