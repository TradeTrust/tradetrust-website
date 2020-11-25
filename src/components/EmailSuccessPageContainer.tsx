import styled from "@emotion/styled";
import { rgba } from "polished";
import React from "react";
import { Check } from "react-feather";
import { Link } from "react-router-dom";
import { mixin, vars } from "../styles";
import { Section } from "./Layout/Section";

export const SectionEmailSuccess = styled(Section)`
  color: ${vars.greyDark};
  padding-top: 60px;
  padding-bottom: 60px;

  h1 {
    ${mixin.fontMontserratSemibold}
    ${mixin.fontSize(36)}
    text-transform: uppercase;
  }

  h5 {
    ${mixin.fontMontserratSemibold}
  }

  .bg-gradient {
    background-image: linear-gradient(to right, ${vars.blueLight} 0%, ${vars.pink} 100%);
    color: ${vars.white};
  }

  .success-card {
    background-color: ${vars.white};
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    box-shadow: 0 8px 16px ${rgba(vars.black, 0.1)};
    text-align: center;
    overflow: hidden;
  }

  .tick {
    border: 4px solid ${vars.white};
    width: 90px;
    height: 90px;
    border-radius: 50%;
    padding: 8px;
  }
`;

export const EmailSuccessPageContainer = () => {
  return (
    <SectionEmailSuccess>
      <div className="success-card">
        <div className="flex items-center px-6 py-12 bg-gradient">
          <div className="w-auto mx-auto">
            <div className="tick mb-4">
              <Check />
            </div>
          </div>
          <div className="w-full">
            <h1 className="mb-0">Success</h1>
          </div>
        </div>
        <div className="flex flex-wrap px-6 py-12">
          <div className="w-full">
            <h5>Thank you for your email enquiry.</h5>
            <p>We will get back to you shortly!</p>
            <p>
              Back to <Link to="/">home page</Link>.
            </p>
          </div>
        </div>
      </div>
    </SectionEmailSuccess>
  );
};
