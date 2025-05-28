import React, { FunctionComponent, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { betterAjvErrors, ValidationError } from "@apideck/better-ajv-errors";
import { Card } from "../../UI/Card";
import { DynamicForm } from "../DynamicForm";
import { FormHeaderPanel } from "../../Creator/FormHeaderPanel";
import { FormErrors } from "../../../types";
import { FormTransferableRecordPanel } from "../../Creator/FormTransferableRecordPanel";
import { OnCloseGuard } from "../../OnCloseGuard";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import { useConfigContext } from "../../../common/contexts/ConfigContext";
import { getDataToValidate, validateData } from "../../../common/utils/dataHelpers";
import { isEthereumAddress } from "../../../utils";
import { NetworkPanel } from "../../Creator/NetworkPanel";
import { BackModal } from "../BackModal";

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
  const { setConfig, config } = useConfigContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>(null);
  const [showBackModal, setShowBackModal] = useState(false);
  const history = useHistory();

  if (!currentForm) return <Redirect to="/creator" />;
  if (!currentFormTemplate) return <Redirect to="/creator" />;
  if (isSubmitted) return <Redirect to="/creator/form-preview" />;

  const { schema: formSchema, uiSchema, fileName } = currentFormTemplate;
  const attachmentAccepted = !!currentFormTemplate?.attachments?.allow;
  const attachmentAcceptedFormat = currentFormTemplate?.attachments?.accept;

  const validateCurrentForm = (): boolean => {
    const dataToValidate = getDataToValidate(currentForm.data.formData);

    let parsedData = dataToValidate;
    // check if attachments are allowed
    if (!currentForm.data.schema?.properties?.attachments && config?.forms?.attachments?.allow) {
      parsedData = {
        ...dataToValidate,
      };
      // remove attachments if allowed, as attachments are not part of the schema
      if (dataToValidate?.attachments) {
        delete parsedData.attachments;
      }
    }

    const { ajvErrors } = validateData(currentForm.data.schema, parsedData);
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

  const handleOnCancel = (): void => {
    setShowBackModal(true);
  };

  return (
    <>
      <OnCloseGuard active={true}>
        <NetworkPanel isTransferableRecord={currentFormTemplate.type === "TRANSFERABLE_RECORD"} />
        <FormHeaderPanel
          step={1}
          title="Fill Form"
          onPrevious={handleOnCancel}
          onNext={onFormSubmit}
          formErrors={formErrors}
          showErrorBanner={true}
          formErrorTitle="Field(s) Error"
          nextLabel="Next"
          previousLabel="Cancel"
        />
        {currentFormTemplate.type === "TRANSFERABLE_RECORD" && (
          <Card>
            <FormTransferableRecordPanel
              mode="edit"
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
              fileName={currentFormTemplate.fileName}
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
      <BackModal
        show={showBackModal}
        backToFormSelection={onBackToFormSelection}
        closeBackModal={() => setShowBackModal(false)}
      />
    </>
  );
};
