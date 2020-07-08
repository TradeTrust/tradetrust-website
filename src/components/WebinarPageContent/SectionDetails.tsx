import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { RegisterButton } from "./RegisterButton";

interface SectionDetailsProps {
  className?: string;
}

export const SectionDetailsUnStyled = ({ className }: SectionDetailsProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <h2>Tech Webinar Details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 1:</h6>
              <h3>TradeTrust Overview</h3>
              <h5>15 Jul 2020, 10 – 11am</h5>
              <p>
                This non-technical session helps provide a foundational and critical understanding of TradeTrust as a
                digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 2:</h6>
              <h3>Creation of Verifiable Documents</h3>
              <h5>22 Jul 2020, 10 – 11.30am</h5>
              <p>
                This session will take participants through the process of creating and rendering a verifiable document.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 3:</h6>
              <h3>Creation of Transferable Documents</h3>
              <h5>29 Jul 2020, 10 – 11.00am</h5>
              <p>
                This segment will focus on the creation of transferable documents. Join this session to learn how to
                create a transferable document and how to perform a title transfer.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 4:</h6>
              <h3>Critical Functions of TradeTrust</h3>
              <h5>5 Aug 2020, 10 – 11am</h5>
              <p>
                In this session we will cover critical functions such as reading and verifying a TradeTrust file through
                two types of approaches: a) front-end; and b) programmatically
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 5:</h6>
              <h3>Set Up and Change Templates</h3>
              <h5>12 Aug 2020, 10 – 11am</h5>
              <p>
                Building on sessions 2 and 3, this session will walk you through the steps on how to: configure
                documents; set up schema in a configuration file; and change document templates
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="webinar">
              <h6>Webinar 6:</h6>
              <h3>Identity Resolution Services</h3>
              <h5>19 Aug 2020, 10 – 11am</h5>
              <p>
                Identity Resolution in TradeTrust involves the ability to map non-readable identification of issuers to
                a readable form. This segment will cover the methods and the steps on building APIs for identity
                resolution.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-auto mx-auto">
            <RegisterButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionDetails = styled(SectionDetailsUnStyled)`
  padding: 60px 0;

  .webinar {
    background-color: ${vars.blue};
    color: ${vars.white};
    padding: 15px;
    height: 100%;

    h6 {
      ${mixin.fontSourcesansproRegular};
      text-transform: uppercase;
    }

    h3 {
      line-height: 1.1;
      margin-bottom: 10px;
    }

    h5 {
      ${mixin.fontSourcesansproRegular};
      margin-bottom: 30px;
    }
  }
`;
