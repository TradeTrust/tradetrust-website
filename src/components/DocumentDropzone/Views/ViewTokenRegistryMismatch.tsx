import React, { FunctionComponent } from "react";
import { URLS } from "../../../constants";
import { Button } from "../../Button";
interface ViewActionErrorProps {
  resetData: () => void;
}

export const ViewTokenRegistryMismatch: FunctionComponent<ViewActionErrorProps> = ({ resetData }) => {
  return (
    <div>
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <h4 className="text-scarlet-500">Document cannot be read.</h4>
      <h4 className="text-scarlet-500 ">Please check that you have a valid .tt or .json file</h4>
      <span className="ml-1">
        Please visit <span className="text-blue-500">{URLS.REF}</span> to verify older version of transferable
        documents.
      </span>
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
