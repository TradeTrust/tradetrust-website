import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../styles";
import { Section } from "../Layout/Section";
import { vars } from "../../styles";

export const SectionDocumentation = styled(Section)`
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: center;

  h1 {
    ${mixin.fontMontserratSemibold}
    ${mixin.fontSize(36)}
  }

  p {
    ${mixin.fontSize(18)}
    color: ${vars.greyDark};
  }

  a {
    display: block;
    color: ${vars.greyDark};
    text-decoration: none;

    p {
      transition: color 0.3s ${vars.easeOutCubic};
      color: ${vars.blue};
      ${mixin.fontSourcesansproBold};
    }

    &:hover {
      .fa-file-alt,
      .fa-code {
        color: ${vars.brandNavy};
      }

      p {
        color: ${vars.brandOrange};
      }
    }
  }

  .fa-file-alt,
  .fa-code {
    transition: color 0.3s ${vars.easeOutCubic};
    margin-bottom: 20px;
  }

  .fa-file-alt {
    ${mixin.fontSize(50)}
  }

  .fa-code {
    ${mixin.fontSize(40)}
  }
`;

export const DocumentationSection = () => {
  return (
    <SectionDocumentation id="integrate" className="bg-grey-lightest">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="mb-3">Integrate Tradetust into your platform?</h1>
          <p>Get started today! Browse the Documentation or download the source code.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mx-md-auto col-lg-4">
          <div className="row align-items-end">
            <div className="col">
              <a href="https://docs.tradetrust.io/" target="_blank" rel="noopener noreferrer">
                <i className="far fa-file-alt" />
                <p>Documentation</p>
              </a>
            </div>
            <div className="col">
              <a href="https://github.com/tradeTrust/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-code" />
                <p>Source code</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionDocumentation>
  );
};
