import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentContent } from "./DocumentContent";
import { DocumentType, DocumentTypeContent, Persona } from "./types";
import { PersonaCard } from "./PersonaCard";

const DocumentTypeDetails: FunctionComponent<DocumentTypeContent> = (props) => {
  const { text, personas } = props;

  return (
    <div className="flex flex-wrap my-8 text-base">
      <p className="w-full text-center">{text.description}</p>
      <p className="w-full text-center">{text.examples}</p>
      <h5 className="w-full text-center mt-12 mb-8 text-xl">{text.message}</h5>
      {personas.map((persona: Persona, index: number) => (
        <PersonaCard key={index} persona={persona} personaIndex={index} />
      ))}
    </div>
  );
};

export const HowItWorksSection: FunctionComponent = () => {
  const [selectedDocumentTypeLabel, setSelectedDocumentTypeLabel] = useState<DocumentType>(
    DocumentType.TRANSFERABLE_RECORD
  );
  const documentTypes: DocumentType[] = [DocumentType.TRANSFERABLE_RECORD, DocumentType.VERIFIABLE_DOCUMENT]; // manual set array here, but we could map the enums direct also

  const selectedDocumentTypeContent = DocumentContent.find((content) => {
    return content.type === selectedDocumentTypeLabel;
  }) as DocumentTypeContent;

  const selectDocumentType = (input: DocumentType) => {
    setSelectedDocumentTypeLabel(input);
  };

  return (
    <section id="how-it-works" className="text-cloud-800 py-16">
      <div className="container">
        <div className="w-5/5 text-center">
          <h1 className="leading-none text-4xl lg:text-6xl">How It Works</h1>
          <div className="flex m-auto mt-6 justify-center">
            {documentTypes.map((documentType, index) => {
              const cssState =
                documentType === selectedDocumentTypeLabel ? "font-gilroy-bold underline" : "font-gilroy-medium";
              const cssAlign = documentType === DocumentType.TRANSFERABLE_RECORD ? "lg:mr-5" : "hidden lg:inline"; // design decision to not show this button on on mobile

              return (
                <h5
                  key={index}
                  className={`text-xl text-cerulean-300 cursor-pointer hover:text-cerulean-500 ${cssState} ${cssAlign}`}
                  onClick={() => selectDocumentType(documentType)}
                  data-testid={`document-type-${index}`}
                >
                  {documentType}
                </h5>
              );
            })}
          </div>
        </div>
        <DocumentTypeDetails {...selectedDocumentTypeContent} />
        <div className="flex flex-col h-96 justify-center">
          <div className="bg-wave-lines-light bg-cover flex w-full h-64 mx-auto bg-cerulean-500 rounded-xl text-white text-center justify-center items-center">
            <h2 className="leading-[44px] lg:mx-72">Ready to learn how TradeTrust can benefit your business?</h2>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 mx-auto -mt-4 rounded-xl text-white bg-tangerine-500 hover:bg-tangerine-800 hover:text-cloud-100"
            data-testid="get-in-touch"
          >
            <h3 className="font-normal text-2xl">Contact Us Now</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};
