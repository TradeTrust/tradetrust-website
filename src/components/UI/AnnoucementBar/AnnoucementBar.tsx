import React from "react";
import styled from "@emotion/styled";
import { vars, mixin } from "../../../styles";
import { AnchorLinkButtonSolidOrangeWhite } from "./../../UI/Button";

export interface AnnoucementBarProps {
  className?: string;
}

export const AnnoucementBarUnStyled = ({ className }: AnnoucementBarProps) => {
  return (
    <div className={className}>
      <div className="row align-items-center">
        <div className="col-12 col-lg-7">
          <h1 className="mb-3">TradeTrust Tech Webinar Series</h1>
          <h5 className="mb-3">
            Advance your knowledge with our captivating talks, interactive content and more for free!
          </h5>
          <p className="mb-0">
            This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and
            GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust
            as a digital utility for cross border trade.
          </p>
        </div>
        <div className="col-12 col-lg-auto ml-lg-auto mt-4 mt-lg-0">
          <AnchorLinkButtonSolidOrangeWhite href="#" target="_self" rel="noreferrer noopener">
            View more
          </AnchorLinkButtonSolidOrangeWhite>
        </div>
      </div>
    </div>
  );
};

export const AnnoucementBar = styled(AnnoucementBarUnStyled)`
  background-color: #5d6975;
  border-radius: 4px;
  margin-bottom: 50px;
  color: ${vars.white};
  background-image: url("/static/images/webinar/IMDA_cube.png");
  background-position: 0 75%;
  background-repeat: no-repeat;
  padding: 15px;

  @media only screen and (min-width: ${vars.lg}) {
    padding: 15px 30px;
  }

  h1 {
    ${mixin.fontSourcesansproRegular};
  }

  h5 {
    ${mixin.fontSourcesansproRegular};
    max-width: 500px;
  }

  a {
    color: ${vars.white};
    &:hover {
      color: ${vars.greyLightest};
    }
  }
`;
