import { Button, LoaderSpinner, ProgressBar } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { XCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentPrepared, wrappingDocument } from "../../../../reducers/demo-create";
import { DemoCreateContext } from "../contexts/DemoCreateContext";
import { DemoFormContext } from "../contexts/DemoFormContext";
import { DemoCreateButtonRow } from "../DemoCreateButtonRow";
import { schema } from "../DemoCreateForm/schema";
import { FormItemSchema } from "../DemoCreateForm/types";
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
  const isImageData = (value: string) => {
    return value && value.slice(0, 10) === "data:image";
  };

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

  const formValue = getFormValue(formValues, name);

  let renderedFormValue = <p>{formValue}</p>;

  if (isImageData(formValue)) {
    renderedFormValue = <img src={formValue} className="h-24" />;
  }

  return (
    <div className="my-5">
      <h4 className="mb-2">{title}</h4>
      {renderedFormValue}
    </div>
  );
};

export const DemoCreateReview: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { formValues } = useContext(DemoFormContext);
  const { setActiveStep } = useContext(DemoCreateContext);

  const { prepared, error } = useSelector(getDocumentPrepared);

  const handleBack = () => {
    setActiveStep("form");
  };

  const handleNext = () => {
    dispatch(wrappingDocument(formValues));
    setActiveStep("issue");
  };

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
      <div className="border-t border-cloud-300">
        {!prepared && !error && (
          <div className="pt-12 pb-3 text-center">
            <LoaderSpinner className="mx-auto" width="36px" primary="#3B8CC5" />
            <h3 className="ml-2 my-2">Preparing to issue</h3>
          </div>
        )}
        {prepared && <DemoCreateButtonRow onBack={handleBack} onNext={handleNext} />}

        {error && (
          <div className="pt-12 pb-3 text-center">
            <XCircle className="text-rose h-12 w-12" />
            <h3 className="my-2">We encountered an error</h3>
            <Button onClick={handleBack} className="bg-cerulean text-white hover:bg-cerulean-500">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
