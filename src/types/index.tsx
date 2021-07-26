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
  personaIndex: number;
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
    startMessage?: string;
    thenSteps?: {
      stepTitle: string;
      icon?: string;
      description: string;
    }[];
    nowSteps?: {
      stepTitle: string;
      icon?: string;
      description: string;
    }[];
    benefits?: { benefitTitle: string; icon: string; description: string }[];
    endMessage: string;
  };
};

export type DocumentTypeContent = {
  type: string;
  description: string;
  examples: string;
  message: string;
  users: Persona[];
};

export enum ContentType {
  BENEFIT = "BENEFIT",
  THEN = "THEN",
  NOW = "NOW",
}
