import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";
import { Section } from "../Layout/Section";
import { URLS } from "../../constants";

export const SectionDocumentation = styled(Section)`
  ${tw`py-20 text-center`}

  h1 {
    ${tw`font-medium`}
  }

  p {
    ${tw`text-gray-700`}
  }

  a {
    ${tw`block text-gray-700 no-underline`}

    p {
      ${tw`transition duration-300 ease-out text-cerulean-500 font-semibold`}
    }

    &:hover {
      .fa-file-alt,
      .fa-code {
        ${tw`text-gray-500`}
      }

      p {
        ${tw`text-tangerine`}
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

export const DocumentationSection: FunctionComponent = () => {
  return (
    <SectionDocumentation id="integrate" className="bg-gray-100">
      <div className="mb-12">
        <h1 className="mb-3">Integrate TradeTrust into your platform?</h1>
        <p>Get started today! Browse the Documentation or download the source code.</p>
      </div>
      <div className="flex justify-center items-end">
        <div className="w-auto px-8">
          <a href={URLS.DOCS} target="_blank" rel="noopener noreferrer">
            <i className="far fa-file-alt" />
            <p>Documentation</p>
          </a>
        </div>
        <div className="w-auto px-8">
          <a href={URLS.GITHUB} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-code" />
            <p>Source code</p>
          </a>
        </div>
      </div>
    </SectionDocumentation>
  );
};
