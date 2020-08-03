import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { TagSolidOrange } from "./../UI/Tag";
import webinars from "./webinars.json";

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
          {webinars.map((webinar, index) => {
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="webinar">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <h2 className="mb-0">{index + 1}</h2>
                    </div>
                    <div className="col">
                      <h5 className="mb-0">{webinar.title}</h5>
                    </div>
                    <div className="col-3 col-sm-2 col-md-3">
                      <img className="img-fluid" src={webinar.iconPath} />
                    </div>
                  </div>
                  <div className="row align-items-center bg-blue">
                    <div className="col-auto">
                      <TagSolidOrange className="mb-0 text-uppercase">{webinar.tag}</TagSolidOrange>
                    </div>
                    <div className="col">
                      <h6 className="mb-0">
                        {webinar.date}
                        <br />
                        {webinar.time}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div dangerouslySetInnerHTML={{ __html: webinar.description }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
