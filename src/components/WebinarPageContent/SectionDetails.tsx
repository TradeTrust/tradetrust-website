import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { TagSolidOrange } from "./../UI/Tag";

interface SectionDetailsProps {
  className?: string;
}

export const SectionDetailsUnStyled = ({ className }: SectionDetailsProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-auto">
            <h2>Tech Webinar Details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">1</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">TradeTrust Overview</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-01.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Intro</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    15 Jul 2020
                    <br />
                    10.00 – 11.00am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    This non-technical session helps provide a foundational and critical understanding of TradeTrust as
                    a digital utility as well as the mental framing necessary as a pre-requsite for subsequent webinars.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">2</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">Creation of Veriﬁable Documents</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-02.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Tech session</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    22 Jul 2020
                    <br />
                    10.00 – 11.30am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    This session will take participants through the process of creating and rendering a verifiable
                    document.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">3</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">Creation of Transferable Documents</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-03.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Tech session</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    29 Jul 2020
                    <br />
                    10.00 – 11.00am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    This segment will focus on the creation of transferable documents. Join this session to learn how to
                    create a transferable document and how to perform a title transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">4</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">Critical Functions of TradeTrust</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-04.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Tech session</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    5 Aug 2020
                    <br />
                    10.00 – 11.00am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    In this session we will cover critical functions such as reading and verifying a TradeTrust file
                    through two types of approaches:
                  </p>
                  <ul>
                    <li>front-end</li>
                    <li>programmatically</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">5</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">Set Up and Change Templates</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-05.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Tech session</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    12 Aug 2020
                    <br />
                    10.00 – 11.00am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>Building on sessions 2 and 3, this session will walk you through the steps on how to:</p>
                  <ul>
                    <li>configure documents</li>
                    <li>set up schema in a configuration file</li>
                    <li>change document templates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="webinar">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="mb-0">6</h2>
                </div>
                <div className="col">
                  <h5 className="mb-0">Identity Resolution Services</h5>
                </div>
                <div className="col-3 col-sm-2 col-md-3">
                  <img className="img-fluid" src="/static/images/webinar/icon-06.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center bg-blue">
                <div className="col-auto">
                  <TagSolidOrange className="mb-0 text-uppercase">Tech session</TagSolidOrange>
                </div>
                <div className="col">
                  <h6 className="mb-0">
                    19 Aug 2020
                    <br />
                    10.00 – 11.00am
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    Identity Resolution in Tradetrust involves the ability to map non-readable identification of issuers
                    to a readable form. This segment will cover the methods and the steps on building APIs for identity
                    resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionDetails = styled(SectionDetailsUnStyled)`
  padding: 60px 0 15px;

  h2 {
    ${mixin.fontSourcesansproSemibold};
    text-transform: uppercase;
    color: ${vars.brandOrange};
  }

  .bg-blue {
    background-color: ${vars.blue};
    color: ${vars.white};
    margin-top: 15px;
    margin-bottom: 15px;
    padding-top: 10px;
    padding-bottom: 10px;

    h6 {
      ${mixin.fontSourcesansproSemibold};
      text-transform: uppercase;
    }
  }

  .webinar {
    border: 1px solid ${vars.blue};
    padding: 15px;
    height: 100%;

    h2 {
      color: ${vars.blue};
      ${mixin.fontSize(60)};
    }

    h5 {
      ${mixin.fontSourcesansproSemibold};
    }

    h3 {
      line-height: 1.1;
      margin-bottom: 10px;
    }
  }
`;
