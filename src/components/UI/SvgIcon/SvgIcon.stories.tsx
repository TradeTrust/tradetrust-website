import React from "react";
import {
  SvgIcon,
  SvgIconAlert,
  SvgIconArrowLeft,
  SvgIconBook,
  SvgIconCheckCircle,
  SvgIconChecked,
  SvgIconChervonLeft,
  SvgIconDownload,
  SvgIconEdit,
  SvgIconEdit2,
  SvgIconEmail,
  SvgIconExternalLink,
  SvgIconFilePlus,
  SvgIconFlag,
  SvgIconInfo,
  SvgIconPaperClip,
  SvgIconPlus,
  SvgIconPrinter,
  SvgIconQRCode,
  SvgIconSave,
  SvgIconSearch,
  SvgIconTrash2,
  SvgIconX,
  SvgIconXCircle,
  TooltipIcon,
} from "./SvgIcon";

export default {
  title: "UI/SvgIcon",
  component: SvgIcon,
  parameters: {
    componentSubtitle: "Types of SvgIcons, Icon with Tooltip.",
  },
};

export const Info = () => {
  return (
    <SvgIcon>
      <SvgIconInfo />
    </SvgIcon>
  );
};

export const Checked = () => {
  return (
    <SvgIcon>
      <SvgIconChecked />
    </SvgIcon>
  );
};

export const ChevronLeft = () => {
  return (
    <SvgIcon>
      <SvgIconChervonLeft />
    </SvgIcon>
  );
};

export const Edit = () => {
  return (
    <SvgIcon>
      <SvgIconEdit />
    </SvgIcon>
  );
};

export const Book = () => {
  return (
    <SvgIcon>
      <SvgIconBook />
    </SvgIcon>
  );
};

export const X = () => {
  return (
    <SvgIcon>
      <SvgIconX />
    </SvgIcon>
  );
};

export const Alert = () => {
  return (
    <SvgIcon>
      <SvgIconAlert />
    </SvgIcon>
  );
};

export const FilePlus = () => {
  return (
    <SvgIcon>
      <SvgIconFilePlus />
    </SvgIcon>
  );
};

export const Search = () => {
  return (
    <SvgIcon>
      <SvgIconSearch />
    </SvgIcon>
  );
};

export const CheckCircle = () => {
  return (
    <SvgIcon>
      <SvgIconCheckCircle />
    </SvgIcon>
  );
};

export const XCircle = () => {
  return (
    <SvgIcon>
      <SvgIconXCircle />
    </SvgIcon>
  );
};

export const Printer = () => {
  return (
    <SvgIcon>
      <SvgIconPrinter />
    </SvgIcon>
  );
};

export const Email = () => {
  return (
    <SvgIcon>
      <SvgIconEmail />
    </SvgIcon>
  );
};

export const Download = () => {
  return (
    <SvgIcon>
      <SvgIconDownload />
    </SvgIcon>
  );
};

export const ArrowLeft = () => {
  return (
    <SvgIcon>
      <SvgIconArrowLeft />
    </SvgIcon>
  );
};

export const Plus = () => {
  return (
    <SvgIcon>
      <SvgIconPlus />
    </SvgIcon>
  );
};

export const Edit2 = () => {
  return (
    <SvgIcon>
      <SvgIconEdit2 />
    </SvgIcon>
  );
};

export const Save = () => {
  return (
    <SvgIcon>
      <SvgIconSave />
    </SvgIcon>
  );
};

export const Trash2 = () => {
  return (
    <SvgIcon>
      <SvgIconTrash2 />
    </SvgIcon>
  );
};

export const PaperClip = () => {
  return (
    <SvgIcon>
      <SvgIconPaperClip />
    </SvgIcon>
  );
};
export const QrCode = () => {
  return (
    <SvgIcon strokeWidth="0.5" fill="currentColor">
      <SvgIconQRCode />
    </SvgIcon>
  );
};

export const Flag = () => {
  return (
    <SvgIcon>
      <SvgIconFlag />
    </SvgIcon>
  );
};

export const ExternalLink = () => {
  return (
    <SvgIcon>
      <SvgIconExternalLink />
    </SvgIcon>
  );
};

export const Tooltip = () => {
  return (
    <TooltipIcon content={<>dummy info here</>}>
      <SvgIconInfo />
    </TooltipIcon>
  );
};
