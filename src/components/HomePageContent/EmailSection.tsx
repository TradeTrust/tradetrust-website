import styled from "@emotion/styled";
import React from "react";
import { mixin, vars } from "../../styles";
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
      <div className="flex text-center mb-6">
        <div className="w-full lg:w-7/12 xl:w-6/12 lg:mx-auto">
          <h1 className="mb-6">Get in Touch</h1>
          <p>Join TradeTrust and be part of the TradeTrust network.</p>
        </div>
      </div>
      <EmailForm />
    </SectionEmail>
  );
};
