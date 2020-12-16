import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";
import { mixin } from "../../styles";
import { Section } from "../Layout/Section";

export const SectionDocumentation = styled(Section)`
  ${tw`py-20 text-center`}

  h1 {
    ${tw`font-medium`}
  }

  p {
    ${tw`text-grey-700`}
  }

  a {
    ${tw`block text-grey-700 no-underline`}

    p {
      ${tw`transition duration-300 ease-out text-blue`}
      ${mixin.fontSourcesansproBold};
    }

    &:hover {
      .fa-file-alt,
      .fa-code {
        ${tw`text-navy`}
      }

      p {
        ${tw`text-orange`}
      }
    }
  }

  .fa-file-alt,
  .fa-code {
    ${tw`transition duration-300 ease-out mb-5`}
  }

  .fa-file-alt {
    ${tw`text-5xl`}
  }

  .fa-code {
    ${tw`text-4xl`}
  }
`;

export const DocumentationSection = () => {
  return (
    <SectionDocumentation id="integrate" className="bg-grey-100">
      <div className="mb-12">
        <h1 className="mb-3">Integrate TradeTrust into your platform?</h1>
        <p>Get started today! Browse the Documentation or download the source code.</p>
      </div>
      <div className="flex justify-center items-end">
        <div className="w-auto px-8">
          <a href="https://docs.tradetrust.io/" target="_blank" rel="noopener noreferrer">
            <i className="far fa-file-alt" />
            <p>Documentation</p>
          </a>
        </div>
        <div className="w-auto px-8">
          <a href="https://github.com/tradeTrust/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-code" />
            <p>Source code</p>
          </a>
        </div>
      </div>
    </SectionDocumentation>
  );
};
