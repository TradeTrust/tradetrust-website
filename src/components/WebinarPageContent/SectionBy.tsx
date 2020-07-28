import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";

interface SectionByProps {
  className?: string;
}

export const SectionByUnStyled = ({ className }: SectionByProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-lg-9 mx-lg-auto">
            <h5 className="mb-4">
              Advance your knowledge with our captivating talks, interactive content and more for free!
            </h5>
            <div className="box">
              <p className="mb-0">
                This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA)
                and GovTech Singapore. It comprises of six webinars and aims to provide professionals with knowledge on
                TradeTrust as a digital utility for cross border trade.
              </p>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12 col-lg-5 mx-lg-auto">
            <p>Brought to you by:</p>
            <div className="row align-items-center justify-content-center">
              <div className="col-3 col-lg-5">
                <img className="img-fluid" src="/static/images/common/logo-govtech.png" alt="" />
              </div>
              <div className="col-4 col-lg-6">
                <img className="img-fluid" src="/static/images/common/logo-imda.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionBy = styled(SectionByUnStyled)`
  padding: 60px 0;
  background-color: ${vars.greyLightest};

  h5 {
    ${mixin.fontSourcesansproSemibold};
    color: ${vars.blue};
  }

  .box {
    padding: 15px 20px;
    background-color: #d0ecf6;
  }
`;
