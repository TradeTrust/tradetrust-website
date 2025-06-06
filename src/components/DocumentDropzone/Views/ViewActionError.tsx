import React, { FunctionComponent } from "react";
import { Button } from "../../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedError } from "../../DocumentDropzone/DetailedErrors";
import { URLS } from "../../../constants";

interface ViewActionErrorProps {
  resetData: () => void;
}

export const ViewActionError: FunctionComponent<ViewActionErrorProps> = ({ resetData }) => {
  const { retrieveCertificateByActionError } = useSelector((state: RootState) => state.certificate);
  return (
    <div>
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <DetailedError
        title={`Unable to load certificate with the provided parameters`}
        message={retrieveCertificateByActionError}
      />

      <br />

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
