import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useState } from "react";
import { DemoCreateForm } from "./DemoCreateForm";
import { data } from "./DemoCreateForm/data";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";
import { DemoFormContext, DemoFormContextProps } from "./DemoFormContext";

export const DemoCreate: FunctionComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(data);

  const value = { formValues, setFormValues, currentStep, setCurrentStep } as DemoFormContextProps;

  const components = [<DemoCreateStart />, <DemoCreateForm />, <DemoCreateReview />];

  return (
    <>
      <DemoCreateHeader />
      <DemoFormContext.Provider value={value}>{components[currentStep]}</DemoFormContext.Provider>
    </>
  );
};
