import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";

const Background = styled.div`
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 35%;
  @media screen and (min-width: 768px) {
    background-image: url("/static/images/home/single-wave.png");
  }
`;

interface MainBenefitsProps {
  details: MainBenefits;
  index: number;
}

type MainBenefits = {
  image: string;
  title: string;
  description: string;
};

const mainBenefits: MainBenefits[] = [
  {
    image: "/static/images/home/cost.svg",
    title: "Reduced costs of documentation",
    description: `Digitalising paper documents would eliminate costs associated with printing, including the handling and
    transportation of typically hundreds of pages amongst numerous parties. This will significantly reduce the costs
    of shipping.`,
  },
  {
    image: "/static/images/home/efficiency.svg",
    title: "Increased efficiencies through certainty",
    description: `Reduce the risk of receiving fake documents or information as sources will be accredited. Removes the need for
    repetitive checks by the various trade ecosystem parties to ascertain whether the documents/information received
    are legitimate.`,
  },
  {
    image: "/static/images/home/support.svg",
    title: "Support for new service offerings through digitalisation and interoperability",
    description: `Current digitalisation efforts are fragmented digital ecosystems consisting of silo groups of trade parties.
    TradeTrust will work with the current ecosystem to enable various enterprise and platform systems to be
    interoperable. Coupled with enabling legal validity of electronic trade documents, this can facilitate the
    creation of new service offerings.`,
  },
];

const MainBenefitsElement: React.FunctionComponent<MainBenefitsProps> = ({ details, index }) => {
  const svgAlignment = (): string => {
    switch (index) {
      case 0:
        return "md:mt-52 xl:mt-60";
      case 1:
        return "md:mt-24";
      case 2:
        return "md:mt-60 xl:mt-72";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center mt-12 md:mx-1 md:w-4/12 md:max-w-xxs md:min-w-xxs ${svgAlignment()}`}
    >
      <img src={details.image} alt="mainBenefitsIcon" />
      <h4 className="font-ubuntu mx-16 md:mx-0 text-center md:text-left md:text-xl" data-testid="benefit-title">
        {details.title}
      </h4>
      <p className="text-left text-base m-4 md:text-base md:m-0 md:mt-4">{details.description}</p>
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
              <MainBenefitsElement key={index} details={details} index={index} />
            ))}
          </div>
        </div>
      </Background>
    </section>
  );
};
