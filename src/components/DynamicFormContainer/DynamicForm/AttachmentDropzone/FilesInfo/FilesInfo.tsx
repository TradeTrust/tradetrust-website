import prettyBytes from "pretty-bytes";
import React, { FunctionComponent } from "react";
import { Trash2 } from "react-feather";
import { ProcessedFiles } from "../../../../../types";
import { getExtension } from "../../../../UI/AttachmentLink";

interface FilesInfoType {
  filesInfo: ProcessedFiles[];
  removeFile: (index: number) => void;
}

export const FilesInfo: FunctionComponent<FilesInfoType> = ({ filesInfo, removeFile }) => {
  if (!filesInfo || filesInfo.length === 0) {
    return null;
  }
  return (
    <ul className="file-info mt-4">
      {filesInfo.map((file: any, key: number) => {
        const data = file.data;
        const name = file.filename || file.fileName; // v2 or v3 attachment
        const type = file.type || file.mimeType; // v2 or v3 attachment

        const decodedData = atob(data);
        const size = prettyBytes(decodedData.length);
        return (
          <li
            key={key}
            data-testid={`upload-file-${key}`}
            className="border border-cloud-200 border-solid rounded my-1 h-16 flex items-center px-4"
          >
            <span className="mr-2">{getExtension(type)}</span>
            <p className="font-gilroy-bold text-cloud-800 flex-grow break-all">
              {name}
              <span className="text-cloud-500 text-xs font-regular"> ({size})</span>
            </p>

            <div
              className="cursor-pointer"
              data-testid={`remove-uploaded-file-${key}`}
              onClick={() => {
                removeFile(key);
              }}
            >
              <Trash2 className="text-cerulean-300" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
