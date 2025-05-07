import React, { FunctionComponent, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { betterAjvErrors, ValidationError } from "@apideck/better-ajv-errors";
import { Card } from "../../UI/Card";
import { DynamicForm } from "../DynamicForm";
import { DynamicFormHeader } from "../DynamicFormHeader";
import { FormErrors } from "../../../types";
import { TransferableRecordForm } from "../TransferableRecordForm";
import { OnCloseGuard } from "../../OnCloseGuard";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import { useConfigContext } from "../../../common/contexts/ConfigContext";
import { getDataToValidate, validateData } from "../../../common/utils/dataHelpers";
import { isEthereumAddress } from "../../../utils";
import ConnectToMetamask from "../../ConnectToMetamask";

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
    const { ajvErrors } = validateData(currentForm.data.schema, dataToValidate);
    const { beneficiaryAddress, holderAddress } = currentForm.ownership;

    const customErrors = getAddressErrors(currentFormTemplate.type, {
      beneficiaryAddress,
      holderAddress,
    });

    const ajvFormattedErrors =
      betterAjvErrors({
        schema: currentForm.data.schema,
        data: dataToValidate,
        errors: ajvErrors || [],
        basePath: "Form",
      }) || [];

    const allFormattedErrors = [...ajvFormattedErrors, ...customErrors];
    setFormErrors(allFormattedErrors);

    return allFormattedErrors.length === 0;
  };

  const getAddressErrors = (
    type: string,
    addresses: { beneficiaryAddress: string; holderAddress: string }
  ): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (type === "TRANSFERABLE_RECORD") {
      if (!isEthereumAddress(addresses.beneficiaryAddress)) {
        errors.push({
          message: "Invalid Ethereum address for 'owner wallet address'",
          path: "ownerWalletAddress",
          context: {
            errorType: "format",
            invalidProperty: "owner wallet address",
          },
        });
      }

      if (!isEthereumAddress(addresses.holderAddress)) {
        errors.push({
          message: "Invalid Ethereum address for 'holder wallet address'",
          path: "holderWalletAddress",
          context: {
            errorType: "format",
            invalidProperty: "holder wallet address",
          },
        });
      }
    }

    return errors;
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
      {currentFormTemplate.type === "TRANSFERABLE_RECORD" && (
        <Card>
          <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center">
            <div>
              <h6>Selected Network:</h6>
              <p>Mainnet Network</p>
            </div>
            <ConnectToMetamask />
          </div>
        </Card>
      )}
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
