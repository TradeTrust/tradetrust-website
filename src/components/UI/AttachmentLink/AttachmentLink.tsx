import styled from "@emotion/styled";
import { getData, v2, WrappedDocument } from "@govtechsg/open-attestation";
import prettyBytes from "pretty-bytes";
import React, { FunctionComponent } from "react";
import { Paperclip } from "react-feather";
import tw from "twin.macro";
import { getLogger } from "../../../utils/logger";

const { error } = getLogger("component:attachmentlink");

export interface AttachmentLinkProps {
  filename: string;
  data: string;
  type?: string;
  path?: string;
}

interface OriginalDocumentProps extends v2.OpenAttestationDocument {
  links?: {
    self?: {
      href: string;
    };
  };
}

interface ExtensionIconProps {
  src: string;
}

const ExtensionIcon: FunctionComponent<ExtensionIconProps> = ({ ...props }) => {
  return <img {...props} className="max-w-full" alt="Extension Icon" />;
};

export const getExtension = (mimeType: string | undefined): React.ReactNode => {
  switch (true) {
    case mimeType === "text/csv" ||
      mimeType === "application/vnd.ms-excel" ||
      mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <ExtensionIcon src="/static/images/fileicons/csv.svg" data-testid="attachment-icon-csv" />;
    case mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword":
      return <ExtensionIcon src="/static/images/fileicons/doc.svg" data-testid="attachment-icon-doc" />;
    case mimeType === "image/jpeg":
      return <ExtensionIcon src="/static/images/fileicons/jpg.svg" data-testid="attachment-icon-jpg" />;
    case mimeType === "image/png":
      return <ExtensionIcon src="/static/images/fileicons/png.svg" data-testid="attachment-icon-png" />;
    case mimeType === "application/pdf":
      return <ExtensionIcon src="/static/images/fileicons/pdf.svg" data-testid="attachment-icon-pdf" />;
    case mimeType === "text/plain":
      return <ExtensionIcon src="/static/images/fileicons/txt.svg" data-testid="attachment-icon-txt" />;
    default:
      return (
        <div className="icon" data-testid={`attachment-icon-paperclip`}>
          <Paperclip />
        </div>
      );
  }
};

//sending message to child window
const openTab = (data: string) => {
  const childWin = window.open(`${window.location}/#verify-documents`, "_blank", "noopener,noreferrer");
  window.addEventListener(
    "message",
    (event) => {
      if (event.data.type === "READY" && childWin) {
        childWin.postMessage(
          {
            type: "LOAD_DOCUMENT",
            payload: data,
          },
          `${window.location.href}`
        );
      }
    },
    false
  );
};

const isOpenAttestationFile = (decodedData: string) => {
  try {
    const decodedJson = JSON.parse(decodedData);
    const unwrappedDocument = getData<WrappedDocument<OriginalDocumentProps>>(decodedJson);
    if (!unwrappedDocument) throw new Error("File is not OA document"); //non-OA document returns undefined
    return true;
  } catch (e) {
    error("decode data not json: " + e);
    return false;
  }
};

export const AttachmentLink = ({ filename, data, type, path }: AttachmentLinkProps) => {
  let filesize = "0";
  let canOpenFile = false;
  const hasBase64 = !!(data && type);
  const downloadHref = hasBase64 ? `data:${type};base64,${data}` : path || "#";
  const decodedData = atob(data);
  canOpenFile = isOpenAttestationFile(decodedData);
  filesize = prettyBytes(decodedData.length);

  return (
    <Attachment>
      <div className="flex flex-row">
        <div className="w-auto mr-4">{getExtension(type)}</div>
        <div className="w-5/6">
          <p className="mb-2 break-all">
            <span className="filename">{filename}</span>
            {hasBase64 && <span className="font-normal inline-block text-grey text-sm">&nbsp;({filesize})</span>}
          </p>
          <div className="flex">
            <div className="w-auto mr-2">
              <a
                href={downloadHref}
                download={`${filename}`}
                data-testid="attachment-download-link"
                className="text-blue hover:underline"
              >
                Download
              </a>
            </div>
            {canOpenFile && data && (
              <div className="w-auto">
                <button
                  onClick={() => {
                    openTab(data);
                  }}
                  className="text-blue hover:underline"
                  data-testid="attachment-open-link"
                >
                  Open
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Attachment>
  );
};

export const Attachment = styled.div`
  ${tw`transition duration-300 ease-out inline-block w-full h-full border border-solid border-grey-200 py-2 px-4 hover:no-underline hover:bg-blue-300`}

  &:hover {
    .filename {
      ${tw`text-grey-700`}
    }
  }

  .icon {
    ${tw`bg-grey-200 text-grey-700 p-2 rounded-full flex items-center`}
    width: 50px;
    height: 50px;

    svg {
      ${tw`m-auto`}
    }
  }

  .filename {
    ${tw`transition duration-300 ease-out leading-5 text-grey break-words font-semibold`}
  }
`;
