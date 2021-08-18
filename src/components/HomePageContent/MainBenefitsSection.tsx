import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";

const Background = styled.div`
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 35%;
  @media screen and (min-width: 768px) {
    background-image: url("/static/images/home/mainBenefits/single-wave.png");
  }
`;

interface MainBenefitsProps {
  details: MainBenefits;
  id: number;
}

type MainBenefits = {
  image: string;
  title: string;
  description: string[];
};

const mainBenefits: MainBenefits[] = [
  {
    image: "/static/images/home/mainBenefits/secure.svg",
    title: "Legal certainty for electronic Transferable Documents",
    description: [
      "Singapore’s  Electronic Transactions Act (ETA) amendments enable the creation and use of electronic Bills of Lading (eBLs) that are legally equivalent to paper-based Bills of Lading.",
    ],
  },
  {
    image: "/static/images/home/mainBenefits/reduce.svg",
    title: "Increase efficiency, lower cost and lower risk of fraud",
    description: [
      "Risk of fraud is mitigated through the use of DLT technology to verify the authenticity and provenance of the trade documents.",
      "US$4 billion savings annually if half of today’s shipping lines adopt eBLs – according to the Digital Container Shipping Association (DSCA).",
    ],
  },
  {
    image: "/static/images/home/mainBenefits/trade.svg",
    title: "Support innovative service offerings",
    description: [
      "Aid the convergence of physical, financial and document chains making automation of key processes possible.",
    ],
  },
];

const MainBenefitsElement: React.FunctionComponent<MainBenefitsProps> = ({ details, id }) => {
  const svgAlignment = (): string => {
    switch (id) {
      case 0:
        return "md:mt-36 xl:mt-44";
      case 1:
        return "md:mt-12";
      case 2:
        return "md:mt-44 xl:mt-56";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center mt-12 md:mx-1 md:w-4/12 md:max-w-xxs md:min-w-xxs ${svgAlignment()}`}
    >
      <img src={details.image} alt="mainBenefitsIcon" />
      <h4
        className="font-ubuntu font-normal mx-16 md:mx-0 text-center md:text-left md:text-3xl"
        data-testid="benefit-title"
      >
        {details.title}
      </h4>
      <ul className="list-disc">
        {details.description.map((description, index) => (
          <li key={index}>
            <p className="text-left text-base m-4 md:text-base md:m-0 md:mt-4">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MainBenefitsSection: FunctionComponent = () => {
  return (
    <section id="main-benefits" className="bg-white text-gray-700 py-16">
      <Background>
        <div className="container">
          <div className="w-5/5 text-center">
            <h1 className="font-ubuntu text-cloud text-4xl leading-none md:text-5xl">Main Benefits</h1>
            <h2 className="font-roboto mt-4 mx-4 text-xl leading-6 md:text-xl">
              TradeTrust can bring benefits to the trade, finance and logistics community:
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around">
            {mainBenefits.map((details, index) => (
              <MainBenefitsElement key={index} details={details} id={index} />
            ))}
          </div>
        </div>
      </Background>
    </section>
  );
};
