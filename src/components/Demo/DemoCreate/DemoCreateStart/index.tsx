import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { useDemoFormContext } from "../DemoFormContext";

export const DemoCreateStart: FunctionComponent = () => {
  const { currentStep, setCurrentStep } = useDemoFormContext();

  return (
    <>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      <Button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="bg-cerulean text-white mt-8 hover:bg-cerulean-300"
      >
        Start Now
      </Button>
    </>
  );
};
