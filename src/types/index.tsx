import { HostActions } from "@tradetrust-tt/decentralized-renderer-react-components";
import { ChainId } from "./../constants/chain-info";
import { Accept } from "react-dropzone";
import { ValidationError } from "@apideck/better-ajv-errors";

export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

export type Resource = {
  title: string;
  url: string;
  date?: string;
};

export type Dispatch = (action: HostActions) => void;

export enum GaAction {
  MAGIC_START = "magic_demo_start",
  MAGIC_ISSUE = "magic_demo_issue",
  MAGIC_DOWNLOADED = "magic_demo_downloaded",
  MAGIC_FILE_DROP = "magic_demo_file_drop",
  MAGIC_DROP_OFF = "magic_demo_drop_off",
  CAROUSEL_DOWNLOAD = "carousel_file_download",
  LEGAL_ARTICLE_DOWNLOAD = "legal_article_download",
}

export enum GaCategory {
  MAGIC_DEMO = "magic_demo",
  FILE_DOWNLOAD = "file_download",
}

export interface ActionPayload {
  uri: string;
  permittedActions: string[];
  redirect: string;
  key?: string;
  chainId?: ChainId;
}

export type ActionType = "DOCUMENT";

export type FormErrors = ValidationError[] | null | undefined;

export type ProcessedFiles = {
  data: string;
  filename: string;
  mimeType: string;
};

// FormData is used by json-schema-forms internally to track state of a single form
export interface FormData {
  schema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  uiSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  idSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  edit?: boolean;
  errors?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errorSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Ownership {
  beneficiaryAddress: string;
  holderAddress: string;
}

// FormEntry is used to store a form's inputs (from FromData) & metadata
export interface FormEntry {
  fileName: string;
  data: FormData;
  ownership: Ownership;
  remarks: string;
  extension: string;
}

export type FormType = "TRANSFERABLE_RECORD" | "VERIFIABLE_DOCUMENT";

// FormTemplate is defined in configuration file
export interface FormTemplate {
  name: string;
  type: FormType;
  defaults: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  schema: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  attachments?: Attachments;
  headers?: string[];
  uiSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  extension?: string;
  fileName?: string;
}

interface Attachments {
  allow: boolean;
  accept?: Accept;
}

export interface SetFormParams {
  data?: FormData;
  updatedOwnership?: Ownership;
  updatedRemarks?: string;
  fileName?: string;
}

export interface Config {
  forms: FormTemplate;
}
