import React from "react";
import styled from "@emotion/styled";
import { vars, mixin } from "../../../styles";
import { ReactRouterLinkButtonSolidOrangeWhite } from "./../../UI/Button";

export interface AnnoucementBarProps {
  className?: string;
}

export const AnnoucementBarUnStyled = ({ className }: AnnoucementBarProps) => {
  return (
    <section className={`${className} bg-brand-navy text-white`}>
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <div className="announcement-bar">
              <div className="row align-items-center">
                <div className="col-12 col-lg-7">
                  <h1 className="mb-3">TradeTrust Tech Webinar Series</h1>
                  <h5 className="mb-3">
                    Advance your knowledge with our captivating talks, interactive content and more for free!
                  </h5>
                  <p className="mb-0">
                    This series of tech talks is organised by the Infocomm Media Development Authority of Singapore
                    (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with
                    knowledge on TradeTrust as a digital utility for cross border trade.
                  </p>
                </div>
                <div className="col-12 col-lg-auto ml-lg-auto mt-4 mt-lg-0">
                  <ReactRouterLinkButtonSolidOrangeWhite to="/webinar">View More</ReactRouterLinkButtonSolidOrangeWhite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AnnoucementBar = styled(AnnoucementBarUnStyled)`
  padding-top: 15px;
  padding-bottom: 15px;

  .announcement-bar {
    position: relative;
    background-color: #5d6975;
    border-radius: 4px;
    background-image: url("/static/images/webinar/IMDA_cube.png");
    background-position: 0 75%;
    background-repeat: no-repeat;
    padding: 30px 20px;

    @media only screen and (min-width: ${vars.lg}) {
      padding: 20px 30px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  h1 {
    ${mixin.fontSourcesansproRegular};
  }

  h5 {
    ${mixin.fontSourcesansproRegular};
    max-width: 500px;
  }

  a {
    padding: 8px 24px 12px;
    ${mixin.fontSize(26)};

    &:hover {
      color: ${vars.greyLightest};
    }
  }
`;
