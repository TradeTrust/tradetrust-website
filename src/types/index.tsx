import { HostActions } from "@govtechsg/decentralized-renderer-react-components";
import { ChainId } from "./../constants/chain-info";

export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

export type TradeTrustTokenEventType =
  | "INITIAL"
  | "NEW_OWNERS"
  | "ENDORSE"
  | "TRANSFER"
  | "SURRENDERED"
  | "SURRENDER_REJECTED"
  | "SURRENDER_ACCEPTED"
  | "TRANSFER_TO_WALLET"
  | "INVALID";

export type TransferEventType = TokenTransferEventType | TitleEscrowTransferEventType;
export interface TransferBaseEvent {
  type: TransferEventType;
  transactionIndex: number;
  holder?: string;
  owner?: string;
  transactionHash: string;
  blockNumber: number;
}

export type TokenTransferEventType = "INITIAL" | "SURRENDERED" | "SURRENDER_REJECTED" | "SURRENDER_ACCEPTED";
export interface TitleEscrowTransferEvent extends TransferBaseEvent {
  type: TitleEscrowTransferEventType;
}

export type TitleEscrowTransferEventType = "TRANSFER_BENEFICIARY" | "TRANSFER_HOLDER" | "TRANSFER_OWNERS";

export interface TokenTransferEvent extends TransferBaseEvent {
  type: TokenTransferEventType;
  from: string;
  to: string;
}

export interface TransferEvent extends TransferBaseEvent {
  timestamp: number;
  holder: string;
  owner: string;
}

export type EndorsementChain = TransferEvent[];

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
