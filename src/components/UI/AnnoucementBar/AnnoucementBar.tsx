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
                  <img className="banner-title" src="/static/images/webinar/banner-title.png" alt="" />
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
    background-image: url("/static/images/webinar/banner.jpg");
    background-repeat: no-repeat;
    padding-top: 30px;
    padding-bottom: 30px;

    background-position: 55% 63%;
    padding-left: 15px;
    padding-right: 15px;

    @media only screen and (min-width: ${vars.lg}) {
      background-position: 50% 68%;
      padding-left: 50px;
      padding-right: 50px;
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

  .banner-title {
    width: 100%;
    max-width: 250px;
  }

  a {
    padding: 8px 24px 12px;
    ${mixin.fontSize(26)};

    &:hover {
      color: ${vars.greyLightest};
    }
  }
`;
