import React from "react";

import { DemoCreateFormItem } from ".";

export default {
  title: "Demo/FormItem",
  component: DemoCreateFormItem,
  parameters: {
    componentSubtitle: "Various type for the form item in the demo form",
  },
};

export const FormItemAccordion = () => {
  return (
    <DemoCreateFormItem
      formItem={{
        type: "object",
        uiType: "accordion",
        title: "Form Item Accordion",
      }}
      formItemName=""
      onChange={() => {}}
    />
  );
};

export const FormItemWithLabel = () => {
  return (
    <DemoCreateFormItem
      formItem={{
        type: "string",
        uiType: "withLabel",
        title: "Form Item With Label",
      }}
      formItemName=""
      onChange={() => {}}
    />
  );
};

export const FormItemWithoutLabel = () => {
  return (
    <DemoCreateFormItem
      formItem={{
        type: "string",
        uiType: "withoutLabel",
        title: "Form Item Without Label",
      }}
      formItemName=""
      onChange={() => {}}
    />
  );
};