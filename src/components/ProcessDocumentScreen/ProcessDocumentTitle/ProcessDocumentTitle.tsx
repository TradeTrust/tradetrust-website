import { LoaderSpinner } from "@tradetrust-tt/tradetrust-ui-components";
import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { QueueState } from "../../../constants/QueueState";
import React from "react";
import { Button } from "../../Button";

interface ProcessDocumentTitle {
  queueState: QueueState;
  processAnotherDocumentFn: MouseEventHandler<HTMLButtonElement>;
}

export const ProcessDocumentTitle: FunctionComponent<ProcessDocumentTitle> = ({
  queueState,
  processAnotherDocumentFn,
}) => {
  const titleText = (message: string): ReactElement => {
    return <span data-testid="process-title">{message}</span>;
  };

  const getDisplayTitle = (): ReactElement => {
    switch (queueState) {
      case QueueState.PENDING:
        return (
          <>
            <LoaderSpinner className="mr-2" width="24px" primary="#2D5FAA" />
            {titleText("Issuing Document...")}
          </>
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

  return (
    <div className="flex items-center justify-between my-8 w-full" data-testid="process-document-title">
      <div className="flex items-center text-xl">{getDisplayTitle()}</div>
      {queueState === QueueState.CONFIRMED && (
        <Button
          className="bg-cerulean-500 text-white hover:bg-cerulean-800 w-56"
          data-testid="process-another-document-button"
          onClick={processAnotherDocumentFn}
        >
          Create Another Document
        </Button>
      )}
    </div>
  );
};
