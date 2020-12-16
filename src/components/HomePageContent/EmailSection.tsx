import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";
import { Section } from "../Layout/Section";
import { EmailForm } from "./EmailForm";

export const SectionEmail = styled(Section)`
  h1 {
    ${tw`text-4xl font-medium`}
  }

  h6 {
    ${tw`font-semibold`}
  }
`;

export const EmailSection = () => {
  return (
    <SectionEmail className="bg-gradient-to-r from-blue-400 to-pink py-16" id="contact">
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
