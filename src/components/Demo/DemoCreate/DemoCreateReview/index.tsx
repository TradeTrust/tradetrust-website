import { ProgressBar } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProviderContext } from "../../../../common/contexts/provider";
import {
  getIssuedDocumentStatus,
  getWrappedDocumentStatus,
  issuingDocument,
  wrappingDocument,
} from "../../../../reducers/demo-create";
import { LoadingModal } from "../../LoadingModal";
import { DemoCreateContext } from "../contexts/DemoCreateContext";
import { DemoFormContext } from "../contexts/DemoFormContext";
import { DemoCreateButtonRow } from "../DemoCreateButtonRow";
import { schema } from "../DemoCreateForm/schema";
import { FormItemSchema } from "../DemoCreateForm/types";
import { getFormValue, isImageData } from "../utils";

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
  const { setActiveStep } = useContext(DemoCreateContext);
  const { formValues } = useContext(DemoFormContext);
  const { getTransactor } = useProviderContext();
  const wrapDocumentStatus = useSelector(getWrappedDocumentStatus);
  const issueDocumentStatus = useSelector(getIssuedDocumentStatus);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleBack = () => {
    setActiveStep("form");
  };

  const handleNext = () => {
    setLoading(true);
    dispatch(wrappingDocument(formValues));
  };

  useEffect(() => {
    const provider = getTransactor();
    if (wrapDocumentStatus !== null && wrapDocumentStatus === "success") {
      dispatch(issuingDocument(provider));
    }
  }, [wrapDocumentStatus, dispatch, getTransactor]);

  useEffect(() => {
    if (issueDocumentStatus !== null && issueDocumentStatus !== "pending") {
      setActiveStep("issue");
    }
  }, [issueDocumentStatus, setActiveStep]);

  return (
    <>
      {loading && (
        <LoadingModal
          title="Issuing Document"
          content={
            <p>
              Please do not navigate out of this demo
              <br />
              This process might take a while
            </p>
          }
        />
      )}
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
        <DemoCreateButtonRow onBack={handleBack} onNext={handleNext} />
      </div>
    </>
  );
};
