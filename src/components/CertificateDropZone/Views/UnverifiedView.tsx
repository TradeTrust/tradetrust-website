import { Button } from "@govtechsg/tradetrust-ui-components";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { Link } from "react-router-dom";
import { DetailedErrors } from "../../DocumentDropzone/DetailedErrors";
import { docNotValidMessage, tryAnotherMessage, unverifiedMessage } from "./";
import { WrappedOrSignedOpenAttestationDocument } from "../../../utils/shared";
import { sharedViewer } from "./DefaultView";

const ActionError = ({ retrieveCertificateByActionError }: { retrieveCertificateByActionError: string }) => {
  return (
    <div data-testid="error-tab" className="mb-8">
      <div>
        <h4 className="mb-0">Unable to load certificate with the provided parameters</h4>
        <p className="break-words text-black">{retrieveCertificateByActionError}</p>
      </div>
    </div>
  );
};

interface UnverifiedViewProps {
  resetData: () => void;
  document?: WrappedOrSignedOpenAttestationDocument;
  verificationStatus?: VerificationFragment[];
  retrieveCertificateByActionError?: string;
}

export const UnverifiedView = ({
  resetData,
  verificationStatus,
  retrieveCertificateByActionError,
}: UnverifiedViewProps): React.ReactElement => (
  <div className={`${sharedViewer} text-red-500 border-cloud-100 bg-red-100`}>
    <div className="flex justify-center items-center my-4">
      <div className="w-auto mr-2">
        <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      </div>
      <div className="w-auto">
        <p className="invalid text-black text-2xl">{docNotValidMessage}</p>
      </div>
    </div>
    {verificationStatus && <DetailedErrors verificationStatus={verificationStatus} />}
    {retrieveCertificateByActionError && (
      <ActionError retrieveCertificateByActionError={retrieveCertificateByActionError} />
    )}
    <Link
      to="/faq"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Button className={`bg-red-500 border-red-500 hover:bg-red-300 hover:border-red-300 text-white px-4`}>
        {unverifiedMessage}
      </Button>
    </Link>
    <div
      data-testid="try-another"
      className="transition-colors duration-200 text-red-500 underline cursor-pointer hover:text-gray-500 inline-block my-8"
      onClick={(e) => {
        e.preventDefault();
        resetData();
      }}
    >
      {tryAnotherMessage}
    </div>
  </div>
);
