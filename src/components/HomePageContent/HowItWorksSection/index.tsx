import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentContent } from "./DocumentContent";
import { DocumentTypeContent } from "../../../types";
import { DocumentTypeDetails } from "./DocumentTypeDetails";

enum DocumentType {
  VERIFIABLE_DOCUMENT = "Verifiable Document",
  TRANSFERABLE_RECORD = "Transferable Record",
}

export const HowItWorksSection: FunctionComponent = () => {
  const [selectedDocumentTypeLabel, setSelectedDocumentTypeLabel] = useState<DocumentType>(
    DocumentType.TRANSFERABLE_RECORD
  );
  const documentType: DocumentType[] = [DocumentType.TRANSFERABLE_RECORD, DocumentType.VERIFIABLE_DOCUMENT];
  const [selectedDocumentTypeContent, setSelectedDocumentTypeContent] = useState<DocumentTypeContent>(
    DocumentContent[0]
  );

  const documentTypeFilterStyle = (item: DocumentType): string => {
    let returnStyle;

    if (item === selectedDocumentTypeLabel) returnStyle = "font-bold underline";

    switch (item) {
      case DocumentType.TRANSFERABLE_RECORD:
        return returnStyle + " md:mr-5";
      case DocumentType.VERIFIABLE_DOCUMENT:
        return returnStyle + " hidden md:inline";
      default:
        return "";
    }
  };

  const selectDocumentType = (input: DocumentType) => {
    setSelectedDocumentTypeLabel(input);
    DocumentContent.forEach((documentDetails) => {
      if (input === documentDetails.type) {
        console.log(documentDetails);
        setSelectedDocumentTypeContent(documentDetails);
      }
    });
  };

  return (
    <section id="how-it-works" className="text-gray-700 py-16">
      <div className="container">
        <div className="w-5/5 text-center">
          <h3 className="font-ubuntu text-4xl leading-none md:text-5xl">How It Works</h3>
          <div className="flex m-auto mt-6 justify-center">
            {documentType.map((item, index) => (
              <h5
                key={index}
                className={`font-ubuntu font-normal text-xl text-cerulean-200 cursor-pointer hover:font-bold ${documentTypeFilterStyle(
                  item
                )}`}
                onClick={() => selectDocumentType(item)}
              >
                {item}
              </h5>
            ))}
          </div>
        </div>
        <DocumentTypeDetails documentTypeContent={selectedDocumentTypeContent} />

        <div className="flex flex-col h-96 justify-center">
          <div className="flex w-full h-64 mx-auto bg-cerulean rounded-xl text-white text-center justify-center items-center">
            <h3 className="font-ubuntu text-4.5xl md:mx-72">
              Ready to learn how TradeTrust can benefit your business?
            </h3>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 mx-auto -mt-4 rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
          >
            <h4 className="font-ubuntu text-2xl">Get in Touch Now</h4>
          </Link>
        </div>
      </div>
    </section>
  );
};
