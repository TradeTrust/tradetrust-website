import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { TagBorderedSm } from "./../../../components/UI/Tag";
import { NewsSingle } from "./../types";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

const Wysiwyg = styled.div`
  img {
    width: 100%;
    height: auto;
    margin-bottom: 24px;
  }

  p {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  a {
    word-break: break-word;
  }
`;

export const NewsDetailContent: FunctionComponent<{ detail: NewsSingle }> = ({ detail }) => {
  return (
    <div className="bg-white text-gray-600 shadow-lg rounded-lg p-8">
      <TagBorderedSm className="mb-4">{detail.type}</TagBorderedSm>
      <h3 className="mb-4 leading-8">{detail.attributes.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{format(new Date(detail.attributes.date), "d MMM yyyy")}</p>
      <Wysiwyg>
        <ReactMarkdown>{detail.body}</ReactMarkdown>
      </Wysiwyg>
    </div>
  );
};
