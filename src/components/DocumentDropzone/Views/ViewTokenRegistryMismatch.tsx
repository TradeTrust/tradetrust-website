import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "@tradetrust-tt/tradetrust-ui-components";
import { URLS } from "../../../constants";

export const ViewTokenRegistryMismatch: FunctionComponent = () => {
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
      <h4 className="mt-4">Drop your TradeTrust Document to view its contents</h4>
      <p className="my-6">Or</p>
      <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mr-2 md:mr-0" size={ButtonSize.SM}>
        Select Document
      </Button>
    </div>
  );
};
