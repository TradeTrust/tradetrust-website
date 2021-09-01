import React from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { DemoCertMobile } from "./DemoCertMobile";

export const sharedViewer = `bg-white text-center px-6 pt-6 pb-20 md:py-20 flex flex-col justify-center rounded-xl min-h-400 lg:min-h-600 border-2 border-dashed`;
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
  <div
    className={`${sharedViewer} ${
      hover
        ? accept && !verificationError
          ? "border-green-400 bg-green-50"
          : "border-cloud-100 bg-red-100 text-red-500"
        : "border-cloud-100"
    }`}
  >
    <DemoCertMobile />
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
        <Button className="bg-cerulean text-white hover:bg-cerulean-500 mr-2 md:mr-0">Select File</Button>
        <Button
          className="bg-cerulean text-white hover:bg-cerulean-500 md:hidden"
          data-testid="scan-qr-button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible && toggleQrReaderVisible();
          }}
        >
          Scan QR Code
        </Button>
      </div>
    </div>
  </div>
);
