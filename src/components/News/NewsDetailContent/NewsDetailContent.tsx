import React, { FunctionComponent } from "react";
import { TagBorderedSm } from "./../../../components/UI/Tag";
import { NewsSingle } from "./../types";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

export const NewsDetailContent: FunctionComponent<{ detail: NewsSingle }> = ({
  detail,
}) => {
  return (
    <div className="bg-white text-cloud-800 drop-shadow-xl rounded-xl p-8">
      <TagBorderedSm className="mb-4 border-cloud-300 text-cloud-800">
        {detail.type}
      </TagBorderedSm>
      <h3 className="mb-4 leading-8">{detail.attributes.title}</h3>
      <p className="text-sm text-cloud-300 mb-4">
        {format(new Date(detail.attributes.date), "d MMM yyyy")}
      </p>
      <ReactMarkdown className="wysiwyg">{detail.body}</ReactMarkdown>
    </div>
  );
};
