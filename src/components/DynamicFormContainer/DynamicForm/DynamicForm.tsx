import { cloneDeep, debounce } from "lodash";
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Form from "@rjsf/core";
import { FormEntry, FormTemplate, SetFormParams, ProcessedFiles } from "../../../types";
import { DataFileButton } from "../DataFileButton";
import { DocumentNameInput } from "../DocumentNameInput";
import { AttachmentDropzone } from "./AttachmentDropzone";
import {
  CustomFieldTemplate,
  CustomObjectFieldTemplate,
  CustomArrayFieldTemplate,
  CustomTextareaWidget,
  CustomDropdownWidget,
  CustomColorWidget,
  CustomFileWidget,
} from "./CustomTemplates";
import { Accept } from "react-dropzone";
import { useFormsContext } from "../../../common/contexts/FormsContext";

export interface DynamicFormProps {
  schema: FormTemplate["schema"];
  attachmentAccepted: boolean;
  attachmentAcceptedFormat?: Accept;
  form: FormEntry;
  className?: string;
  setFormData: (formData: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  setCurrentForm: (arg: SetFormParams) => void;
  uiSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  fileName?: string;
}

export const DynamicForm: FunctionComponent<DynamicFormProps> = ({
  schema,
  uiSchema,
  form,
  setFormData,
  setCurrentForm,
  className,
  attachmentAccepted,
  fileName,
  attachmentAcceptedFormat = {},
}) => {
  const { data } = form;
  const { newPopulatedForm, currentForm, setCurrentFileName } = useFormsContext();
  const [newFileName, setNewFileName] = useState(currentForm?.fileName);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setNewFileName(currentForm?.fileName);
    }
  }, [currentForm?.fileName]);

  const debouncedChange = useMemo(
    () =>
      debounce((val) => {
        setCurrentFileName(val);
      }, 400),
    [setCurrentFileName]
  );

  const handleChangeFileName = useCallback(
    (e) => {
      setNewFileName(e.target.value);
      debouncedChange(e.target.value);
    },
    [debouncedChange]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeFormValue = (value: any): void => {
    // If value is an array, call function to get the first item and replace the values of the existing form
    if (Array.isArray(value)) {
      newPopulatedForm(value, fileName);
    } else {
      // But if it's just one object, we'll replace the values of the existing form (i.e. original behaviour)
      setCurrentForm({
        data: { ...data, formData: value?.data || data.formData },
        updatedOwnership: value?.ownership,
        fileName,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setAttachments = (attachments: any): void => {
    const currentFormData = cloneDeep(data.formData);
    setFormData({
      ...data,
      formData: { ...currentFormData, attachments },
    });
  };

  const handleUpload = (processedFiles: ProcessedFiles[]): void => {
    const attachedFile = data.formData.attachments || [];
    const nextAttachment = [...attachedFile, ...processedFiles];
    setAttachments(nextAttachment);
  };

  const handleRemoveUpload = (fileIndex: number): void => {
    const nextAttachment = data.formData.attachments.filter(
      (_file: ProcessedFiles, index: number) => index !== fileIndex
    );
    setAttachments(nextAttachment);
  };

  const widgets = {
    TextareaWidget: CustomTextareaWidget,
    SelectWidget: CustomDropdownWidget,
    ColorWidget: CustomColorWidget,
    FileWidget: CustomFileWidget,
  };

  return (
    <div className={`${className}`}>
      <div className="mb-10">
        <DataFileButton onDataFile={mergeFormValue} schema={schema} />
      </div>
      <DocumentNameInput onChange={handleChangeFileName} value={newFileName} />
      <Form
        className="form-custom"
        schema={schema}
        uiSchema={uiSchema}
        onChange={setFormData}
        formData={data?.formData}
        widgets={widgets}
        ObjectFieldTemplate={CustomObjectFieldTemplate}
        FieldTemplate={CustomFieldTemplate}
        ArrayFieldTemplate={CustomArrayFieldTemplate}
      />
      {attachmentAccepted && (
        <AttachmentDropzone
          acceptedFormat={attachmentAcceptedFormat}
          onUpload={handleUpload}
          onRemove={handleRemoveUpload}
          uploadedFiles={data?.formData?.attachments}
        />
      )}
    </div>
  );
};
