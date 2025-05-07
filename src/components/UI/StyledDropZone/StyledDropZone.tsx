import { trim } from "lodash";
import { FunctionComponent, useMemo, useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { FileUpload } from "../../../constants/FileUpload";
import { ErrorMessage } from "./ErrorMessage";
import React from "react";

interface DropZoneProps {
  defaultStyle: string;
  activeStyle: string;
  acceptStyle?: string;
  rejectStyle?: string;
  children: React.ReactNode;
  dropzoneOptions: DropzoneOptions;
  fileErrors: Error[];
  dropzoneIcon?: string;
  dataTestId?: string;
}

const baseStyle = `cursor-pointer rounded-xl border-dashed border-2 border-cloud-100 items-center flex flex-col pt-16 pb-16 px-4 text-center mt-4`;
const errorStyle = `bg-red-100`;

export const StyledDropZone: FunctionComponent<DropZoneProps> = ({
  children,
  defaultStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
  dropzoneOptions,
  fileErrors,
  dropzoneIcon,
  dataTestId,
}) => {
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [tooManyFilesError, setTooManyFilesError] = useState(false);

  const onDrop = () => {
    setFileTypeError(false);
    setFileSizeError(false);
    setTooManyFilesError(false);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const checkInvalidFileType = fileRejections.some((file) =>
        file.errors.some((error) => error.code === "file-invalid-type")
      );
      setFileTypeError(checkInvalidFileType);

      const checkInvalidFileSize = fileRejections.some((file) =>
        file.errors.some((error) => error.code === "file-too-large")
      );
      setFileSizeError(checkInvalidFileSize);

      const checkNumberOfFiles = fileRejections.some((file) =>
        file.errors.some((error) => error.code === "too-many-files")
      );
      setTooManyFilesError(checkNumberOfFiles);
    }
  };
  dropzoneOptions.onDrop = onDrop;
  dropzoneOptions.onDropRejected = onDropRejected;

  const { getInputProps, getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone(dropzoneOptions);

  const error = fileTypeError || fileSizeError || tooManyFilesError || fileErrors.length > 0;
  const currentStyle = error ? errorStyle : defaultStyle;
  const dragStyle = useMemo(() => {
    return trim(`
      ${isDragActive ? ` ${activeStyle}` : ""}
      ${isDragAccept ? ` ${acceptStyle ?? ""}` : ""}
      ${isDragReject ? ` ${rejectStyle ?? ""}` : ""}
    `);
  }, [isDragActive, activeStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]);

  return (
    <div className={` ${baseStyle} ${dragStyle || currentStyle} `} data-testid={dataTestId} {...getRootProps()}>
      <input {...getInputProps()} />
      {dropzoneIcon && <img className="mx-auto mb-8" src={dropzoneIcon} />}
      {error && <p className="max-w-lg text-scarlet-500 text-lg leading-none font-gilroy-bold mb-2">Error</p>}
      {fileTypeError && (
        <ErrorMessage
          id="invalid-file-error"
          message={`Incorrect file type selected, Only ${dropzoneOptions.accept} are allowed`}
        />
      )}
      {fileSizeError && (
        <ErrorMessage
          id="file-size-error"
          message={`File size exceeds ${
            dropzoneOptions.maxSize ? ` ${dropzoneOptions.maxSize / FileUpload.BYTE_TO_MB_CONVERSION_RATE}` : ""
          }MB, Please try again with a smaller file size.`}
        />
      )}
      {tooManyFilesError && (
        <ErrorMessage
          id="too-many-files-error"
          message={`Upload too many documents at once, please upload a total of ${dropzoneOptions.maxFiles} document at a time.`}
        />
      )}
      {fileErrors.length > 0 &&
        fileErrors.map((fileError, index: number) => {
          return <ErrorMessage key={`file-errors-${index}`} id="file-error" message={fileError.message} />;
        })}
      <div className={error ? "mt-10" : ""}>{children}</div>
    </div>
  );
};
