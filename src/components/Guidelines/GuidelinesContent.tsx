import React, { FunctionComponent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AccordionItem } from "../../components/UI/Accordion/AccordionItem";
import { importAll } from "../../common/utils/importAll";
import { getSortedByDateAsc } from "../../utils";

export type Guidelines = {
  body: string;
  attributes: {
    title: string;
  };
};

let guidelines = importAll(require.context("../../../cms/guidelines/", false, /\.md$/)) as Guidelines[];
guidelines = getSortedByDateAsc(guidelines);

export const GuidelinesContent: FunctionComponent = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-2/3">
        {guidelines.map((guideline, index) => (
          <AccordionItem
            key={`guideline-${index}`}
            classNameContainer="bg-white mb-2"
            classNameCollapse="rounded p-4"
            classNameContent="pl-4 pr-16 pb-4"
            heading={guideline.attributes.title}
            openIndex={openIndex}
            accordionIndex={index}
            setOpenIndex={setOpenIndex}
          >
            <ReactMarkdown className="wysiwyg">{guideline.body}</ReactMarkdown>
          </AccordionItem>
        ))}
      </div>
      <div className="w-1/3 hidden lg:block">
        <img className="mx-auto" src="/static/images/guidelines/Guidelines.png" alt="Guidelines person" />
      </div>
    </div>
  );
};
