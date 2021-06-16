import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { PersonaModal } from "./PersonaModal";

export interface HowItWorksProps {
  details: HowItWorks;
  index?: number;
  open?: number;
  setOpen?: Dispatch<SetStateAction<number>>;
}

type HowItWorks = {
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

const howItWorksTransferableRecordUsers: HowItWorks[] = [
  {
    image: "/static/images/home/kevin/kevin.png",
    jobTitle: "The Exporter",
    description: "This is Kevin, he is an exporter with customers in many different countries",
    learnMore: {
      title: "Blank-Endorsed BL",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/kevin/kevin-then-1.svg",
          description: "Exporter received BL from carrier (via courier)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/kevin/kevin-then-2.svg",
          description: "Exporter checks the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/kevin/kevin-then-3.svg",
          description: "Exporter endorses BL",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/kevin/kevin-then-4.svg",
          description: "Exporter dispatches the BL to Negotiating Bank (via courier)",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/kevin/kevin-now-1.svg",
          description: "Exporter receives eBL from carrier (via email)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/kevin/kevin-now-2.svg",
          description: "Exporter checks for authenticity and provenance including endorsement entry",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/kevin/kevin-now-3.svg",
          description: "Exporter performs endorsement to Negotiating Bank",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/lizzie/lizzie.png",
    jobTitle: "The Carrier",
    description:
      "This is Lizzie, she works for a Carrier, and her Company is using TradeTrust for their e-Bill-of-Lading Solution",
    learnMore: {
      title: "Issuance and Surrender of BL processes",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/lizzie/lizzie-benefit-1.svg",
          description: "Improve customer experience with fast, transparent and trusted eBL",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/lizzie/lizzie-benefit-2.svg",
          description: "Remove the need to sign up with different eBL service provider",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/lizzie/lizzie-benefit-3.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/lizzie/lizzie-benefit-4.svg",
          description: "Advantage of using technology that help his customer cut down on cost",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/cara/cara.png",
    jobTitle: "The Importer",
    description: "This is Cara, she is an importer using Tradetrust to streamline her cargo collection process",
    learnMore: {
      title: "Issuance and Surrender of BL processes",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/cara/cara-benefit-1.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/cara/cara-benefit-2.svg",
          description: "Save cost on courier and paperwork",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/cara/cara-benefit-3.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/cara/cara-benefit-4.svg",
          description: "Eliminate the need to check the details of the entire endorsement chain",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/liam/liam.png",
    jobTitle: "The Banker",
    description: "This is Liam, He is a banker using TradeTrust to Minimize Fraud risk in trade financing",
    learnMore: {
      title: "Blank-Endorsed BL",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/liam/liam-then-1.svg",
          description:
            "Negotiating Bank receives BL from Exporter (via courier) and checks\the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/liam/liam-then-2.svg",
          description: "Negotiating Bank endorses BL and dispatches BL to Issuing Bank (via courier)",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/liam/liam-then-3.svg",
          description:
            "Issuing Bank receives eBL from Negotiating Bank (via courier) and checks the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/liam/liam-then-4.svg",
          description: "Issuing Bank endorses BL",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/liam/liam-now-1.svg",
          description:
            "Negotiating Bank receives eBL from Carrier (via email) and checks forauthenticity and provenance including endorsement entry",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/liam/liam-now-2.svg",
          description: "Negotiating Bank performs endorsement and send to Issuing Bank (via email)",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/liam/liam-now-3.svg",
          description:
            "Issuing Bank checks for authenticity(via TradeTrust) and provenance including endorsement entry",
        },
      ],
      endMessage: "TradeTrust is more than a tool to prevent fraud. Get in touch to find out more!",
    },
  },
];

const howItWorksVerifiableDocumentUsers: HowItWorks[] = [
  {
    image: "/static/images/home/joan/joan.png",
    jobTitle: "The Exporter",
    description:
      "This is Joan, she is an exporter with customers in many different countries. See how she cut down on time and cost when dealing with Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/joan/joan-then-1.svg",
          description: "Exporter receives CoO from Exporting Country's Cert Issuing Authority (via courier)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/joan/joan-then-2.svg",
          description: "Exporter checks the details of CoO",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/joan/joan-then-3.svg",
          description: "Exporter dispatches the CoO to Bank (via courier)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/kevin/kevin-then-4.svg",
          description: "10-20 days",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/joan/joan-now-1.svg",
          description: "Exporter receives eCoO from Exporting Country's Cert Issuing Authority (via email)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/joan/joan-now-2.svg",
          description: "Exporter checks for authenticity and provenance",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/joan/joan-now-3.svg",
          description: "Exporter sends the eCoO to Bank (via email)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/joan/joan-now-3.svg",
          description: "1 day",
        },
      ],
      endMessage: "TradeTrust is more than a tool to hasten your exporting processs. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/sean/sean.png",
    jobTitle: "Cert Issuing/Checking Authority",
    description:
      "This is Sean, he works for Singapore Custom, and he is using TradeTrust to issue Certificate of Origin. See how he benefited from using TradeTrust to issue the Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/sean/sean-benefit-1.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/sean/sean-benefit-2.svg",
          description: "CoO can be sent via email instead of courier",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/sean/sean-benefit-3.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/sean/sean-benefit-4.svg",
          description: "Legal certainty as TradeTrust is designed to be compliant to MLETR",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/james/james.png",
    jobTitle: "The Importer",
    description:
      "This is James, he is an importer using Tradetrust to streamline his cargo collection process. See how he benefited from using TradeTrust",
    learnMore: {
      title: "Certificate of Origin",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/james/james-benefit-1.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/james/james-benefit-2.svg",
          description: "Save cost on courier and paperwork",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/james/james-benefit-3.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/james/james-benefit-4.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/tanu/tanu.png",
    jobTitle: "The Banker",
    description:
      "This is Tanu, she is a banker using TradeTrust to Minimize Fraud risk in trade financing. See how she lower the risk of fraud when dealing with Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/tanu/tanu-benefit-1.svg",
          description: "Receive CoO via email instead of courier",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/tanu/tanu-benefit-2.svg",
          description: "Decreases Fraud risk",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/tanu/tanu-benefit-3.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/tanu/tanu-benefit-4.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
];

enum DocumentType {
  VERIFIABLE_DOCUMENT = "Verifiable Document",
  TRANSFERABLE_RECORD = "Transferable Record",
}

const HowItWorksElement: React.FunctionComponent<HowItWorksProps> = ({ details, index }) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = (modalContent: HowItWorks) => {
    showOverlay(<PersonaModal key={index} details={modalContent} />);
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
  const [open, setOpen] = useState(-1);
  const [selectDocumentType, setSelectDocumentType] = useState<DocumentType>(DocumentType.TRANSFERABLE_RECORD);
  const documentType: DocumentType[] = [DocumentType.TRANSFERABLE_RECORD, DocumentType.VERIFIABLE_DOCUMENT];
  const [documentTypeUsers, setDocumentTypeUsers] = useState<HowItWorks[]>(howItWorksTransferableRecordUsers);

  const selectedDocumentType = (input: DocumentType) => {
    setSelectDocumentType(input);
    input === DocumentType.TRANSFERABLE_RECORD
      ? setDocumentTypeUsers(howItWorksTransferableRecordUsers)
      : setDocumentTypeUsers(howItWorksVerifiableDocumentUsers);
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
                className={`font-ubuntu font-normal text-xl text-cerulean-200 cursor-pointer hover:font-bold ${
                  item === selectDocumentType ? "font-bold underline" : ""
                }`}
                onClick={() => selectedDocumentType(item)}
              >
                {item}
              </h5>
            ))}
          </div>

          {/* <h5
              className="font-normal text-cerulean-200 md:mr-5"
              onClick={() => selectedDocumentType(DocumentType.TRANSFERABLE_RECORD)}
            >
              Transferable Records
            </h5>
            <h5
              className="hidden font-normal text-cerulean-200 md:inline"
              onClick={() => selectedDocumentType(DocumentType.VERIFIABLE_DOCUMENT)}
            >
              Verifiable Documents
            </h5> */}
          {/* </div> */}
          {/* <h6 className="mt-10 text-base leading-none md:text-xl md:mt-3">
            See how each persona benefit from the use of TradeTrust
          </h6>
          <h5 className="mt-4 text-xl leading-6 md:mt-8 md:text-3xl">Choose a persona</h5> */}
        </div>
        <div className="flex flex-wrap my-8 text-base md:items-start md:justify-start">
          {/* {howItWorksTransferableRecordUsers.map((details, index) => (
            <HowItWorksElement key={index} details={details} index={index} open={open} setOpen={setOpen} />
          ))} */}
          {documentTypeUsers.map((details, index) => (
            <HowItWorksElement key={index} details={details} index={index} open={open} setOpen={setOpen} />
          ))}
        </div>

        <div className="flex flex-col h-96 justify-center">
          <div
            className="flex w-full h-64 mx-auto rounded-xl text-white text-center justify-center items-center"
            style={{ backgroundColor: "#3B8CC5" }}
          >
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
