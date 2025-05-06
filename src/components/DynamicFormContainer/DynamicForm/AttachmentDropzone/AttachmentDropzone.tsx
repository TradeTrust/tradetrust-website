import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useCallback, useState } from "react";
import { FileUpload } from "../../../../constants/FileUpload";
import { ProcessedFiles } from "../../../../types";
import { StyledDropZone } from "../../../UI/StyledDropZone";
import { FilesInfo } from "./FilesInfo";
import { hasVcContext } from "../../../../common/utils/dataHelpers";
import { Accept } from "react-dropzone";
import { useFormsContext } from "../../../../common/contexts/FormsContext";

interface AttachmentDropzone {
  acceptedFormat: Accept;
  onUpload: (processedFiles: ProcessedFiles[]) => void;
  onRemove: (fileIndex: number) => void;
  uploadedFiles: ProcessedFiles[];
}

export const AttachmentDropzone: FunctionComponent<AttachmentDropzone> = ({
  acceptedFormat,
  onUpload,
  onRemove,
  uploadedFiles,
}) => {
  const { currentFormData } = useFormsContext();
  const [fileErrors, setFileErrors] = useState<Error[]>([]);
  const isOaV3 = hasVcContext(currentFormData?.formData || {});

  const onDropAccepted = useCallback(
    async (files: File[]) => {
      let totalSize = uploadedFiles
        ? uploadedFiles.reduce((acc: number, current: any) => acc + atob(current.data).length, 0)
        : 0;

      files.forEach((file) => (totalSize += file.size));

      if (totalSize > FileUpload.ATTACHMENT_TOTAL_FILES_MAX_SIZE) {
        const totalFileSizeError = new Error(
          `Total attachment file size exceeds ${
            FileUpload.ATTACHMENT_TOTAL_FILES_MAX_SIZE / FileUpload.BYTE_TO_MB_CONVERSION_RATE
          }MB, Please try again with a smaller file size.`
        );
        return setFileErrors([totalFileSizeError]);
      } else {
        setFileErrors([]);
      }

      const processedFiles = await Promise.all(files.map((file) => processFiles(file, isOaV3)));
      onUpload(processedFiles);
    },
    [isOaV3, onUpload, uploadedFiles]
  );

  const removeFile = (fileIndex: number): void => {
    onRemove(fileIndex);
  };

  const dropzoneOptions = {
    onDropAccepted,
    accept: acceptedFormat,
  };
  const defaultStyle = "bg-white";
  const activeStyle = "bg-cloud-200";

  return (
    <div className="flex flex-col m-auto" key="AttachmentDropzone" data-testid="attachment-dropzone">
      <legend>Attachments</legend>
      <div className="text-cloud-800">
        Max. total file size: {FileUpload.ATTACHMENT_TOTAL_FILES_MAX_SIZE / FileUpload.BYTE_TO_MB_CONVERSION_RATE}MB
      </div>
      <StyledDropZone
        dropzoneOptions={dropzoneOptions}
        defaultStyle={defaultStyle}
        activeStyle={activeStyle}
        fileErrors={fileErrors}
        dropzoneIcon="/static/images/uploadicon/upload-icon-dark.png"
        dataTestId="attachment-file-dropzone"
      >
        <div className="font-gilroy-bold text-lg text-cloud-800">Drag and drop your file(s) here</div>
        <div className="mt-4">or</div>
        <Button className="w-[200px] bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4">Browse File</Button>
      </StyledDropZone>
      <FilesInfo filesInfo={uploadedFiles} removeFile={removeFile} />
    </div>
  );
};

export const fileInfo = (dataUrl: string): { type: string; data: string } => {
  const result = dataUrl.match(/^data:(.+);base64,(.*)/);
  if (!result) throw new Error(`File data cannot be read: ${dataUrl}`);
  const [, type, data] = result;
  return {
    type,
    data,
  };
};

const processFiles = (file: File, isOaV3: boolean): Promise<ProcessedFiles> => {
  const { name } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const { data, type } = fileInfo(event?.target?.result as string);

      if (isOaV3) {
        resolve({
          data,
          fileName: name,
          mimeType: type,
        });
      } else {
        resolve({
          data,
          filename: name,
          type: type,
        });
      }
    };
    reader.readAsDataURL(file);
  });
};
