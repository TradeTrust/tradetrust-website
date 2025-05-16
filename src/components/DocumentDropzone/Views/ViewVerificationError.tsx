import React, { FunctionComponent } from "react";
import { Button } from "../../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedErrors } from "../DetailedErrors";
import { URLS } from "../../../constants";

interface ViewVerificationErrorProps {
  resetData: () => void;
}

export const ViewVerificationError: FunctionComponent<ViewVerificationErrorProps> = ({ resetData }) => {
  const { verificationStatus, verificationError } = useSelector((state: RootState) => state.certificate);

  return (
    <div>
      <DetailedErrors verificationStatus={verificationStatus} verificationError={verificationError} />
      <a
        href={URLS.FAQ}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          className={`text-white bg-scarlet-500 border-scarlet-500 hover:bg-scarlet-400 hover:border-scarlet-400`}
        >
          What Should I do?
        </Button>
      </a>
      <br />
      <div
        data-testid="try-another"
        className="my-8 transition-colors duration-200 underline cursor-pointer text-scarlet-500 hover:text-cloud-500"
        onClick={(e) => {
          e.stopPropagation();
          resetData();
        }}
      >
        Try another document
      </div>
    </div>
  );
};
