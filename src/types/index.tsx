import { HostActions } from "@govtechsg/decentralized-renderer-react-components";
export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

// export type TradeTrustErc721EventType = "Transfer" | "Surrender" | "Burnt" | "Surrender Rejected" | "Document Issued";
// order: Issued, Transfer, 

export type TradeTrustErc721EventType = "INITIAL" | "NEW_OWNERS" | "ENDORSE" | "TRANSFER" | "SURRENDERED" | "SURRENDER_REJECTED" | "SURRENDER_ACCEPTED" | "TRANSFER_TO_WALLET" | "INVALID"

export interface TradeTrustErc721Event {
  eventType: TradeTrustErc721EventType;
  documentOwner: string;
  timestamp?: number;
}

export interface TitleEscrowEvent extends TradeTrustErc721Event {
  blockNumber: number;
  holder: string | undefined;
  beneficiary: string | undefined;
  transactionHash: string;
}

export type EndorsementChain = (TradeTrustErc721Event | TitleEscrowEvent)[];

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
}

export enum GaCategory {
  MAGIC_DEMO = "magic_demo",
}
