import React from "react";
import styled from "@emotion/styled";
import prettyBytes from "pretty-bytes";
import { mixin, vars } from "../../../styles";
import { SvgIcon, SvgIconPaperClip } from "./../../UI/SvgIcon";

export interface AttachmentLinkProps {
  className?: string;
  filename: string;
  data?: string;
  type?: string;
  path?: string;
}

export const AttachmentLinkUnStyled = ({ className, filename, data, type, path }: AttachmentLinkProps) => {
  let filesize = "0";
  const hasBase64 = !!(data && type);
  const downloadHref = hasBase64 ? `data:${type};base64,${data}` : path || "javascript:void(0)";

  if (data) {
    const decodedData = atob(data);
    filesize = prettyBytes(decodedData.length);
  }

  return (
    <a href={downloadHref} download={`${filename}`} className={className} data-testid="attachment-link">
      <div className="row">
        <div className="col-12 col-md-auto mb-3 mb-md-0">
          <div className="icon">
            <SvgIcon>
              <SvgIconPaperClip />
            </SvgIcon>
          </div>
        </div>
        <div className="col-12 col-md">
          <p className="filetext">
            <span className="filename">{filename}</span>
            {hasBase64 && <span className="filesize">({filesize})</span>}
          </p>
          <p className="downloadtext mb-0">Download</p>
        </div>
      </div>
    </a>
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
