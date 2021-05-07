import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";
import { Section } from "../Layout/Section";

export const SectionMainBenefits = styled(Section)`
  ${tw`py-20 flex flex-col justify-center`}

  h5 {
    ${tw`font-bold text-grey-700`}
  }

  .img-icon {
    max-width: 50px;
  }
`;

export const MainBenefitsSection: FunctionComponent = () => {
  return (
    <SectionMainBenefits className="bg-grey-100 text-grey-800">
      <div className="flex">
        <div className="w-full lg:w-auto lg:mx-auto">
          <h1 className="mb-6 font-medium text-black">Main Benefits</h1>
        </div>
      </div>
      <div className="flex mb-12">
        <div className="w-full lg:w-8/12 lg:mx-auto">
          <p className="lg:text-center">TradeTrust can bring benefits to the trade, finance and logistics community:</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-full lg:w-8/12 lg:mx-auto">
          <div className="flex mb-6">
            <div className="w-auto mr-8">
              <img className="img-icon mb-3 mb-sm-0" src="/static/images/benefitsection/icon-secure-doc.png" />
            </div>
            <div className="w-full sm:flex-grow">
              <h5>Increased efficiencies through certainty</h5>
              <p>
                Reduce the risk of receiving fake documents/information as sources will be accredited. Removes the need
                for repetitive checks by the various trade ecosystem parties to ascertain whether the
                documents/information received are legitimate.
              </p>
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-auto mr-8">
              <img className="img-icon mb-3 mb-sm-0" src="/static/images/benefitsection/icon-reduce-cost.png" />
            </div>
            <div className="w-full sm:flex-grow">
              <h5>Reduced costs of documentation</h5>
              <p>
                Digitalising paper documents would eliminate costs associated with printing, including the handling and
                transportation of typically hundreds of pages amongst numerous parties. This will significantly reduce
                the costs of shipping
              </p>
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-auto mr-8">
              <img className="img-icon mb-4 sm:mb-0" src="/static/images/benefitsection/icon-trade.png" />
            </div>
            <div className="w-full sm:flex-grow">
              <h5>Support for new service offerings through digitalisation and interoperability </h5>
              <p>
                Current digitalisation efforts are fragmented digital ecosystems consisting of silo groups of trade
                parties. TradeTrust will work with the current ecosystem to enable various enterprise and platform
                systems to be interoperable. Coupled with enabling legal validity of electronic trade documents, this
                can facilitate the creation of new service offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionMainBenefits>
  );
};
