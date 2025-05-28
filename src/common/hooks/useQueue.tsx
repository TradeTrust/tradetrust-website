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
import { CHAIN, ChainInfo, Network } from "../../constants/chain-info";
import { QueueState } from "../../constants/QueueState";
import { FormEntry, FormTemplate } from "../../types";
import { getLogger } from "../../utils/logger";
import { getQueueNumber } from "../API/storageAPI";
import { useCreatorContext } from "../contexts/CreatorContext";
import { useProviderContext } from "../contexts/provider";
import { getChainInfo } from "../utils/chain-utils";
import { flattenData, getDataW3C } from "../utils/dataHelpers";
import { encodeQrCode } from "../utils/qrCode";

const { stack } = getLogger("useQueue");

export interface UseQueue {
  formEntry: FormEntry;
  formTemplate: FormTemplate;
}

export interface UseQueueReturn {
  error?: Error;
  queueState: QueueState;
  processDocument: (param?: ProcessDocument) => Promise<void>;
  document?: SignedVerifiableCredential;
}

export interface ActionsUrlObject {
  type: string;
  uri: string;
}

export interface ProcessDocument {
  previewOnly?: boolean;
}

const redirectUrl = (): string => {
  return `${window.location.protocol}//${window.location.host}/`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getReservedStorageUrl = async (documentStorageURL: string, network?: Network): Promise<ActionsUrlObject> => {
  const queueNumber = await getQueueNumber(documentStorageURL);

  const chainObject = network ? Object.values(ChainInfo).find((item) => item.networkName === network) : undefined;

  const qrUrlObj = {
    type: "DOCUMENT",
    payload: {
      uri: `${documentStorageURL}/${queueNumber.data.id}`,
      key: queueNumber.data.key,
      permittedActions: ["STORE"],
      redirect: redirectUrl(),
      ...(chainObject && { chainId: `${chainObject.chainId}` }), // only add if available
    },
  };

  const qrCodeObject = {
    type: "TRUSTVCQrCode",
    uri: encodeQrCode(qrUrlObj),
  };

  return qrCodeObject;
};

export const useQueue = ({ formEntry, formTemplate }: UseQueue): UseQueueReturn => {
  const [error, setError] = useState<Error>();
  const [queueState, setQueueState] = useState<QueueState>(QueueState.UNINITIALIZED);
  const [document, setDocument] = useState<SignedVerifiableCredential>();
  const { currentChainId, account, providerOrSigner } = useProviderContext();
  const { setCreatedDocuments } = useCreatorContext();

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
      if (!currentChainId) throw new Error("No chainId found in context");
      if (!account) throw new Error("No account found in context");
      if (!providerOrSigner) throw new Error("No provider or signer found in context");
      // const documentStorageURL = process.env.DOCUMENT_STORAGE_URL;
      // if (!documentStorageURL) throw new Error("No document storage URL found");

      const mergedCredentialSubject = {
        ...formTemplate.defaults.credentialSubject,
        ...getDataW3C(formEntry.data.formData),
      };

      const builder = new DocumentBuilder(formTemplate.defaults)
        .credentialSubject(flattenData(mergedCredentialSubject))
        .renderMethod(formTemplate.defaults.renderMethod);

      if (!previewOnly) {
        // Add credential status
        const chainInfo = getChainInfo(currentChainId);

        if (formTemplate.type === "VERIFIABLE_DOCUMENT") {
          // TODO: Implement Verifiable Document
        } else if (formTemplate.type === "TRANSFERABLE_RECORD") {
          const tokenRegistryObj = JSON.parse(localStorage?.getItem("tokenRegistry") || "{}");
          const tokenRegistry = tokenRegistryObj[account][currentChainId];

          if (!tokenRegistry) throw new Error("Token registry not found");

          builder.credentialStatus({
            chain: CHAIN[currentChainId],
            chainId: currentChainId,
            tokenRegistry,
            rpcProviderUrl: chainInfo.rpcUrl,
          } as unknown as W3CTransferableRecordsConfig);
        }

        // Add QR code
        // const actionsUrlObj = await getReservedStorageUrl(documentStorageURL, chainInfo.networkName);
        // builder.qrCode(actionsUrlObj);
      }

      // Sign Document
      const localStorageDidString = localStorage?.getItem("did");
      if (!localStorageDidString) throw new Error("No keypair found in localStorage");

      const keyPair = JSON.parse(localStorageDidString);
      const signedDocument = await builder.sign(keyPair);

      // Upload to storage
      if (!previewOnly) {
        // await uploadToStorage(signedDocument, documentStorageURL);
      }

      setDocument(signedDocument);
      setCreatedDocuments([signedDocument]);

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
