import { HostActions } from "@govtechsg/decentralized-renderer-react-components";
import { OpenAttestationDocument as OpenAttestationDocumentV2 } from "@govtechsg/open-attestation/dist/types/__generated__/schema.2.0";
import { OpenAttestationDocument as OpenAttestationDocumentV3 } from "@govtechsg/open-attestation/dist/types/__generated__/schema.3.0";
import { WrappedDocument } from "@govtechsg/open-attestation";

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

export type EndorsementChain = (TradeTrustErc721Event | TitleEscrowEvent)[];

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

export type Dispatch = (action: HostActions) => void;

export interface TradeTrustDocumentV2 extends OpenAttestationDocumentV2 {
  chainId?: string;
}

export interface TradeTrustDocumentV3 extends OpenAttestationDocumentV3 {
  chainId?: string;
}

export type TradeTrustDocument = TradeTrustDocumentV2 | TradeTrustDocumentV3;

export type WrappedOrSignedTradeTrustDocument = WrappedDocument<TradeTrustDocument>;
