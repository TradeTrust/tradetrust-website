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
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <DetailedErrors verificationStatus={verificationStatus} verificationError={verificationError} />

      <div className="flex flex-col xs:flex-row justify-center gap-2 mt-4">
        <a
          href={URLS.FAQ}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full xs:w-72"
        >
          <Button className="w-full text-scarlet-500 border-scarlet-500 hover:bg-scarlet-100 hover:border-scarlet-400 px-10">
            What Should I do?
          </Button>
        </a>

        <Button
          data-testid="try-another"
          className="w-full xs:w-72 text-white bg-scarlet-500 border-scarlet-500 hover:bg-scarlet-400 hover:border-scarlet-400 px-10"
          onClick={(e) => {
            e.stopPropagation();
            resetData();
          }}
        >
          Try another document
        </Button>
      </div>
    </div>
  );
};
