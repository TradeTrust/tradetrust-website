import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import prettyBytes from "pretty-bytes";
import { mixin, vars } from "../../../styles";
import { Paperclip } from "react-feather";
import { getData, WrappedDocument, v2 } from "@govtechsg/open-attestation";
import { getLogger } from "../../../utils/logger";

const { error } = getLogger("component:attachmentlink");

export interface AttachmentLinkProps {
  className?: string;
  filename: string;
  data?: string;
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

const ExtensionIcon: FunctionComponent<ExtensionIconProps> = ({ src }: ExtensionIconProps) => {
  return (
    <img
      src={`/static/images/fileicons/${src}.svg`}
      className="flex items-center justify-center mr-2"
      data-testid={`attachment-icon-${src}`}
    />
  );
};

export const getExtension = (mimeType: string | undefined): React.ReactNode => {
  switch (true) {
    case mimeType === "text/csv":
      return <ExtensionIcon src={"csv"} />;
    case mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <ExtensionIcon src={"doc"} />;
    case mimeType === "image/jpeg":
      return <ExtensionIcon src={"jpg"} />;
    case mimeType === "image/png":
      return <ExtensionIcon src={"png"} />;
    case mimeType === "application/pdf":
      return <ExtensionIcon src={"pdf"} />;
    case mimeType === "text/plain":
      return <ExtensionIcon src={"txt"} />;
    default:
      return (
        <div className="icon" data-testid={`attachment-icon-paperclip`}>
          <Paperclip />
        </div>
      );
  }
};

export const AttachmentLinkUnStyled = ({ className, filename, data, type, path }: AttachmentLinkProps) => {
  let filesize = "0";
  let redirectLink = "";
  const hasBase64 = !!(data && type);
  const downloadHref = hasBase64 ? `data:${type};base64,${data}` : path || "javascript:void(0)";

  if (data) {
    const decodedData = atob(data);
    filesize = prettyBytes(decodedData.length);
    try {
      const decodedJson = JSON.parse(decodedData);
      const originalDocument: OriginalDocumentProps = getData<WrappedDocument<OriginalDocumentProps>>(decodedJson);
      redirectLink = originalDocument?.links?.self?.href ?? "";
    } catch (e) {
      error("decode data not json: " + e);
    }
  }

  return (
    <div className={className}>
      <div className="row">
        <div className="col-12 col-md-auto mb-3 mb-md-0">{getExtension(type)}</div>
        <div className="col-12 col-md">
          <p className="filetext">
            <span className="filename">{filename}</span>
            {hasBase64 && <span className="filesize">({filesize})</span>}
          </p>
          <div className="row no-gutters">
            <div className="col-12 col-md-auto">
              <a href={downloadHref} download={`${filename}`} className="downloadtext" data-testid="attachment-link">
                Download
              </a>
            </div>
            {redirectLink && (
              <div className="col-12 col-md-auto ml-0 ml-md-2">
                <a href={redirectLink} target="_blank" rel="noopener noreferrer" className="downloadtext">
                  Open
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AttachmentLink = styled(AttachmentLinkUnStyled)`
  transition: background-color 0.3s ${vars.easeOutCubic};
  display: inline-block;
  width: 100%;
  border: solid 1px ${vars.greyLighter};
  padding: 10px 15px;

  &:hover {
    text-decoration: none;
    background-color: ${vars.blueLighter};

    .filename {
      color: ${vars.greyDark};
    }
  }

  .icon {
    background-color: ${vars.greyLighter};
    color: ${vars.greyDark};
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;

    svg {
      margin: auto;
    }
  }

  .filetext {
    margin-bottom: 8px;
  }

  .filename {
    transition: color 0.3s ${vars.easeOutCubic};
    ${mixin.fontSourcesansproBold};
    line-height: 1.2;
    color: ${vars.grey};
    margin-right: 4px;
  }

  .filesize {
    display: inline-block;
    ${mixin.fontSourcesansproRegular};
    color: ${vars.grey};
    ${mixin.fontSize(13)};
  }

  .downloadtext {
    color: ${vars.blue};
  }
`;
