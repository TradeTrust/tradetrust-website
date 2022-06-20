export enum ContentType {
  BENEFIT = "BENEFIT",
  THEN = "THEN",
  NOW = "NOW",
}

export enum DocumentType {
  VERIFIABLE_DOCUMENT = "Verifiable Documents",
  TRANSFERABLE_RECORD = "Transferable Records",
}

export interface StepsProps {
  contentType: ContentType;
  stepsDetails: StepDetail[];
}

export type StepDetail = {
  title?: string;
  icon?: string;
  description: string;
};

export type Persona = {
  image: string;
  jobTitle: string;
  description: string;
  learnMore: {
    title: string;
    startMessage?: string;
    endMessage: string;
    thenSteps?: StepDetail[];
    nowSteps?: StepDetail[];
    benefits?: StepDetail[]; // this is causing weird rendering conditions within components
  };
};

export interface PersonaProps {
  personaIndex: number;
  persona: Persona;
}

export interface DocumentTypeContent {
  type: DocumentType;
  text: {
    description: string;
    examples: string;
    message: string;
  };
  personas: Persona[];
}
