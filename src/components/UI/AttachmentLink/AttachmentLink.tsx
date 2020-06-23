import React from "react";
import styled from "@emotion/styled";
import prettyBytes from "pretty-bytes";
import { mixin, vars } from "../../../styles";
import { SvgIcon, SvgIconPaperClip } from "./../../UI/SvgIcon";

export interface AttachmentLinkProps {
  className?: string;
  filename: string;
  data: string;
  type: string;
}

export const AttachmentLinkUnStyled = ({ className, filename, data, type }: AttachmentLinkProps) => {
  const decodedData = atob(data);
  const filesize = prettyBytes(decodedData.length);

  return (
    <div className={className} data-testid="attachment-link">
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
            <span className="filesize">({filesize})</span>
          </p>
          <a href={`data:${type};base64,${data}`} download={`${filename}`}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export const AttachmentLink = styled(AttachmentLinkUnStyled)`
  width: 100%;
  height: 100%;
  border: solid 1px ${vars.greyLighter};
  padding: 10px 15px;

  .icon {
    background-color: ${vars.greyLighter};
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
    ${mixin.fontSourcesansproBold};
    line-height: 1.2;
    color: ${vars.grey};
    margin-right: 4px;
  }

  .filesize {
    ${mixin.fontSourcesansproRegular};
    color: ${vars.grey};
    ${mixin.fontSize(13)};
  }
`;
