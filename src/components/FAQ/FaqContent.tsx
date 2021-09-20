import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { AccordionItem } from "../../components/UI/Accordion/AccordionItem";
import { importAll } from "../../common/utils/importAll";
import { getSortedByDateAsc } from "../../utils";

export type FAQS = {
  body: string;
  attributes: {
    title: string;
  };
};

let faqs = importAll(require.context("../../../cms/faq/", false, /\.md$/)) as FAQS[];
faqs = getSortedByDateAsc(faqs);

export const FaqContent: FunctionComponent = () => (
  <div className="flex flex-wrap mt-4">
    <div className="w-full lg:w-2/3">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={`faq-${index}`}
          containerClassName="bg-white mb-2"
          collapseClassName="rounded p-4"
          contentClassName="px-4 pb-4"
          heading={faq.attributes.title}
        >
          <ReactMarkdown>{faq.body}</ReactMarkdown>
        </AccordionItem>
      ))}
    </div>
    <div className="mx-auto my-8 w-1/2 lg:w-1/3">
      <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
    </div>
  </div>
);
