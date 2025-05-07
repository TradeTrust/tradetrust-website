import React, { FunctionComponent, useState } from "react";
import { AttachmentDropzone } from "./AttachmentDropzone";
import { ProcessedFiles } from "../../../../types";
import { Accept } from "react-dropzone";

// Accepting only PDFs for this example
const acceptedFormat: Accept = {
  "application/pdf": [".pdf"],
};

export default {
  title: "DynamicForm/AttachmentDropzone",
  component: AttachmentDropzone,
  parameters: {
    componentSubtitle: "Dropzone for uploading document attachments with size and type constraints.",
  },
};

export const Default: FunctionComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFiles[]>([]);

  const handleUpload = (files: ProcessedFiles[]) => {
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemove = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl p-4 border rounded-md shadow-md">
      <AttachmentDropzone
        acceptedFormat={acceptedFormat}
        onUpload={handleUpload}
        onRemove={handleRemove}
        uploadedFiles={uploadedFiles}
      />
    </div>
  );
};
