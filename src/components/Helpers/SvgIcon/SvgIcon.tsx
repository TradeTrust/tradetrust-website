import React, { ReactElement, useState } from "react";
import _uniqueId from "lodash/uniqueId";
import ReactTooltip from "react-tooltip";

interface SvgIconProps {
  cssClass?: string;
  tooltipId?: string;
  children: ReactElement;
}

interface TooltipIconProps {
  getContent: any;
  children: ReactElement;
}

export const TooltipIcon = ({ getContent, children }: TooltipIconProps) => {
  const [id] = useState(_uniqueId("tt-"));

  return (
    <>
      <SvgIcon tooltipId={id}>{children}</SvgIcon>
      <ReactTooltip id={`tooltip-${id}`} place="right" type="dark" effect="solid" getContent={getContent} />
    </>
  );
};

export const SvgIconInfo = () => {
  return (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  );
};

export const SvgIconChecked = () => {
  return <polyline points="20 6 9 17 4 12" />;
};

export const SvgIconChervonLeft = () => {
  return <polyline points="15 18 9 12 15 6" />;
};

export const SvgIconEdit = () => {
  return (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </>
  );
};

export const SvgIconBook = () => {
  return (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  );
};

export const SvgIconX = () => {
  return (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  );
};

export const SvgIcon = ({ tooltipId, cssClass = "", children }: SvgIconProps) => {
  const tooltipProps = tooltipId
    ? {
        "data-tip": "",
        "data-for": `tooltip-${tooltipId}`
      }
    : null;

  return (
    <svg
      {...tooltipProps}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather ${cssClass}`}
    >
      {children}
    </svg>
  );
};
