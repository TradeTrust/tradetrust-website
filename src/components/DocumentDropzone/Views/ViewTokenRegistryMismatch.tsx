import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "../../Button";
import { URLS } from "../../../constants";
import { TooltipIcon } from "../../UI/SvgIcon";
import { Info } from "react-feather";

export const ViewTokenRegistryMismatch: FunctionComponent = () => {
  return (
    <div>
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <h4 className="text-scarlet-500">Document cannot be read.</h4>
      <h4 className="text-scarlet-500 mb-4">Please check that you have a valid .tt or .json file</h4>
      <h4>Drop your TradeTrust Document to view its contents</h4>
      <p className="my-6">Or</p>
      <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mr-2 md:mr-0" size={ButtonSize.SM}>
        Select Document
      </Button>
      <hr className="border-t-2 border-gray-300 my-4" />

      <div>
        <TooltipIcon content="Please visit https://ref.tradetrust.io to verify older version of transferable documents.">
          <Info className="text-orange-500" />
        </TooltipIcon>
        <span className="ml-1">
          {" "}
          Please visit <span className="text-blue-500">{URLS.REF}</span> to verify older version of transferable
          documents.
        </span>
      </div>
    </div>
  );
};
