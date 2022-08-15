import React, { FunctionComponent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AccordionItem } from "../../components/UI/Accordion/AccordionItem";
import { importAll } from "../../common/utils/importAll";
import { getSortedByDateAsc } from "../../utils";
import { FaqType } from "../../constants";

export type FAQS = {
  body: string;
  attributes: {
    title: string;
    type: FaqType;
  };
};

interface FAQ {
  faqType: FaqType;
}

export const FaqContent: FunctionComponent<FAQ> = ({ faqType }) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const allFaqs = importAll(require.context("../../../cms/faq/", false, /\.md$/)) as FAQS[];

  let faqs = allFaqs.filter((faq) => {
    return faq.attributes.type === faqType;
  });
  faqs = getSortedByDateAsc(faqs);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-2/3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={`faq-${index}`}
            classNameContainer="bg-white mb-2"
            classNameCollapse="rounded p-4"
            classNameContent="pl-4 pr-16 pb-4"
            heading={faq.attributes.title}
            openIndex={openIndex}
            accordionIndex={index}
            setOpenIndex={setOpenIndex}
          >
            <ReactMarkdown components={{ p: ({ ...props }) => <p className={"mb-4"} {...props} /> }}>
              {faq.body}
            </ReactMarkdown>
          </AccordionItem>
        ))}
      </div>
      <div className="mx-auto w-1/2 lg:w-1/3  hidden lg:block">
        <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
      </div>
    </div>
  );
};
