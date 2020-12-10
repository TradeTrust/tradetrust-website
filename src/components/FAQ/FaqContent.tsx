import React from "react";
import content from "./FaqContent.json";

export const FaqContent = () => (
  <div className="py-12">
    <div className="container">
      <div className="flex w-full justify-center">
        <h1 className="mb-12">Frequently Asked Questions</h1>
      </div>
      {content.map(({ category, faq = [] }, indexContent) => (
        <div className="flex" key={indexContent}>
          <div className="w-full lg:w-8/12 mx-auto">
            <h4 className="text-orange font-semibold text-2xl">{category}</h4>
            {faq.map(({ question, answer }, indexFaq) => (
              <div className="py-4" key={indexFaq}>
                <h5 className="text-lg font-semibold text-grey-700 pb-0">{question}</h5>
                <div className="text-navy" dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
