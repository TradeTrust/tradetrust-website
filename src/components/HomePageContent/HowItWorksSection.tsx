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
  steps?: {
    title: string;
    thenSteps: {
      stepNumber: string;
      icon: string;
      description: string;
    }[];
    nowSteps: {
      stepNumber: string;
      icon: string;
      description: string;
    }[];
    endMessage: string;
  };
  benefits?: {
    title: string;
    benefitStage: { benefitNumber: string; icon: string; description: string }[];
    endMessage: string;
  };
};

const howItWorksUsers: HowItWorks[] = [
  {
    image: "/static/images/home/kevin/kevin.png",
    jobTitle: "The Exporter",
    description: "This is Kevin, he is an exporter with customers in many different countries",
    steps: {
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
    benefits: {
      title: "Issuance and Surrender of BL processes",
      benefitStage: [
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
    benefits: {
      title: "Issuance and Surrender of BL processes",
      benefitStage: [
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
    steps: {
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
          <p className="text-xl text-center mx-5 md:mx-0 md:text-left md:min-h-90">{details.description}</p>
          {/* <a className="block pt-3 text-base font-bold" onClick={() => setOpen(open !== index ? index : -1)}> */}
          <a className="block pt-3 text-base font-bold" onClick={() => onOverlayHandler(details)}>
            Click to find out more
          </a>
        </div>
      </div>
      {/* {open === index && (
        // <div className="relative mb-2">
        //   <div className="flex min-w-220 max-w-220 justify-center mx-auto md:mx-0">
        //     <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        //       <path
        //         d="M10.768 0.999999C11.5378 -0.333335 13.4622 -0.333333 14.232 1L24.1913 18.25C24.9611 19.5833 23.9989 21.25 22.4593 21.25H2.54071C1.0011 21.25 0.0388563 19.5833 0.808657 18.25L10.768 0.999999Z"
        //         fill="#3B8CC5"
        //       />
        //     </svg>
        //   </div>
        //   <div
        //     className={`relative w-auto -mx-8 -mt-1 h-12 md:w-screen md:mx-0 ${
        //       index % 2 === 0 ? "md:-left-24" : "md:-left-100"
        //     }`}
        //     style={{ backgroundColor: "#3B8CC5" }}
        //   />
        // </div>
        <div className="relative mb-2">
          <div className="flex min-w-220 max-w-220 justify-center mx-auto">
            <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.768 0.999999C11.5378 -0.333335 13.4622 -0.333333 14.232 1L24.1913 18.25C24.9611 19.5833 23.9989 21.25 22.4593 21.25H2.54071C1.0011 21.25 0.0388563 19.5833 0.808657 18.25L10.768 0.999999Z"
                fill="#3B8CC5"
              />
            </svg>
          </div>
          <div className={`relative w-auto -mx-8 -mt-1 h-12`} style={{ backgroundColor: "#3B8CC5" }} />
        </div>
      )} */}
    </div>
  );
};

export const HowItWorksSection: FunctionComponent = () => {
  const [open, setOpen] = useState(-1);

  return (
    <section id="how-it-works" className="text-gray-700 py-16">
      <div className="container">
        <div className="w-5/5 text-center">
          <h3 className="font-ubuntu text-4xl leading-none md:text-5xl">How It Works</h3>
          <h6 className="mt-10 text-base leading-none md:text-xl md:mt-3">
            See how each persona benefit from the use of TradeTrust
          </h6>
          <h5 className="mt-4 text-xl leading-6 md:mt-8 md:text-3xl">Choose a persona</h5>
        </div>
        <div className="flex flex-wrap my-8 text-base md:items-start md:justify-start">
          {howItWorksUsers.map((details, index) => (
            <HowItWorksElement key={index} details={details} index={index} open={open} setOpen={setOpen} />
          ))}
        </div>

        <div className="flex-col h-96 justify-center">
          <div
            className="flex w-full h-64 m-auto rounded-xl text-white text-center justify-center items-center"
            style={{ backgroundColor: "#3B8CC5" }}
          >
            <h3 className="font-ubuntu text-4.5xl md:mx-72">
              Ready to learn how TradeTrust can benefit your business?
            </h3>
          </div>
          <Link
            to="/contact"
            className="flex h-12 w-56 m-auto -mt-5 justify-center items-center rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
          >
            <h4 className="font-ubuntu">Get in Touch Now</h4>
          </Link>
        </div>
      </div>
    </section>
  );
};
