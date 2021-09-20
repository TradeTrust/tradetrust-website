import { Button, ProgressBar } from "@govtechsg/tradetrust-ui-components";
import React, { useContext } from "react";
import { DemoCreateButtonRow } from "../DemoCreateButtonRow";
import { schema } from "../DemoCreateForm/schema";
import { FormItemSchema } from "../DemoCreateForm/types";
import { DemoFormContext } from "../DemoFormContext";
import { getFormValue } from "../utils";

const DemoCreateReviewItem = ({ title, properties, name }: { title: string; properties?: object; name: string }) => {
  const { formValues } = useContext(DemoFormContext);
  if (properties !== undefined) {
    return (
      <>
        {Object.entries(properties).map(([itemName, item]) => {
          return <DemoCreateReviewItem name={`${name}.${itemName}`} title={item.title} properties={item.properties} />;
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

export const DemoCreateReview = () => {
  return (
    <>
      <ProgressBar totalSteps={3} step={2} />
      <h3>Fill in Details of CoO</h3>
      <p>The form is already pre-filled for your convenience, feel free to make changes if needed. </p>
      <div>
        {Object.entries(schema).map(([itemName, item]) => {
          const _item = item as FormItemSchema;

          return <DemoCreateReviewItem name={itemName} title={_item.title} properties={_item.properties} />;
        })}
      </div>
      <DemoCreateButtonRow />
    </>
  );
};
