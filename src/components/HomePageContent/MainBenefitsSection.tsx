import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../styles";
import { Section } from "../Layout/Section";
import { vars } from "../../styles";

export const SectionMainBenefits = styled(Section)`
  ${mixin.centerVertical()}
  padding-top: 80px;
  padding-bottom: 80px;

  h1 {
    ${mixin.fontMontserratSemibold}
    ${mixin.fontSize(36)}
  }

  p {
    ${mixin.fontSize(18)}
    color: ${vars.greyDark};
  }

  h5 {
    ${mixin.fontSourcesansproBold}
    color: ${vars.greyDark};
  }

  .img-icon {
    max-width: 50px;
  }
`;

export const MainBenefitsSection = () => {
  return (
    <SectionMainBenefits className="bg-grey-lightest">
      <div className="row">
        <div className="col-12 col-lg-auto mx-lg-auto">
          <h1 className="mb-4">Main Benefits</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12 col-lg-8 mx-lg-auto">
          <p className="text-lg-center">TradeTrust can bring benefits to the trade, finance and logistics community:</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8 mx-lg-auto">
          <div className="row mb-4">
            <div className="col-12 col-sm-auto">
              <img className="img-icon mb-3 mb-sm-0" src="/static/images/benefitsection/icon-secure-doc.png" />
            </div>
            <div className="col-12 col-sm">
              <h5>Increased efficiencies through certainty</h5>
              <p>
                Reduce the risk of receiving fake documents/information as sources will be accredited. Removes the need
                for repetitive checks by the various trade ecosystem parties to ascertain whether the
                documents/information received are legitimate.
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-auto">
              <img className="img-icon mb-3 mb-sm-0" src="/static/images/benefitsection/icon-reduce-cost.png" />
            </div>
            <div className="col-12 col-sm">
              <h5>Reduced costs of documentation</h5>
              <p>
                Digitalising paper documents would eliminate costs associated with printing, including the handling and
                transportation of typically hundreds of pages amongst numerous parties. This will significantly reduce
                the costs of shipping
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-auto">
              <img className="img-icon mb-3 mb-sm-0" src="/static/images/benefitsection/icon-trade.png" />
            </div>
            <div className="col-12 col-sm">
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
