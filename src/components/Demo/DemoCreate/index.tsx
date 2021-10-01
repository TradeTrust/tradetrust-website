import React, { FunctionComponent, useState } from "react";
import { DemoCreateForm } from "./DemoCreateForm";
import { data } from "./DemoCreateForm/data";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";
import { DemoFormContext } from "./DemoFormContext";

export const DemoCreate: FunctionComponent = () => {
  const components = [
    <DemoCreateStart key="start" />,
    <DemoCreateForm key="form" />,
    <DemoCreateReview key="review" />,
    <DemoCreateIssue key="issue" />,
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(data);

  return (
    <>
      <DemoCreateHeader />
      <DemoFormContext.Provider value={{ formValues, setFormValues, currentStep, setCurrentStep }}>
        {components[currentStep]}
      </DemoFormContext.Provider>
    </>
  );
};
