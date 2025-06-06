import { SignedVerifiableCredential } from "@trustvc/trustvc";
import React, { FunctionComponent, MouseEventHandler } from "react";
import { Download } from "react-feather";
import { QueueState } from "../../../constants/QueueState";
import { Button } from "../../Button";
import { ErrorCard } from "../../UI/ErrorCard";
import { ProcessedDocumentTag } from "../ProcessedDocumentTag";

interface ProcessDocumentContentProps {
  queueState: QueueState;
  document?: SignedVerifiableCredential;
  fileName: string;
  extension: string;
  downloadErrorName: string;
  downloadErrorLink: string;
  downloadAllFn: MouseEventHandler<HTMLButtonElement>;
}

export const ProcessDocumentContent: FunctionComponent<ProcessDocumentContentProps> = ({
  queueState,
  document,
  fileName,
  extension,
  downloadErrorName,
  downloadErrorLink,
  downloadAllFn,
}) => {
  const isDocumentError = queueState === QueueState.ERROR;
  const isDocumentSuccess = queueState === QueueState.CONFIRMED && !!document;
  const isDocumentPending = queueState === QueueState.PENDING;

  const ErrorLogButton = () => {
    return (
      <Button className="bg-scarlet-500 flex mx-auto border-scarlet-500 hover:bg-red-600">
        <a className="text-white hover:text-white" download={downloadErrorName} href={downloadErrorLink}>
          Download Error Log
        </a>
      </Button>
    );
  };

  const DownloadAllButton = () => {
    return (
      <Button
        className="bg-white text-cerulean-500 hover:bg-cloud-100 w-56"
        data-testid="download-all-button"
        onClick={downloadAllFn}
      >
        <div className="flex items-center justify-center w-full">
          <Download />
          <div className="text-cerulean-500 ml-2">Download All</div>
        </div>
      </Button>
    );
  };

  return (
    <div className="pb-6">
      {isDocumentError && (
        <>
          <div className="mb-4 flex-grow py-3" data-testid="total-number-of-documents">
            1 document failed
          </div>

          <ErrorCard
            title={`The document could not be issued at this time. Please fix the errors and try again.`}
            description={<div key={`${fileName}`}>{fileName}</div>}
            button={<ErrorLogButton />}
          />
        </>
      )}

      {(isDocumentPending || isDocumentSuccess) && (
        <>
          <div className="flex justify-between items-center pb-4 mb-4 mt-4">
            <div className="flex-grow py-3" data-testid="total-number-of-documents">
              1 document {isDocumentPending ? "issuing" : "issued"}
            </div>
            {isDocumentSuccess && <DownloadAllButton />}
          </div>
          <div className="flex-grow justify-between pb-4 mb-4 mt-4">
            <div>
              <ProcessedDocumentTag
                doc={document}
                isPending={isDocumentPending}
                fileName={fileName}
                extension={extension}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
