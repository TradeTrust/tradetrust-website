import { createContext } from "react";
import { data } from "./DemoCreateForm/data";

export interface DemoFormContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const defaultContext = {
  currentStep: 0,
  setCurrentStep: () => {},
  formValues: data,
  setFormValues: () => {},
};

export const DemoFormContext = createContext<DemoFormContextProps>(defaultContext);
