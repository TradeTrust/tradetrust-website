import React, { createContext, ReactChildren, useContext, useState } from "react";
import { data } from "./DemoCreateForm/data";

interface DemoFormContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formValues: any;
  setFormValues: (formValues: any) => void;
}

export const DemoFormContext = createContext<DemoFormContextProps>({
  currentStep: 0,
  setCurrentStep: () => {
    return null;
  },
  formValues: data,
  setFormValues: () => {
    return null;
  },
});

export const DemoFormProvider: any = ({ children }: { children: ReactChildren }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(data);

  return (
    <DemoFormContext.Provider value={{ formValues, setFormValues, currentStep, setCurrentStep }}>
      {children}
    </DemoFormContext.Provider>
  );
};

export const useDemoFormContext = (): DemoFormContextProps => useContext<DemoFormContextProps>(DemoFormContext);
