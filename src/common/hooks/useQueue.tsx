import {
  DocumentBuilder,
  encrypt,
  getTokenId,
  getTokenRegistryAddress,
  SignedVerifiableCredential,
  SUPPORTED_CHAINS,
  v5Contracts,
  W3CTransferableRecordsConfig,
} from "@trustvc/trustvc";
import { useState } from "react";
import { CHAIN } from "../../constants/chain-info";
import { QueueState } from "../../constants/QueueState";
import { FormEntry, FormTemplate } from "../../types";
import { getLogger } from "../../utils/logger";
import { useProviderContext } from "../contexts/provider";
import { getChainInfo } from "../utils/chain-utils";
import { flattenData, getDataW3C } from "../utils/dataHelpers";

const { stack } = getLogger("useQueue");

export interface UseQueue {
  formEntry: FormEntry;
  formTemplate: FormTemplate;
}

export interface ProcessDocument {
  previewOnly?: boolean;
}

export interface UseQueueReturn {
  error?: Error;
  queueState: QueueState;
  processDocument: (param?: ProcessDocument) => Promise<void>;
  document?: SignedVerifiableCredential;
}

export const useQueue = ({ formEntry, formTemplate }: UseQueue): UseQueueReturn => {
  const [error, setError] = useState<Error>();
  const [queueState, setQueueState] = useState<QueueState>(QueueState.UNINITIALIZED);
  const [document, setDocument] = useState<SignedVerifiableCredential>();
  const { currentChainId, account, providerOrSigner } = useProviderContext();

  const processDocument = async (param?: ProcessDocument): Promise<void> => {
    const { previewOnly = false } = param || {};

    setQueueState(QueueState.INITIALIZED);
    setError(undefined);
    setDocument(undefined);
    if (!previewOnly) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
      setQueueState(QueueState.PENDING);

      const mergedCredentialSubject = {
        ...formTemplate.defaults.credentialSubject,
        ...getDataW3C(formEntry.data.formData),
      };

      const builder = new DocumentBuilder(formTemplate.defaults)
        .credentialSubject(flattenData(mergedCredentialSubject))
        .renderMethod(formTemplate.defaults.renderMethod);

      // Add credential status
      if (!previewOnly) {
        if (formTemplate.type === "VERIFIABLE_DOCUMENT") {
          // TODO: Implement Verifiable Document
        } else if (formTemplate.type === "TRANSFERABLE_RECORD") {
          const tokenRegistryObj = JSON.parse(localStorage?.getItem("tokenRegistry") || "{}");
          const tokenRegistry = tokenRegistryObj[account!][currentChainId!];

          if (!tokenRegistry) throw new Error("Token registry not found");

          builder.credentialStatus({
            chain: CHAIN[currentChainId!],
            chainId: currentChainId!,
            tokenRegistry,
            rpcProviderUrl: getChainInfo(currentChainId!).rpcUrl,
          } as unknown as W3CTransferableRecordsConfig);
        }
      }

      // Sign Document
      const localStorageDidString = localStorage?.getItem("did");
      if (!localStorageDidString) throw new Error("No keypair found in localStorage");

      const keyPair = JSON.parse(localStorageDidString);
      const signedDocument = await builder.sign(keyPair);

      setDocument(signedDocument);

      // Minting
      if (!previewOnly) {
        if (formTemplate.type === "TRANSFERABLE_RECORD") {
          const tokenRegistryAddress = getTokenRegistryAddress(signedDocument);
          if (!tokenRegistryAddress) throw new Error("Token registry not found");

          const tokenRegistry = v5Contracts.TradeTrustToken__factory.connect(tokenRegistryAddress, providerOrSigner);

          const owner = formEntry.ownership.beneficiaryAddress;
          const holder = formEntry.ownership.holderAddress;
          const tokenId = getTokenId(signedDocument);
          const encryptedRemarks = (formEntry.remarks && `0x${encrypt(formEntry.remarks, signedDocument.id!)}`) || "0x";

          // mint the document
          try {
            await tokenRegistry.callStatic.mint(owner, holder, tokenId, encryptedRemarks);
          } catch (e) {
            console.error(e);
            throw new Error("Failed to mint token");
          }

          let tx;
          // query gas station
          const { gasStation } = SUPPORTED_CHAINS[currentChainId!];
          if (gasStation) {
            const gasFees = await gasStation();
            const { maxFeePerGas, maxPriorityFeePerGas } = gasFees ?? {};
            tx = await tokenRegistry?.mint(owner, holder, tokenId, encryptedRemarks, {
              maxFeePerGas: maxFeePerGas ?? 0,
              maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0,
            });
          }

          if (!tx) {
            tx = await tokenRegistry?.mint(owner, holder, tokenId, encryptedRemarks);
          }

          await tx!.wait();
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setQueueState(QueueState.CONFIRMED);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        stack(e);
        setError(e);
        setQueueState(QueueState.ERROR);
      }
    }
  };

  return {
    processDocument,
    queueState,
    error,
    document,
  };
};
