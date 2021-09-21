import React, { FunctionComponent } from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { useContext } from "react";
import { DemoFormContext } from "../DemoFormContext";

export const DemoCreateButtonRow: FunctionComponent = () => {
  const { setCurrentStep } = useContext(DemoFormContext);

  return (
    <div className="flex justify-center pt-12 pb-3">
      <Button
        className="mx-12 bg-white text-cerulean hover:bg-cloud-200"
        onClick={() => setCurrentStep((step) => step - 1)}
      >
        Back
      </Button>
      <Button
        className="mx-12 bg-cerulean text-white hover:bg-cerulean-500"
        onClick={() => setCurrentStep((step) => step + 1)}
      >
        Next
      </Button>
    </div>
  );
};
