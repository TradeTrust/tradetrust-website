import { Input } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { FunctionComponent } from "react";
import { AccordionItem } from "../../../../UI/Accordion";
import { getFormValue } from "../../utils";
import { data } from "../data";
import { FormItemSchema } from "../types";

interface DemoCreateFormItemProps {
  onChange: (name: string, value: string) => void;
  formItem: FormItemSchema;
  formItemName: string;
}

export const DemoCreateFormItem: FunctionComponent<DemoCreateFormItemProps> = ({
  formItem,
  formItemName,
  onChange,
}) => {
  const renderProperties = () => {
    if (formItem.type === "object" && formItem.properties) {
      return Object.entries(formItem.properties).map(([name, item]) => {
        //join by . delimiter to parse later
        const itemName = `${formItemName}.${name}`;

        return <DemoCreateFormItem key={name} onChange={onChange} formItemName={itemName} formItem={item} />;
      });
    }
  };

  const renderInput = () => {
    if (formItem.type === "string") {
      const defaultValue = getFormValue(data, formItemName);

      return (
        <Input
          className="w-full"
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          name={formItemName}
          placeholder={formItem.uiType === "withoutLabel" ? formItem.title : undefined}
        />
      );
    }
  };

  switch (formItem.uiType) {
    case "accordion":
      return (
        <AccordionItem
          classNameContent="pt-6"
          classNameContainer="py-5 border-t border-cloud-300"
          heading={formItem.title}
          headingTag="h3"
        >
          {renderInput()}
          {renderProperties()}
        </AccordionItem>
      );
    case "withLabel":
      return (
        <div className="mb-5">
          <h4 className="mb-1">{formItem.title}</h4>
          {renderInput()}
          {renderProperties()}
        </div>
      );
    default:
      return (
        <div className="mb-5">
          {renderInput()}
          {renderProperties()}
        </div>
      );
  }
};
