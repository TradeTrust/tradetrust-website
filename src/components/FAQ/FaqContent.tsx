import React from "react";
import ReactMarkdown from "react-markdown";
import cmsContent from "./../../../cms/faq/faq.json";
import styled from "@emotion/styled";
import config from "./../../../src/tailwind.js";

const Wysiwyg = styled.div`
  h4 {
    color: ${config.theme.extend.colors.orange.default};
    margin-bottom: 32px;
  }

  h5 {
    margin-top: 32px;
    margin-bottom: 8px;
  }
`;

export const FaqContent = () => (
  <div className="py-12">
    <div className="container">
      <div className="flex">
        <div className="w-full lg:w-8/12 mx-auto">
          <Wysiwyg className="text-grey-700">
            <h1 className="text-center mb-12">{cmsContent.title}</h1>
            <ReactMarkdown>{cmsContent.body}</ReactMarkdown>
          </Wysiwyg>
        </div>
      </div>
    </div>
  </div>
);
