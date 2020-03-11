import React from "react";
import { SvgIcon, SvgIconInfo } from "./../SvgIcon";
import ReactTooltip from "react-tooltip";

interface ToolTipProps {
  id: string;
  getContent: any;
}

export const Tooltip = ({ id, getContent }: ToolTipProps) => {
  return (
    <>
      <SvgIcon cssClass="feather-info" tooltipId={id}>
        <SvgIconInfo />
      </SvgIcon>
      <ReactTooltip id={`tooltip-${id}`} place="right" type="dark" effect="solid" getContent={getContent} />
    </>
  );
};
