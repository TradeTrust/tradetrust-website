import { LoaderSpinner } from "@tradetrust-tt/tradetrust-ui-components";
import { saveAs } from "file-saver";
import React, { FunctionComponent, ReactElement, useEffect, useMemo } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import { useQueue } from "../../common/hooks/useQueue";
import { QueueState } from "../../constants/QueueState";
import { FormEntry, FormTemplate } from "../../types";
import { generateFileName } from "../../utils";
import { FormHeaderPanel } from "../Creator/FormHeaderPanel/FormHeaderPanel";
import { NetworkPanel } from "../Creator/NetworkPanel";
import { Card } from "../UI/Card";
import { ProcessDocumentContent } from "./ProcessDocumentContent";
import { useCreatorContext } from "../../common/contexts/CreatorContext";
import { OnCloseGuard } from "../OnCloseGuard";

interface ProcessDocumentScreenProps {
  processAnotherDocument: () => void;
  form: FormEntry;
  formTemplate: FormTemplate;
  onDocumentReady: (doc: any) => void;
}

const titleText = (message: string): ReactElement => {
  return <span data-testid="process-title">{message}</span>;
};

export const getDisplayTitle = (
  queueState?: QueueState,
  providerType?: SIGNER_TYPE,
  isTransferableRecord?: boolean
): ReactElement => {
  switch (queueState) {
    case QueueState.PENDING:
      return (
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-row items-center">
            <LoaderSpinner className="mr-2" width="24px" primary="#2D5FAA" />
            {titleText("Issuing Document...")}
          </div>
          {providerType === SIGNER_TYPE.METAMASK && isTransferableRecord && (
            <div>
              <p>Please confirm the transaction on MetaMask</p>
            </div>
          )}
        </div>
      );
    case QueueState.CONFIRMED:
      return (
        <>
          <CheckCircle className="mr-2 text-forest-500 h-12 w-12 md:h-auto md:w-auto" />
          {titleText("Document issued successfully")}
        </>
      );
    case QueueState.ERROR:
      return (
        <>
          <XCircle className="mr-2 text-scarlet-500 h-12 w-12 md:h-auto md:w-auto" />
          {titleText("Document failed to issue")}
        </>
      );
    case QueueState.INITIALIZED:
    default:
      return titleText("Please wait while we prepare your document");
  }
};

export const ProcessDocumentScreen: FunctionComponent<ProcessDocumentScreenProps> = ({
  processAnotherDocument,
  form,
  formTemplate,
  onDocumentReady,
}) => {
  const useQueueParameters = { formEntry: form, formTemplate: formTemplate };
  const { processDocument, queueState, document, error } = useQueue(useQueueParameters);
  const { providerType } = useProviderContext();
  const { setHaveDownloadedAllDocument } = useCreatorContext();

  useEffect(() => {
    processDocument();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (document) {
      onDocumentReady(document);
    }
  }, [document]); // eslint-disable-line react-hooks/exhaustive-deps

  const isTransferableRecord = formTemplate?.type === "TRANSFERABLE_RECORD";
  const title = useMemo(
    () => getDisplayTitle(queueState, providerType, isTransferableRecord),
    [queueState, providerType, isTransferableRecord]
  );

  return (
    <OnCloseGuard active={true}>
      <NetworkPanel isTransferableRecord={formTemplate.type === "TRANSFERABLE_RECORD"} />
      <FormHeaderPanel
        step={3}
        totalSteps={3}
        title={title}
        queueState={queueState}
        processAnotherDocumentFn={processAnotherDocument}
      />
      {queueState !== QueueState.INITIALIZED && (
        <Card>
          <ProcessDocumentContent
            queueState={queueState}
            document={document}
            fileName={form.fileName || ""}
            extension={form.extension}
            downloadErrorName={generateFileName({
              fileName: "error-log",
              extension: "txt",
              hasTimestamp: true,
            })}
            downloadErrorLink={`data:text/plain;charset=UTF-8,${JSON.stringify(error, null, 2)}`}
            downloadAllFn={() => {
              if (!document) return;
              const file = JSON.stringify(document);
              const blob = new Blob([file], { type: "application/json;charset=utf-8" });
              const documentName = generateFileName({
                fileName: form.fileName,
                extension: form.extension,
              });
              saveAs(blob, documentName);
              setHaveDownloadedAllDocument(true);
            }}
          />
        </Card>
      )}
    </OnCloseGuard>
  );
};
