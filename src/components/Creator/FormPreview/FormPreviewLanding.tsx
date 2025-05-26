import React, { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import { useQueue } from "../../../common/hooks/useQueue";
import { QueueState } from "../../../constants/QueueState";
import { OnCloseGuard } from "../../OnCloseGuard";
import { Card } from "../../UI/Card";
import { FormHeaderPanel } from "../FormHeaderPanel";
import { FormTransferableRecordPanel } from "../FormTransferableRecordPanel";
import { NetworkPanel } from "../NetworkPanel";
import { FormPreviewComponent } from "./FormPreviewComponent";

export const FormPreviewLanding: FunctionComponent = () => {
  const { form, currentFormTemplate } = useFormsContext();
  const [processingError, setProcessingError] = useState<string | null>(null);

  const useQueueParameters = { formEntry: form!, formTemplate: currentFormTemplate! };
  const { processDocument, document, queueState, error } = useQueue(useQueueParameters);

  useEffect(() => {
    const initProcess = async () => {
      try {
        await processDocument({ previewOnly: true });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error processing document";
        console.error("Error processing document:", err);
        setProcessingError(errorMessage);
      }
    };

    initProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!form || !currentFormTemplate) {
    return <Redirect to="/creator" />;
  }

  return (
    <OnCloseGuard active={true}>
      <NetworkPanel isTransferableRecord={currentFormTemplate.type === "TRANSFERABLE_RECORD"} />
      <FormHeaderPanel
        step={2}
        title="Preview Form"
        previousRoute="/creator/form"
        nextRoute="/creator/publish"
        nextLabel="Issue Document"
      />
      <Card>
        <FormTransferableRecordPanel
          mode="view"
          beneficiaryAddress={form?.ownership?.beneficiaryAddress}
          holderAddress={form?.ownership?.holderAddress}
          remarks={form?.remarks || ""}
          fileName={currentFormTemplate?.fileName}
        />
      </Card>
      <Card>
        {processingError ? (
          <div className="p-4 text-red-500">
            <h3 className="font-bold mb-2">Error loading preview:</h3>
            <p>{processingError}</p>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500">
            <h3 className="font-bold mb-2">Error processing document:</h3>
            <p>{error.message}</p>
          </div>
        ) : queueState === QueueState.CONFIRMED && document ? (
          <FormPreviewComponent document={document!} />
        ) : (
          <div className="p-4">
            <p>Loading document preview... Current state: {queueState}</p>
            {queueState === QueueState.INITIALIZED && <p>Initializing document...</p>}
            {queueState === QueueState.PENDING && <p>Processing document...</p>}
          </div>
        )}
      </Card>
    </OnCloseGuard>
  );
};
