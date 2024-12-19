import { useCallback, useEffect, useState } from "react";
import { EndorsementChain, TransferBaseEvent } from "../../../types";
import { useProviderContext } from "../../contexts/provider";
import { TokenRegistryVersion, useTokenInformationContext } from "../../contexts/TokenInformationContext";
import { getErrorMessage } from "../../utils/errorHandling";
import { retrieveTitleEscrowAddressOnFactory } from "../useTitleEscrowContract";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { fetchEscrowTransfersV5 } from "./fetchEscrowTransfer";
import { mergeTransfers } from "./helpers";
import { getEndorsementChain } from "./retrieveEndorsementChain";
import { decryptRemark } from "../../utils/chain-utils";

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
  const { version: tokenRegistryVersion } = useTokenInformationContext();

  /*
    retrieve transactions from token registry and title escrow events
    merge, sort and provide history of events
  */
  const fetchEndorsementChain = useCallback(async () => {
    if (!tokenRegistry || !provider || !providerOrSigner) return;
    setEndorsementChain(undefined);
    setPending(true);
    setError("");
    try {
      let transferEvents: TransferBaseEvent[] = [];
      if (tokenRegistryVersion === TokenRegistryVersion.V5) {
        const titleEscrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, providerOrSigner);
        const titleEscrowLogs = await fetchEscrowTransfersV5(provider, titleEscrowAddress);
        transferEvents = mergeTransfers(titleEscrowLogs);
      } else {
        throw new Error('"Only Token Registry V5 is supported"');
      }

      const retrievedEndorsementChain = await getEndorsementChain(provider, transferEvents);

      setEndorsementChain(
        retrievedEndorsementChain.map((event) => {
          const remark = event?.remark?.slice(2) ? decryptRemark(event.remark.slice(2), keyId) : "";
          return {
            ...event,
            remark: remark,
          };
        })
      );
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
    setPending(false);
  }, [provider, providerOrSigner, tokenId, tokenRegistry, tokenRegistryVersion, keyId]);

  useEffect(() => {
    fetchEndorsementChain();
  }, [fetchEndorsementChain]);

  return { endorsementChain, pending, error };
};
