import styled from "@emotion/styled";
import React, { useState } from "react";
import tw from "twin.macro";
import { Section } from "../Layout/Section";

export const HowItWorksStyle = styled.div`
  .contact-us-background-image {
    background-image: url("/static/images/common/wave-lines.png");
  }
`;

export type HowItWorks = {
  image: string;
  description: string;
  steps: {
    thenSteps: [
      {
        stepNumber: string;
        stepDescription: string;
      }
    ];
    nowSteps: [
      {
        stepNumber: string;
        stepDescription: string;
      }
    ];
  };
};

export const howItWorksUsers: HowItWorks[] = [
  {
    image: "/static/images/home/kevin.png",
    description: "This is Kevin, he is an exporter with customers in many different countries",
    steps: {
      thenSteps: [
        {
          stepNumber: "1",
          stepDescription: "Fill in details of the Sales Agreement",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          stepDescription: "Placeholder",
        },
      ],
    },
  },
  {
    image: "/static/images/home/lizzie.png",
    description:
      "This is Lizzie, she works for a Carrier, and her Company is using TradeTrust for their e-Bill-of-Lading Solution",
    steps: {
      thenSteps: [
        {
          stepNumber: "1",
          stepDescription: "Fill in details of the Sales Agreement",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          stepDescription: "Placeholder",
        },
      ],
    },
  },
  {
    image: "/static/images/home/cara.png",
    description: "This is Cara, she is an importer using Tradetrust to streamline her cargo collection process",
    steps: {
      thenSteps: [
        {
          stepNumber: "1",
          stepDescription: "Fill in details of the Sales Agreement",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          stepDescription: "Placeholder",
        },
      ],
    },
  },
  {
    image: "/static/images/home/liam.png",
    description: "This is Liam, He is a banker using TradeTrust to Minimize Fraud risk in trade financing",
    steps: {
      thenSteps: [
        {
          stepNumber: "1",
          stepDescription: "Fill in details of the Sales Agreement",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          stepDescription: "Placeholder",
        },
      ],
    },
  },
];

export const HowItWorksElement: React.FunctionComponent<HowItWorks> = (howItWorksUser) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <div>
        <img className="mx-auto" src={howItWorksUser.image} />
        <p>{howItWorksUser.description}</p>
        <a className="font-bold" onClick={() => setOpen(!open)}>
          Click to find out more
        </a>
      </div>
      <div className={`overflow-hidden mb-2 ${open ? "" : "h-0"}`}>
        {/* <ReactMarkdown className="px-4 pb-4">{answer}</ReactMarkdown> */}
        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.768 0.999999C11.5378 -0.333335 13.4622 -0.333333 14.232 1L24.1913 18.25C24.9611 19.5833 23.9989 21.25 22.4593 21.25H2.54071C1.0011 21.25 0.0388563 19.5833 0.808657 18.25L10.768 0.999999Z"
            fill="#3B8CC5"
          />
        </svg>
        <p>HELLO WORLD!</p>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="text-gray-700 py-16">
      {/* <HowItWorksStyle> */}
      <div className="container">
        <div className="w-5/5 text-center">
          <h3 className="font-ubuntu text-4xl leading-none lg:text-6xl">How It Works</h3>
          <h6 className="font-ubuntu text-base leading-none lg:text-6xl">
            See how each persona benefit from the use of TradeTrust
          </h6>
          <h5 className="font-roboto text-xl leading-6">Choose a persona</h5>
        </div>
        <div className="flex flex-wrap text-base text-center justify-center">
          {howItWorksUsers.map((details, index) => (
            <HowItWorksElement {...details} />
          ))}
          {/* <div
            className="absolute h-12 w-56 left-20 rounded-xl text-white text-center justify-center items-center"
            style={{ backgroundColor: "#F57A29" }}
          ></div> */}
        </div>
        <div className="relative h-96">
          <div
            // className="flex w-full h-64 m-auto rounded-xl text-white text-center justify-center items-center"
            className="absolute w-full inset-0 m-auto h-64 rounded-xl text-white text-center"
            style={{ backgroundColor: "#3B8CC5" }}
          >
            <h3 className="inset-0 m-auto">Ready to learn how TradeTrust can benefit your business?</h3>
          </div>
          <div
            className="absolute h-12 w-56 inset-0 m-auto rounded-xl text-white text-center"
            style={{ backgroundColor: "#F57A29", top: "70%" }}
          >
            <h4>Get in Touch Now</h4>
          </div>
        </div>
      </div>
      {/* </HowItWorksStyle> */}
    </section>
  );
};
