import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { SvgIcon, SvgIconPaperClip } from "./../../UI/SvgIcon";

export interface AttachmentLinkProps {
  className?: string;
  filename: string;
  data: string;
  type: string;
}

export const AttachmentLinkUnStyled = ({ className, filename, data, type }: AttachmentLinkProps) => {
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
          <p className="filename">{filename}</p>
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

  .filename {
    ${mixin.fontSourcesansproBold};
    line-height: 1.2;
    color: ${vars.grey};
    margin-bottom: 8px;
  }
`;
