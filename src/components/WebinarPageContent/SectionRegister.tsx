import React from "react";
import styled from "@emotion/styled";
import { vars } from "../../styles";
import { RegisterButton } from "./RegisterButton";

interface SectionRegisterProps {
  className?: string;
}

export const SectionRegisterUnStyled = ({ className }: SectionRegisterProps) => {
  return (
    <section className={`${className}`}>
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <img
              className="banner-title"
              src="/static/images/webinar/banner-title@4x.png"
              alt="TradeTrust Tech Webinar Series banner title"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <RegisterButton className="mt-5">Register Now</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionRegister = styled(SectionRegisterUnStyled)`
  position: relative;
  background-image: url("/static/images/webinar/banner.jpg");
  background-position: 50% 100%;
  background-size: cover;
  color: ${vars.white};
  padding: 80px 0;

  @media only screen and (min-width: ${vars.lg}) {
    padding: 80px 0 100px;
  }

  @media only screen and (min-width: ${vars.xl}) {
    padding: 100px 0 200px;
  }

  .banner-title {
    width: 100%;
    max-width: 500px;
  }
`;
