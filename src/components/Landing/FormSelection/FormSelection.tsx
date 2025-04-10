import React, { FunctionComponent, useState } from "react";
import { FormSelect } from "../FormSelect";
import { ChevronDown, ChevronUp } from "react-feather";
import { Card } from "../../UI/Card";

interface FormSelection {
  forms: any;
  formTypes: string[];
}

export const FormSelection: FunctionComponent<FormSelection> = ({ forms, formTypes }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const toggleExpand = (typeID: number) => {
    setExpanded((prev) => ({
      ...prev,
      [typeID]: !prev[typeID],
    }));
  };
  const onAddForm = (form: any) => {
    console.log("onFormSelect", form);
  };

  return (
    <Card>
      <div className="p-4">
        <h4 data-testid="form-selection-title" className="font-bold mb-4">
          Select Document to preview or create
        </h4>
      </div>
      {formTypes.map((type: string, typeID: number) => (
        <>
          <div key={typeID}>
            <div className="flex items-center gap-4 py-8 px-3">
              <div
                onClick={() => toggleExpand(typeID)}
                className="flex items-center justify-center w-9 h-9 p-2 border border-gray-200 rounded-xl cursor-pointer"
              >
                {expanded[typeID] ? (
                  <ChevronUp className="text-cerulean-500 hover:text-cerulean-1000 transition-transform duration-500" />
                ) : (
                  <ChevronDown className="text-cerulean-500 hover:text-cerulean-1000 transition-transform duration-500" />
                )}
              </div>
              <h3 className="ml-4">{type} Documents</h3>
            </div>
            <div
              id="forms-view"
              className={`transition-all duration-500 ease-in-out ${
                expanded[typeID] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div id={"forms-view"} className="flex flex-wrap justify-start">
                {forms
                  .filter((form: any) => form.type === type)
                  .map((form: any, index: number) => (
                    <div key={`form-select-${index}`} className="w-full md:w-1/4 mb-4 h-80">
                      <FormSelect id={`form-select-${index}`} form={form} onAddForm={() => onAddForm(index)} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {formTypes.length > typeID + 1 && <hr className="mt-8" />}
        </>
      ))}
    </Card>
  );
};
