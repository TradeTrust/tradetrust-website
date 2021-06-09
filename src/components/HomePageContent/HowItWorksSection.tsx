import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

interface HowItWorksProps {
  details: HowItWorks;
  index: number;
  open: Number;
  setOpen: Dispatch<SetStateAction<number>>;
}

type HowItWorks = {
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

const howItWorksUsers: HowItWorks[] = [
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

const HowItWorksElement: React.FunctionComponent<HowItWorksProps> = ({ details, index, open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col m-4 md:w-6/12 md:m-0 md:mb-8">
      <div className="min-h-220 md:flex md:items-center">
        <img className="mx-auto min-w-220" src={details.image} />
        <div className="flex flex-col items-center md:items-start md:justify-start">
          <p className="text-xl text-center mx-5 md:mx-0 md:text-left md:min-h-90">{details.description}</p>
          <a className="block pt-3 text-base font-bold" onClick={() => setOpen(open !== index ? index : -1)}>
            Click to find out more
          </a>
        </div>
      </div>
      {open === index && (
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
      )}
    </div>
  );
};

export const HowItWorksSection = () => {
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
            <HowItWorksElement details={details} index={index} open={open} setOpen={setOpen} />
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
