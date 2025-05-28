import React, { FunctionComponent } from "react";
import { FormSelect } from "./FormSelect";

export const FormSelectSample: FunctionComponent = () => {
  return (
    <FormSelect
      form={{ name: "Form 1", img: "/static/creator/bill_of_lading.png" }}
      onCreateDocumentClick={() => {}}
      data-testid="1"
    />
  );
};

export default {
  title: "Creator/FormSelect",
  component: FormSelectSample,
  parameters: {
    componentSubtitle: "FormSelect",
  },
};
