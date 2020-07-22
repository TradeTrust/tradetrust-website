import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { RegisterButton } from "./RegisterButton";

interface SectionRegisterProps {
  className?: string;
}

export const SectionRegisterUnStyled = ({ className }: SectionRegisterProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9 mx-lg-auto">
            <div className="heading">
              <h1>TradeTrust Tech Webinar Series</h1>
              <h5>Advance your knowledge with our captivating talks, interactive content and more for free</h5>
            </div>
            <RegisterButton>Register Now</RegisterButton>
          </div>
        </div>
      </div>
      <div className="textbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="mb-0">
                This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA)
                and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on
                TradeTrust as a digital utility for cross border trade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionRegister = styled(SectionRegisterUnStyled)`
  position: relative;
  background-image: url("/static/images/webinar/IMDA_cube.png");
  background-position: 100% center;
  background-size: cover;
  color: ${vars.white};
  padding: 100px 0 180px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .heading {
    margin-bottom: 60px;

    h1 {
      ${mixin.fontSize(47)};
    }

    h5 {
      ${mixin.fontSourcesansproRegular};
    }
  }

  .textbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;
