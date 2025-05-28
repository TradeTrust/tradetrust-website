import { useState } from "react";
import { FormEntry, FormTemplate } from "../../types";
import { getLogger } from "../../utils/logger";
import { DocumentBuilder, SignedVerifiableCredential } from "@trustvc/trustvc";
import { QueueState } from "../../constants/QueueState";
import { flattenData, getDataW3C } from "../utils/dataHelpers";
import { encodeQrCode } from "../utils/qrCode";
import { getQueueNumber, uploadToStorage } from "../API/storageAPI";
import { ChainInfo, Network } from "../../constants/chain-info";
import { useProviderContext } from "../contexts/provider";
import { getChainInfo } from "../utils/chain-utils";

const { stack } = getLogger("useQueue");

interface UseQueue {
  formEntry: FormEntry;
  formTemplate: FormTemplate;
}
export interface ActionsUrlObject {
  type: string;
  uri: string;
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
    type: "TRUSTVCQrCode",
    uri: encodeQrCode(qrUrlObj),
  };

  return qrCodeObject;
};
export const useQueue = ({
  formEntry,
  formTemplate,
}: UseQueue): {
  error?: Error;
  queueState: QueueState;
  processDocument: () => void;
  document?: SignedVerifiableCredential;
} => {
  const [error, setError] = useState<Error>();
  const [queueState, setQueueState] = useState<QueueState>(QueueState.UNINITIALIZED);
  const [document, setDocument] = useState<SignedVerifiableCredential>();
  const { currentChainId } = useProviderContext();
  const processDocument = async (): Promise<void> => {
    setQueueState(QueueState.INITIALIZED);
    setError(undefined);
    setDocument(undefined);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      setQueueState(QueueState.PENDING);
      if (!currentChainId) throw new Error("No chainId found in context");
      const documentStorageURL = process.env.REACT_APP_DOCUMENT_STORAGE_URL;
      if (!documentStorageURL) throw new Error("No document storage URL found");

      if (formTemplate.type === "VERIFIABLE_DOCUMENT") {
        const mergedCredentialSubject = {
          ...formTemplate.defaults.credentialSubject,
          ...getDataW3C(formEntry.data.formData),
        };

        const builder = new DocumentBuilder(formTemplate.defaults)
          .credentialSubject(flattenData(mergedCredentialSubject))
          .renderMethod(formTemplate.defaults.renderMethod);

        const networkName = getChainInfo(currentChainId).networkName as Network;

        const actionsUrlObj = await getReservedStorageUrl(documentStorageURL, networkName);
        builder.qrCode(actionsUrlObj);

        const localStorageDidString = localStorage.getItem("did");
        if (!localStorageDidString) throw new Error("No keypair found in localStorage");
        const keyPair = JSON.parse(localStorageDidString);

        const signedDocument = await builder.sign(keyPair);
        await uploadToStorage(signedDocument, documentStorageURL);
        setDocument(signedDocument);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setQueueState(QueueState.CONFIRMED);
    } catch (e) {
      if (e instanceof Error) {
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
