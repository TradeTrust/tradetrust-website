import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { DemoFormContext } from "../DemoFormContext";

export const DemoCreateStart: FunctionComponent = () => {
  const { setCurrentStep } = useContext(DemoFormContext);

  return (
    <>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      <Button
        onClick={() => setCurrentStep((step) => step + 1)}
        className="bg-cerulean text-white mt-8 hover:bg-cerulean-300"
      >
        Start Now
      </Button>
    </>
  );
};
