import React, { FunctionComponent } from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { useDemoFormContext } from "../DemoFormContext";

export const DemoCreateButtonRow: FunctionComponent = () => {
  const { currentStep, setCurrentStep } = useDemoFormContext();

  return (
    <div className="flex justify-center pt-12 pb-3">
      <Button
        data-testid="demo-create-button-back"
        className="mx-12 bg-white text-cerulean hover:bg-cloud-200"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </Button>
      <Button
        data-testid="demo-create-button-next"
        className="mx-12 bg-cerulean text-white hover:bg-cerulean-500"
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        Next
      </Button>
    </div>
  );
};
