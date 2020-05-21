import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import ReactTooltip from "react-tooltip";

interface SvgIconProps {
  tooltipId?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface TooltipIconProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const TooltipIcon = ({ content, children }: TooltipIconProps) => {
  const [id] = useState(_uniqueId("tt-"));

  return (
    <>
      <SvgIcon tooltipId={id}>{children}</SvgIcon>
      <ReactTooltip
        id={`tooltip-${id}`}
        place="right"
        type="dark"
        effect="solid"
        getContent={() => {
          return content;
        }}
      />
    </>
  );
};

export const SvgIconInfo = () => {
  return (
    <g className="info">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </g>
  );
};

export const SvgIconChecked = () => {
  return (
    <g className="check">
      <polyline points="20 6 9 17 4 12" />
    </g>
  );
};

export const SvgIconChervonLeft = () => {
  return (
    <g className="chevron-left">
      <polyline points="15 18 9 12 15 6" />
    </g>
  );
};

export const SvgIconEdit = () => {
  return (
    <g className="edit">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </g>
  );
};

export const SvgIconBook = () => {
  return (
    <g className="book">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </g>
  );
};

export const SvgIconX = () => {
  return (
    <g className="x">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>
  );
};

export const SvgIconFilePlus = () => {
  return (
    <g className="file-plus">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </g>
  );
};

export const SvgIconSearch = () => {
  return (
    <g className="search">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </g>
  );
};

export const SvgIconCheckCircle = () => {
  return (
    <g className="check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </g>
  );
};

export const SvgIconXCircle = () => {
  return (
    <g className="x-circle">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </g>
  );
};

export const SvgIconPrinter = () => {
  return (
    <g className="printer">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </g>
  );
};

export const SvgIconEmail = () => {
  return (
    <g className="email">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </g>
  );
};

export const SvgIconDownload = () => {
  return (
    <g className="download">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </g>
  );
};

export const SvgIconArrowLeft = () => {
  return (
    <g className="arrow-left">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
  );
};

export const SvgIconPlus = () => {
  return (
    <g className="plus">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>
  );
};

export const SvgIconEdit2 = () => {
  return (
    <g className="edit2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </g>
  );
};

export const SvgIconSave = () => {
  return (
    <g className="save">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </g>
  );
};

export const SvgIconTrash2 = () => {
  return (
    <g className="trash2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </g>
  );
};

export const SvgIcon = ({ tooltipId, children, ...props }: SvgIconProps) => {
  const tooltipProps = tooltipId
    ? {
        "data-tip": "",
        "data-for": `tooltip-${tooltipId}`,
      }
    : null;

  return (
    <svg
      {...tooltipProps}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};
