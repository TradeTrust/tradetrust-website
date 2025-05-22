import { ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import { FunctionComponent, useEffect } from "react";
import { FormEntry, FormTemplate } from "../../types";
import { generateFileName } from "../../utils";
import { ProcessDocumentTitle } from "./ProcessDocumentTitle";
import { Card } from "../UI/Card";
import { ProcessDocumentContent } from "./ProcessDocumentContent";
import React from "react";
import { useQueue } from "../../common/hooks/useQueue";
import { saveAs } from "file-saver";
import { QueueState } from "../../constants/QueueState";

interface ProcessDocumentScreen {
  processAnotherDocument: () => void;
  form: FormEntry;
  formTemplate: FormTemplate;
  onDocumentReady: (doc: any) => void;
}

export const ProcessDocumentScreen: FunctionComponent<ProcessDocumentScreen> = ({
  processAnotherDocument,
  form,
  formTemplate,
  onDocumentReady,
}) => {
  const useQueueParameters = { formEntry: form, formTemplate: formTemplate };

  const { processDocument, queueState, document, error } = useQueue(useQueueParameters);

  useEffect(() => {
    processDocument();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (document) {
      onDocumentReady(document);
    }
  }, [document]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Card>
        <ProgressBar step={3} totalSteps={3} />
        <div className="flex justify-between items-end" data-testid="processing-screen">
          <ProcessDocumentTitle queueState={queueState} processAnotherDocumentFn={processAnotherDocument} />
        </div>
      </Card>
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
            }}
          />
        </Card>
      )}
    </>
  );
};
