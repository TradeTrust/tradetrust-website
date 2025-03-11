import { HostActions } from "@tradetrust-tt/decentralized-renderer-react-components";
import { ChainId } from "./../constants/chain-info";

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
