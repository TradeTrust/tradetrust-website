import { ProgressBar } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { DemoCreateButtonRow } from "../DemoCreateButtonRow";
import { schema } from "../DemoCreateForm/schema";
import { FormItemSchema } from "../DemoCreateForm/types";
import { DemoFormContext } from "../DemoFormContext";
import { getFormValue } from "../utils";

const DemoCreateReviewItem = ({
  title,
  properties,
  name,
}: {
  title: string;
  properties?: Record<string, any>;
  name: string;
}) => {
  const { formValues } = useContext(DemoFormContext);
  if (properties !== undefined) {
    return (
      <>
        {Object.entries(properties).map(([itemName, item]) => {
          const _name = `${name}.${itemName}`;

          return <DemoCreateReviewItem key={_name} name={_name} title={item.title} properties={item.properties} />;
        })}
      </>
    );
  }

  return (
    <div className="my-5">
      <h4>{title}</h4>
      <p>{getFormValue(formValues, name)}</p>
    </div>
  );
};

export const DemoCreateReview: FunctionComponent = () => {
  return (
    <>
      <ProgressBar totalSteps={3} step={2} />
      <div className="my-4">
        <h3 className="my-3">Fill in Details of CoO</h3>
        <p>The form is already pre-filled for your convenience, feel free to make changes if needed. </p>
      </div>
      <div>
        {Object.entries(schema).map(([itemName, item]) => {
          const _item = item as FormItemSchema;

          return (
            <DemoCreateReviewItem key={itemName} name={itemName} title={_item.title} properties={_item.properties} />
          );
        })}
      </div>
      <DemoCreateButtonRow />
    </>
  );
};
