import React, { FunctionComponent, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Card } from "../../UI/Card";
import { DynamicForm } from "../DynamicForm";
import { DynamicFormHeader } from "../DynamicFormHeader";
import { FormErrors } from "../../../types";
import { TransferableRecordForm } from "../TransferableRecordForm";
import { OnCloseGuard } from "../../OnCloseGuard";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import { useConfigContext } from "../../../common/contexts/ConfigContext";
import { getDataToValidate, validateData } from "../../../common/utils/dataHelpers";

export const DynamicFormLayout: FunctionComponent = () => {
  const {
    setForm,
    currentForm,
    currentFormTemplate,
    setCurrentFormData,
    setCurrentFormOwnership,
    setCurrentFormRemarks,
    setCurrentForm,
  } = useFormsContext();
  const { setConfig } = useConfigContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>(null);
  const history = useHistory();

  if (!currentForm) return <Redirect to="/creator" />;
  if (!currentFormTemplate) return <Redirect to="/creator" />;
  if (isSubmitted) {
  }

  const { schema: formSchema, uiSchema, fileName } = currentFormTemplate;
  const attachmentAccepted = !!currentFormTemplate.attachments?.allow;
  const attachmentAcceptedFormat = currentFormTemplate.attachments?.accept;

  const validateCurrentForm = (): boolean => {
    const dataToValidate = getDataToValidate(currentForm.data.formData);
    const { isValid, ajvErrors } = validateData(currentForm.data.schema, dataToValidate);
    setFormErrors(ajvErrors);
    return isValid;
  };

  const onFormSubmit = (): void => {
    if (validateCurrentForm()) setIsSubmitted(true);
  };

  const onBackToFormSelection = (): void => {
    setForm(undefined);
    setConfig(undefined);
    history.push("/creator");
  };

  return (
    <OnCloseGuard active={true}>
      <DynamicFormHeader
        onBackToFormSelection={onBackToFormSelection}
        onFormSubmit={onFormSubmit}
        formErrors={formErrors}
        formErrorTitle="Field(s) Error"
      />
      {currentFormTemplate.type === "TRANSFERABLE_RECORD" && (
        <Card>
          <TransferableRecordForm
            beneficiaryAddress={currentForm.ownership.beneficiaryAddress}
            holderAddress={currentForm.ownership.holderAddress}
            remarks={currentForm.remarks}
            setBeneficiaryAddress={(beneficiaryAddress) =>
              setCurrentFormOwnership({
                beneficiaryAddress,
                holderAddress: currentForm.ownership.holderAddress,
              })
            }
            setHolderAddress={(holderAddress) =>
              setCurrentFormOwnership({
                beneficiaryAddress: currentForm.ownership.beneficiaryAddress,
                holderAddress,
              })
            }
            setRemarks={(remarks) => setCurrentFormRemarks(remarks)}
          />
        </Card>
      )}
      <Card>
        <h4 className="pb-4">{currentFormTemplate.name}</h4>
        <DynamicForm
          className="mt-6"
          schema={formSchema}
          uiSchema={uiSchema}
          form={currentForm}
          setFormData={setCurrentFormData}
          setCurrentForm={setCurrentForm}
          attachmentAccepted={attachmentAccepted}
          attachmentAcceptedFormat={attachmentAcceptedFormat}
          fileName={fileName}
        />
      </Card>
    </OnCloseGuard>
  );
};
