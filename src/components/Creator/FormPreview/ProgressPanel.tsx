import { ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Button } from "../../Button";

export const ProgressPanel: FunctionComponent = () => {
  return (
    <div className="p-2">
      <div className="p-2">
        <ProgressBar step={1} totalSteps={3} />
      </div>
      <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center gap-2.5">
        <div className="p-2 ">
          <h3 data-testid="form-selection-title">Preview Form</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-center md:w-1/2 p-1">
          <div className="p-1  w-full">
            <Button className="flex-1 w-full bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px]">Previous</Button>
          </div>
          <div className="p-1 w-full">
            <Button className="flex-1 w-full bg-cerulean-500 text-white hover:bg-cerulean-800">Issue Document</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
