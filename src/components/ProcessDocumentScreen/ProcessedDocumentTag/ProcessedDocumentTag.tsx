import { LoaderSpinner } from "@tradetrust-tt/tradetrust-ui-components";
import { SignedVerifiableCredential } from "@trustvc/trustvc";
import { saveAs } from "file-saver";
import prettyBytes from "pretty-bytes";
import React, { FunctionComponent } from "react";
import { XCircle } from "react-feather";
import { useCreatorContext } from "../../../common/contexts/CreatorContext";
import { generateFileName, getFileSize } from "../../../utils";

interface PublishedTagProps {
  doc: SignedVerifiableCredential | undefined;
  fileName: string;
  extension: string;
  isPending: boolean;
  isError?: boolean;
  hideAction?: boolean;
}

export const ProcessedDocumentTag: FunctionComponent<PublishedTagProps> = ({
  doc,
  fileName,
  extension,
  isPending,
  isError = false,
  hideAction = false,
}) => {
  const { setDocumentDownloaded } = useCreatorContext();

  const file = JSON.stringify(doc ?? "");
  const size = prettyBytes(getFileSize(file));
  const blob = new Blob([file], { type: "text/json;charset=utf-8" });
  const documentName = generateFileName({
    fileName: fileName,
    extension: extension,
  });
  return (
    <div className="my-4 flex rounded-lg bg-white p-3 min-w-md max-w-md border border-solid border-cloud-200 mr-4 items-center">
      <>
        {isPending ? (
          <LoaderSpinner
            className="mr-4 flex-shrink-0"
            data-testid="processing-loader"
            width="48px"
            primary="#2D5FAA"
          />
        ) : isError ? (
          <XCircle className="mr-4 text-scarlet-500 h-12 w-12" />
        ) : (
          <div className="bg-cerulean-500 w-12 h-12 rounded-full mr-4 flex-shrink-0">
            <div className="flex justify-center items-center h-full text-white">TT</div>
          </div>
        )}
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-cloud-800" data-testid="file-name">
                {documentName}
              </div>
              {!hideAction && !isPending && (
                <>
                  {!isError && (
                    <div
                      className="text-cerulean-300 cursor-pointer hover:text-cerulean-500"
                      data-testid="download-file-button"
                      onClick={() => {
                        saveAs(blob, documentName ?? "");
                        setDocumentDownloaded(doc?.id ?? "");
                      }}
                    >
                      Download
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="text-cloud-300 font-regular whitespace-nowrap"> ({size})</div>
          </div>
        </div>
      </>
    </div>
  );
};
