import _ from "lodash";
import React, { createContext, FunctionComponent, useContext, useState } from "react";
import { useConfigContext } from "./ConfigContext";
import { Config, FormData, FormEntry, FormTemplate, Ownership, SetFormParams } from "../../types";

interface FormsContext {
  form?: FormEntry;
  currentForm?: FormEntry;
  currentFormData?: FormData;
  currentFormOwnership?: Ownership;
  currentFormRemarks?: string;
  currentFormTemplate?: FormTemplate;
  setForm: (form?: FormEntry) => void;
  newForm: (config: Config) => void;
  newPopulatedForm: (formData: Array<FormEntry>, fileName?: string) => void;
  setCurrentFormData: (formData: FormData) => void;
  setCurrentFormOwnership: (ownership: Ownership) => void;
  setCurrentFormRemarks: (remarks: string) => void;
  setCurrentFileName: (fileName: string) => void;
  setCurrentForm: (arg: SetFormParams) => void;
}

export const FormsContext = createContext<FormsContext>({
  form: undefined,
  setForm: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  newForm: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  newPopulatedForm: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setCurrentFormData: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setCurrentFormOwnership: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setCurrentFormRemarks: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setCurrentFileName: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setCurrentForm: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export const useFormsContext = (): FormsContext => useContext<FormsContext>(FormsContext);

export const FormsContextProvider: FunctionComponent = ({ children }) => {
  const [form, setForm] = useState<FormEntry | undefined>(undefined);
  const { config } = useConfigContext();
  const currentForm = form;
  const currentFormData = currentForm?.data;
  const currentFormOwnership = currentForm?.ownership;
  const currentFormRemarks = currentForm?.remarks;
  const currentFormTemplate = currentForm ? config?.forms : undefined;

  const newForm = (newConfig: Config): void => {
    const newFormTemplate = newConfig?.forms;
    const newFormName = newFormTemplate?.name ?? "Document";
    const extension = newConfig?.forms?.extension ?? "tt";

    setForm({
      data: {
        formData: newFormTemplate?.defaults || {},
        schema: newFormTemplate?.schema,
      },
      fileName: `${newFormName}-1`,
      ownership: { beneficiaryAddress: "", holderAddress: "" },
      remarks: "",
      extension: extension,
    });
  };

  const newPopulatedForm = (data: Array<FormEntry>, fileName?: string): void => {
    try {
      const newFormTemplate = config?.forms && config?.forms;
      const extension = (config?.forms && config?.forms?.extension) ?? "tt";
      const newFormName = fileName
        ? _.template(fileName)(data[0])
        : `${newFormTemplate?.name.replace(/\s+/g, "-") ?? "Document"}-${1}`;
      const updatedCurrentForm = {
        ...currentForm,
        data: {
          formData: data[0],
          schema: newFormTemplate?.schema,
        },
        fileName: newFormName,
        ownership: data[0].ownership ?? { beneficiaryAddress: "", holderAddress: "" },
        extension: extension,
      } as FormEntry;

      setForm(updatedCurrentForm);
    } catch (e) {
      if (e instanceof ReferenceError) {
        throw new Error("failed to interpolate data properties, could not find data properties in configuration file.");
      }
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCurrentFormData = (data: any): void => {
    setCurrentForm({ data });
  };

  const setCurrentFormOwnership = ({ beneficiaryAddress, holderAddress }: Ownership): void => {
    setCurrentForm({ data: undefined, updatedOwnership: { beneficiaryAddress, holderAddress } });
  };

  const setCurrentFormRemarks = (remarks: string): void => {
    setCurrentForm({ data: undefined, updatedRemarks: remarks });
  };

  const setCurrentFileName = (fileName: string): void => {
    setCurrentForm({ data: undefined, updatedOwnership: undefined, fileName });
  };

  const setCurrentForm = ({ data, updatedOwnership, updatedRemarks, fileName }: SetFormParams): void => {
    try {
      const updatedCurrentForm = {
        ...currentForm,
        data: data ?? currentForm?.data,
        ownership: updatedOwnership ?? currentForm?.ownership,
        remarks: updatedRemarks ?? currentForm?.remarks,
        fileName: fileName ? _.template(fileName)(data?.formData) : currentForm?.fileName.replace(/\s+/g, "-"),
      } as FormEntry;
      setForm(updatedCurrentForm);
    } catch (e) {
      if (e instanceof ReferenceError) {
        throw new Error("failed to interpolate data properties, could not find data properties in configuration file.");
      }
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  return (
    <FormsContext.Provider
      value={{
        form,
        currentForm,
        currentFormData,
        currentFormOwnership,
        currentFormRemarks,
        currentFormTemplate,
        setCurrentFormData,
        setCurrentFormOwnership,
        setCurrentFormRemarks,
        newForm,
        newPopulatedForm,
        setForm,
        setCurrentFileName,
        setCurrentForm,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};
