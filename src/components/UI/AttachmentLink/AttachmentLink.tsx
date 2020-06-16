import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { SvgIcon, SvgIconPaperClip } from "./../../UI/SvgIcon";

interface AttachmentLinkProps {
  className: string;
  filename: string;
  data: string;
}

export const AttachmentLink = styled(({ className, filename, data }: AttachmentLinkProps) => {
  return (
    <div className={className}>
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="icon">
            <SvgIcon>
              <SvgIconPaperClip />
            </SvgIcon>
          </div>
        </div>
        <div className="col">
          <p className="filename">{filename}</p>
          <a href={`data:application/pdf;base64,${data}`} download={`${filename}`}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
})`
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
    color: ${vars.grey};
    margin-bottom: 8px;
  }
`;
