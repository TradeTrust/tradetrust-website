export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

export type TradeTrustErc721EventType = "Transfer" | "Surrender" | "Burnt";

export interface TradeTrustErc721Event {
  eventType: TradeTrustErc721EventType;
  documentOwner: string;
  eventTimestamp?: number;
}

export interface TitleEscrowEvent extends TradeTrustErc721Event {
  beneficiary: string;
  holderChangeEvents: {
    blockNumber: number;
    holder: string;
    timestamp: number;
  }[];
}

export interface ResourcesLinkProps {
  title: string;
  type: "link" | "download";
  icon?: string;
  details: {
    title: string;
    description?: string;
    url: string;
  }[];
}
