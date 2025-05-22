import { useState } from "react";
import { FormEntry, FormTemplate } from "../../types";
import { getLogger } from "../../utils/logger";
import { DocumentBuilder, SignedVerifiableCredential } from "@trustvc/trustvc";
import { QueueState } from "../../constants/QueueState";
import { flattenData, getDataW3C } from "../utils/dataHelpers";

const { stack } = getLogger("useQueue");

interface UseQueue {
  formEntry: FormEntry;
  formTemplate: FormTemplate;
}

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

  const processDocument = async (): Promise<void> => {
    setQueueState(QueueState.INITIALIZED);
    setError(undefined);
    setDocument(undefined);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      setQueueState(QueueState.PENDING);

      if (formTemplate.type === "VERIFIABLE_DOCUMENT") {
        const mergedCredentialSubject = {
          ...formTemplate.defaults.credentialSubject,
          ...getDataW3C(formEntry.data.formData),
        };

        const builder = new DocumentBuilder(formTemplate.defaults)
          .credentialSubject(flattenData(mergedCredentialSubject))
          .renderMethod(formTemplate.defaults.renderMethod);

        const localStorageDidString = localStorage.getItem("did");
        if (!localStorageDidString) throw new Error("No keypair found in localStorage");

        const keyPair = JSON.parse(localStorageDidString);

        const signedDocument = await builder.sign(keyPair);

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
