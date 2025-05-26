import { ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { QueueState } from "../../../constants/QueueState";
import { FormErrors } from "../../../types";
import { Button } from "../../Button";
import { FormErrorBanner } from "../../DynamicFormContainer/FormErrorBanner";
import { Card } from "../../UI/Card";

interface FormHeaderPanelProps {
  step: number;
  totalSteps?: number;
  title: string | ReactElement;
  formErrors?: FormErrors;
  formErrorTitle?: string;
  previousRoute?: string;
  nextRoute?: string;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  showErrorBanner?: boolean;
  queueState?: QueueState;
  processAnotherDocumentFn?: MouseEventHandler<HTMLButtonElement>;
}

export const FormHeaderPanel: FunctionComponent<FormHeaderPanelProps> = ({
  step,
  totalSteps = 3,
  title,
  formErrors = null,
  formErrorTitle = "Field(s) Error",
  previousRoute,
  nextRoute,
  previousLabel = "Previous",
  nextLabel = "Next",
  onPrevious,
  onNext,
  showErrorBanner = false,
  queueState,
  processAnotherDocumentFn,
}) => {
  const history = useHistory();

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (previousRoute) {
      history.push(previousRoute);
    } else {
      console.warn("No previous route or previous callback provided");
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextRoute) {
      history.push(nextRoute);
    } else {
      console.warn("No next route or next callback provided");
    }
  };

  return (
    <Card>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <div className="my-8 flex flex-col xs:flex-row flex-wrap items-start xs:items-center justify-between gap-4">
        <h3
          data-testid={`${title.toString().toLowerCase().replace(/\s+/g, "-")}-title`}
          className="text-xl flex-1 flex min-w-[150px]"
        >
          {title}
        </h3>
        <div className="flex flex-row flex-wrap gap-4">
          {step < 3 && (
            <>
              <Button
                className="w-full xs:w-auto min-w-64 bg-white text-cerulean-500 hover:bg-cloud-100"
                onClick={handlePrevious}
                data-testid="form-previous-button"
              >
                {previousLabel}
              </Button>
              <Button
                className="w-full xs:w-auto min-w-64 bg-cerulean-500 text-white hover:bg-cerulean-800"
                onClick={handleNext}
                data-testid="form-next-button"
              >
                {nextLabel}
              </Button>
            </>
          )}
          {step === 3 && queueState === QueueState.CONFIRMED && processAnotherDocumentFn && (
            <Button
              className="w-full xs:w-auto min-w-64 bg-cerulean-500 text-white hover:bg-cerulean-800"
              data-testid="process-another-document-button"
              onClick={processAnotherDocumentFn}
            >
              Create Another Document
            </Button>
          )}
        </div>
      </div>
      {showErrorBanner && <FormErrorBanner formErrorTitle={formErrorTitle} formErrors={formErrors} />}
    </Card>
  );
};
