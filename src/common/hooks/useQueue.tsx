import {
  DocumentBuilder,
  getTokenId,
  getTokenRegistryAddress,
  SignedVerifiableCredential,
  SUPPORTED_CHAINS,
  W3CTransferableRecordsConfig,
  mint,
} from "@trustvc/trustvc";
import { useState } from "react";
import { CHAIN, ChainId, ChainInfo, Network } from "../../constants/chain-info";
import { QueueState } from "../../constants/QueueState";
import { FormEntry, FormTemplate } from "../../types";
import { getLogger } from "../../utils/logger";
import { getQueueNumber, uploadToStorage } from "../API/storageAPI";
import { useCreatorContext } from "../contexts/CreatorContext";
import { useProviderContext } from "../contexts/provider";
import { getChainInfo } from "../utils/chain-utils";
import { flattenData, getDataW3C } from "../utils/dataHelpers";
import { encodeQrCode } from "../utils/qrCode";
import { Signer } from "ethers";
import { CryptoSuite } from "@trustvc/trustvc/w3c/issuer";

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
    type: "TrustVCQRCode",
    uri: encodeQrCode(qrUrlObj),
  };

  return qrCodeObject;
};

const mintTransferableRecord = async (
  signedDocument: SignedVerifiableCredential,
  formEntry: FormEntry,
  currentChainId: ChainId,
  providerOrSigner: Signer
): Promise<void> => {
  const tokenRegistryAddress = getTokenRegistryAddress(signedDocument);
  if (!tokenRegistryAddress) throw new Error("Token registry not found");
  const encryptionKey = signedDocument.id!;
  const mintTokenParams = {
    beneficiaryAddress: formEntry.ownership.beneficiaryAddress,
    holderAddress: formEntry.ownership.holderAddress,
    tokenId: getTokenId(signedDocument),
    remarks: formEntry.remarks,
  };

  let transactionOptions = {};
  const { gasStation } = SUPPORTED_CHAINS[currentChainId];
  if (gasStation) {
    try {
      const gasFees = await gasStation();
      const { maxFeePerGas, maxPriorityFeePerGas } = gasFees ?? {};
      transactionOptions = {
        maxFeePerGas,
        maxPriorityFeePerGas,
      };
    } catch (error) {
      console.warn("Failed to fetch gas prices", error);
    }
  }

  const transaction = await mint({ tokenRegistryAddress }, providerOrSigner, mintTokenParams, {
    id: encryptionKey,
    ...transactionOptions,
  });

  await transaction.wait();
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

      const documentStorageURL = process.env.DOCUMENT_STORAGE_URL;

      const mergedCredentialSubject = {
        ...formTemplate.defaults.credentialSubject,
        ...getDataW3C(formEntry.data.formData),
      };

      const builder = new DocumentBuilder(formTemplate.defaults)
        .credentialSubject(flattenData(mergedCredentialSubject))
        .renderMethod(formTemplate.defaults.renderMethod);

      if (!previewOnly) {
        // Add credential status
        if (formTemplate.type === "VERIFIABLE_DOCUMENT") {
          // TODO: Implement Verifiable Document
        } else if (formTemplate.type === "TRANSFERABLE_RECORD") {
          if (!currentChainId) throw new Error("No chainId found in context");
          if (!account) throw new Error("No account found in context");
          if (!providerOrSigner) throw new Error("No provider or signer found in context");
          const chainInfo = getChainInfo(currentChainId);
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
        if (process.env.NODE_ENV !== "test") {
          if (!documentStorageURL) throw new Error("No document storage URL found");
          const chainInfo = currentChainId ? getChainInfo(currentChainId) : undefined;
          const actionsUrlObj = await getReservedStorageUrl(documentStorageURL, chainInfo?.networkName);
          builder.qrCode(actionsUrlObj);
        }
      }

      // Sign Document
      const localStorageDidString = localStorage?.getItem("did");
      if (!localStorageDidString) throw new Error("No keypair found in localStorage");

      const keyPair = JSON.parse(localStorageDidString);
      const signedDocument = await builder.sign(keyPair, CryptoSuite.EcdsaSd2023, {
        mandatoryPointers: ["/renderMethod"],
      });
      setDocument(signedDocument);

      // Minting
      if (!previewOnly) {
        if (formTemplate.type === "TRANSFERABLE_RECORD") {
          await mintTransferableRecord(signedDocument, formEntry, currentChainId!, providerOrSigner as Signer);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Upload to storage
      if (!previewOnly && documentStorageURL) {
        await uploadToStorage(signedDocument, documentStorageURL);
      }

      setCreatedDocuments([signedDocument]);

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
