import React from "react";
import styled from "@emotion/styled";
import { vars, mixin } from "../../styles";
import { Section } from "../Layout/Section";
import { EmailForm } from "./EmailForm";

export const SectionEmail = styled(Section)`
  background-image: linear-gradient(to right, ${vars.blueLight} 0%, ${vars.pink} 100%);
  padding-top: 80px;
  padding-bottom: 80px;

  h1 {
    ${mixin.fontMontserratSemibold}
    ${mixin.fontSize(36)}
  }

  h6 {
    ${mixin.fontMontserratSemibold}
  }
`;

export const EmailSection = () => {
  return (
    <SectionEmail id="contact">
      <div className="row text-center">
        <div className="col-12 col-lg-7 mx-lg-auto col-xl-6">
          <h1 className="mb-4">Get in Touch</h1>
          <p>Join TradeTrust and be part of the TradeTrust network.</p>
        </div>
      </div>
      <EmailForm />
    </SectionEmail>
  );
};
