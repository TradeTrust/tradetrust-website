import React from "react";
import { ViewerButton, ViewerContainer } from "./SharedViewerStyledComponents";

interface DefaultViewProps {
  hover: boolean;
  accept: boolean;
  toggleQrReaderVisible?: () => void;
  verificationError?: string;
}

const ErrorMessage = ({ error }: { error: string }): React.ReactElement => {
  return (
    <div className={"mx-auto mb-8"}>
      <p className={"font-bold text-xl max-w-sm"}>{error}</p>
    </div>
  );
};
export const DefaultView = ({
  hover,
  accept,
  toggleQrReaderVisible,
  verificationError,
}: DefaultViewProps): React.ReactElement => (
  <ViewerContainer
    data-testid="viewer-container"
    className={`${hover ? (accept && !verificationError ? "accept" : "invalid") : "default"}`}
  >
    <div className="mb-4">
      <img
        className="mx-auto"
        style={{ width: "237px" }}
        alt="tradetrust Dropzone"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
    </div>
    {accept ? null : (
      <ErrorMessage error={"File cannot be read. Please check that you have a valid .tt or .json file"} />
    )}
    {verificationError ? <ErrorMessage error={verificationError} /> : null}
    <div className="text-gray-700 text-xl font-normal font-bold">Drop your TradeTrust file to view its contents</div>
    <div className="text-gray-700 flex flex-wrap items-center mt-4 mb-6">
      <div className="w-1/6" />
      <div className="w-1/4" />
      <div className="w-1/6">or</div>
    </div>
    <div className="text-gray-700 flex flex-wrap">
      <div className="mx-auto">
        <ViewerButton>Select File</ViewerButton>
        <ViewerButton
          data-testid="scan-qr-button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible && toggleQrReaderVisible();
          }}
        >
          Scan QR Code
        </ViewerButton>
      </div>
    </div>
  </ViewerContainer>
);
