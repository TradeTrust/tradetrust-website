import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { PersonaModal } from "./PersonaModal";
import { howItWorksTransferableRecordUsers } from "./TransferableRecordUsers";
import { howItWorksVerifiableDocumentUsers } from "./VerifiableDocumentUsers";

export interface DocumentTypeUserProps {
  details: DocumentTypeUsers;
}

export interface DocumentContentProps {
  documentTypeContent: DocumentContent;
}

export type DocumentTypeUsers = {
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

export type DocumentContent = {
  type: string;
  description: string;
  message: string;
  users: DocumentTypeUsers[];
};

const documentTestType3: DocumentContent[] = [
  {
    type: "Transferable Record",
    description:
      "Transferable Records are Electronic Transferable documents that entitle the holder to claim the performance of the obligation indicated therein and that allow the transfer of the claim to that performance by transferring possession of the document or instrument. Examples of transferable records typically include bills of lading, bills of exchange, promissory notes, and warehouse receipts.",
    message: "See how each persona benefit from the use of TradeTrust when dealing with Blank-Endorsed BL",
    users: howItWorksTransferableRecordUsers,
  },
  {
    type: "Verifiable Document",
    description:
      "Tradetrust Verifiable documents are digital documents that are tamper-proof and protected against fraud by signing their digital fingerprints on +10’000 blockchain nodes. Examples of Verifiable documents typically include Certificate of Origin(CoO), Invoices and promissory notes.",
    message: "See how each persona benefit from the use of TradeTrust when dealing with Certificate of Origin",
    users: howItWorksVerifiableDocumentUsers,
  },
];

enum DocumentType {
  VERIFIABLE_DOCUMENT = "Verifiable Document",
  TRANSFERABLE_RECORD = "Transferable Record",
}

const DocumentTypeElement: React.FunctionComponent<DocumentContentProps> = ({ documentTypeContent }) => {
  return (
    <div className="flex flex-wrap flex-wrap my-8 text-base">
      <p className="w-full text-center">{documentTypeContent.description}</p>
      <h5 className="w-full text-center mt-12 mb-8 text-xl">{documentTypeContent.message}</h5>
      {documentTypeContent.users.map((details, index) => (
        <DocumentTypeUserElement key={index} details={details} />
      ))}
    </div>
  );
};

const DocumentTypeUserElement: React.FunctionComponent<DocumentTypeUserProps> = ({ details }) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = (modalContent: DocumentTypeUsers) => {
    showOverlay(<PersonaModal details={modalContent} />);
  };

  return (
    <div className="flex flex-col m-4 md:w-6/12 md:m-0 md:mb-8">
      <div className="min-h-220 md:flex md:items-center">
        <img className="mx-auto min-w-220" src={details.image} />
        <div className="flex flex-col items-center md:items-start md:justify-start">
          <h6>{details.jobTitle}</h6>
          <p className="text-xl text-center mx-5 md:mx-0 md:text-left md:min-h-90">{details.description}</p>
          {/* <a className="block pt-3 text-base font-bold" onClick={() => setOpen(open !== index ? index : -1)}> */}
          <a className="block pt-3 text-cerulean-200 text-base font-bold" onClick={() => onOverlayHandler(details)}>
            Click to find out more
          </a>
        </div>
      </div>
    </div>
  );
};

export const HowItWorksSection: FunctionComponent = () => {
  const [selectDocumentType, setSelectDocumentType] = useState<DocumentType>(DocumentType.TRANSFERABLE_RECORD);
  const documentType: DocumentType[] = [DocumentType.TRANSFERABLE_RECORD, DocumentType.VERIFIABLE_DOCUMENT];
  // const [selectedDocumentTypeUsers, setSelectedDocumentTypeUsers] = useState<DocumentTypeUsers[]>(
  //   howItWorksTransferableRecordUsers
  // );
  // new
  const [selectDocumentTypeTest, setSelectedDocumentTypeTest] = useState<DocumentContent>(documentTestType3[0]);

  const documentTypeFilterStyle = (item: DocumentType): string => {
    let returnStyle;

    if (item === selectDocumentType) returnStyle = "font-bold underline";

    switch (item) {
      case DocumentType.TRANSFERABLE_RECORD:
        return returnStyle + " md:mr-5";
      case DocumentType.VERIFIABLE_DOCUMENT:
        return returnStyle + " hidden md:inline";
      default:
        return "";
    }
  };

  // const selectedDocumentType = (input: DocumentType) => {
  //   setSelectDocumentType(input);
  //   input === DocumentType.TRANSFERABLE_RECORD
  //     ? setSelectedDocumentTypeUsers(howItWorksTransferableRecordUsers)
  //     : setSelectedDocumentTypeUsers(howItWorksVerifiableDocumentUsers);
  // };

  //new
  const selectedDocumentTestType = (input: DocumentType) => {
    setSelectDocumentType(input);
    documentTestType3.map((documentDetails, index) => {
      if (input === documentDetails.type) {
        console.log(documentDetails);
        setSelectedDocumentTypeTest(documentDetails);
      }
    });
  };

  return (
    <section id="how-it-works" className="text-gray-700 py-16">
      <div className="container">
        <div className="w-5/5 text-center">
          <h3 className="font-ubuntu text-4xl leading-none md:text-5xl">How It Works</h3>
          {/* <div className="flex mt-5 m-auto justify-center"> */}
          <div className="flex m-auto mt-6 justify-center">
            {documentType.map((item, index) => (
              <h5
                key={index}
                className={`font-ubuntu font-normal text-xl text-cerulean-200 cursor-pointer hover:font-bold ${documentTypeFilterStyle(
                  item
                )}`}
                // onClick={() => selectedDocumentType(item)}
                onClick={() => selectedDocumentTestType(item)}
              >
                {item}
              </h5>
            ))}
          </div>
        </div>
        <DocumentTypeElement documentTypeContent={selectDocumentTypeTest} />
        {/* <div className="flex flex-wrap my-8 text-base md:items-start md:justify-start">
          {selectedDocumentTypeUsers.map((details, index) => (
            <HowItWorksElement key={index} details={details} index={index} open={open} setOpen={setOpen} />
          ))}
        </div> */}

        <div className="flex flex-col h-96 justify-center">
          <div className="flex w-full h-64 mx-auto bg-cerulean rounded-xl text-white text-center justify-center items-center">
            <h3 className="font-ubuntu text-4.5xl md:mx-72">
              Ready to learn how TradeTrust can benefit your business?
            </h3>
          </div>
          <Link
            to="/contact"
            // className="flex h-12 w-56 m-auto -mt-5 justify-center items-center rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
            className="px-4 py-2 mx-auto -mt-4 rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
          >
            <h4 className="font-ubuntu text-2xl">Get in Touch Now</h4>
          </Link>
        </div>
      </div>
    </section>
  );
};
