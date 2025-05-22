import { ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Button } from "../../Button";
import { useHistory } from "react-router-dom";

export const ProgressPanel: FunctionComponent = () => {
  const history = useHistory();
  return (
    <>
      <ProgressBar step={2} totalSteps={3} />
      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <h3 data-testid="form-selection-title" className="text-xl flex-1 min-w-[150px]">
          Preview Form
        </h3>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-center md:w-1/2 p-1">
          <div className="p-1  w-full">
            <Button
              onClick={() => history.push("/creator/form")}
              className="flex-1 w-full bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px]"
            >
              Previous
            </Button>
          </div>
          <div className="p-1 w-full">
            <Button
              onClick={() => history.push("/creator/publish")}
              className="flex-1 w-full bg-cerulean-500 text-white hover:bg-cerulean-800"
            >
              Issue Document
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
