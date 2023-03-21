import React, { FunctionComponent, useState, useEffect } from "react";
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
  const [filteredFaqs, setFilteredFaqs] = useState<FAQS[]>([]);

  useEffect(() => {
    const allFaqs = importAll(require.context("../../../cms/faq/", false, /\.md$/)) as FAQS[];
    const faqs = allFaqs.filter((faq) => {
      return faq.attributes.type === faqType;
    });
    setFilteredFaqs(getSortedByDateAsc(faqs));
  }, [faqType]);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-2/3">
        {filteredFaqs.map((faq, index) => (
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
            <ReactMarkdown className="wysiwyg">{faq.body}</ReactMarkdown>
          </AccordionItem>
        ))}
      </div>
      <div className="w-1/3 hidden lg:block">
        <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
      </div>
    </div>
  );
};
