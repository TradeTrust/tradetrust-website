export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

export type TradeTrustErc721EventType = "Transfer" | "Transfer to Wallet" | "Surrender" | "Burnt";

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

export type Resource = {
  title: string;
  url: string;
  date?: string;
};

export interface PersonaProps {
  details: Persona;
}

export interface DocumentTypeContentProps {
  documentTypeContent: DocumentTypeContent;
}

export type Persona = {
  image: string;
  jobTitle: string;
  description: string;
  learnMore: {
    title: string;
    thenSteps?: {
      stepNumber: string;
      icon: string;
      description: string;
    }[];
    nowSteps?: {
      stepNumber: string;
      icon: string;
      description: string;
    }[];
    benefits?: { benefitNumber: string; icon: string; description: string }[];
    endMessage: string;
  };
};

export type DocumentTypeContent = {
  type: string;
  description: string;
  message: string;
  users: Persona[];
};

export enum ContentType {
  BENEFIT = "BENEFIT",
  THEN = "THEN",
  NOW = "NOW",
}
