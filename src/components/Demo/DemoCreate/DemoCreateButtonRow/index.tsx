import React from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { useContext } from "react";
import { DemoFormContext } from "../DemoFormContext";

export const DemoCreateButtonRow = () => {
  const { setCurrentStep } = useContext(DemoFormContext);

  return (
    <div className="flex justify-center">
      <Button onClick={() => setCurrentStep((step) => step - 1)}>Back</Button>
      <Button onClick={() => setCurrentStep((step) => step + 1)}>Next</Button>
    </div>
  );
};
