import React, { FunctionComponent, useState } from "react";
import { compareDesc } from "date-fns";
import ReactMarkdown from "react-markdown";
import { importAll } from "../../common/utils/importAll";

export type FAQS = {
  body: string;
  attributes: {
    title: string;
  };
};

let faqs = importAll(require.context("../../../cms/faq/", false, /\.md$/)) as FAQS[];

const getSortedByPublishedDateDesc = (items: any[]) => {
  items.sort((a, b): number => {
    return compareDesc(new Date(a.attributes.publishedDate), new Date(b.attributes.publishedDate));
  });
  return items;
};

faqs = getSortedByPublishedDateDesc(faqs);

const FaqElement: FunctionComponent<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`transition-color duration-200 cursor-pointer bg-white`}>
      <div
        className={`flex justify-between items-center p-4 rounded transition-colors duration-200 hover:text-blue ${
          open ? "text-blue" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <h5>{question}</h5>
        <svg
          className={`transition-transform duration-200 transform ${open ? "rotate-90" : "rotate-0"}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-current"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="stroke-current"
            d="M8 10L12 14L16 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`overflow-hidden bg-white mb-2 ${open ? "" : "h-0"}`}>
        <ReactMarkdown className="px-4 pb-4">{answer}</ReactMarkdown>
      </div>
    </div>
  );
};

export const FaqContent: FunctionComponent = () => (
  <div className="flex flex-wrap mt-4">
    <div className="w-full lg:w-2/3">
      {faqs.map((faq, index) => (
        <FaqElement key={index} question={faq.attributes.title} answer={faq.body} />
      ))}
    </div>
    <div className="mx-auto my-8 w-1/2 lg:w-1/3">
      <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
    </div>
  </div>
);
