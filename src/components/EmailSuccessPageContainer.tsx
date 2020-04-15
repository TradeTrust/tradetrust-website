import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Section } from "./Layout/Section";
import { vars, mixin } from "../styles";
import { rgba } from "polished";
import { SvgIcon, SvgIconChecked } from "./UI/SvgIcon";

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

  svg {
    width: 100%;
    height: 100%;
    color: ${vars.white};
  }
`;

export const EmailSuccessPageContainer = () => {
  return (
    <SectionEmailSuccess>
      <div className="success-card">
        <div className="row no-gutters align-items-center px-3 py-5 bg-gradient">
          <div className="col-auto mx-auto">
            <div className="tick mb-3">
              <SvgIcon>
                <SvgIconChecked />
              </SvgIcon>
            </div>
          </div>
          <div className="col-12">
            <h1 className="mb-0">Success</h1>
          </div>
        </div>
        <div className="row no-gutters px-3 py-5">
          <div className="col-12">
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
