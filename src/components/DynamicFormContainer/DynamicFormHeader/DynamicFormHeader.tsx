import { Button, ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useState } from "react";
import { Card } from "../../UI/Card";
import { FormErrors } from "../../../types";
import { FormErrorBanner } from "../FormErrorBanner";
import { BackModal } from "../BackModal";

interface DynamicFormHeaderProps {
  onBackToFormSelection: () => void;
  onFormSubmit: () => void;
  formErrors: FormErrors;
  formErrorTitle: string;
}

export const DynamicFormHeader: FunctionComponent<DynamicFormHeaderProps> = ({
  onBackToFormSelection,
  onFormSubmit,
  formErrors,
  formErrorTitle,
}) => {
  const [showBackModal, setShowBackModal] = useState(false);

  const closeBackModal = () => {
    setShowBackModal(false);
  };

  return (
    <Card>
      <ProgressBar step={1} totalSteps={3} />
      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <h3 data-testid="fill-form-title" className="text-xl flex-1 min-w-[150px]">
          Fill Form
        </h3>
        <div className="flex-1 flex gap-4 min-w-[200px]">
          <Button
            className="w-full bg-white text-cerulean-500 hover:bg-cloud-100"
            onClick={() => setShowBackModal(true)}
            data-testid="form-cancel-button"
          >
            Cancel
          </Button>
          <Button
            className="w-full bg-cerulean-500 text-white hover:bg-cerulean-800"
            onClick={onFormSubmit}
            data-testid="form-submit-button"
          >
            Next
          </Button>
          <BackModal show={showBackModal} backToFormSelection={onBackToFormSelection} closeBackModal={closeBackModal} />
        </div>
      </div>
      <FormErrorBanner formErrorTitle={formErrorTitle} formErrors={formErrors} />
    </Card>
  );
};
