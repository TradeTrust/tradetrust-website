import styled from "@emotion/styled";
import React from "react";
import { mixin, vars } from "./../../styles";
import content from "./FaqContent.json";

interface FaqContentProps {
  className?: string;
}

export const FaqContentUnStyled = ({ className }: FaqContentProps) => (
  <div className={`${className} py-12`}>
    <div className="container">
      <div className="flex w-full justify-center">
        <h1 className="mb-12">Frequently Asked Questions</h1>
      </div>
      {content.map(({ category, faq = [] }, indexContent) => (
        <div className="flex" key={indexContent}>
          <div className="w-full lg:w-8/12 mx-auto">
            <h4 className="text-brand-orange font-semibold text-2xl">{category}</h4>
            {faq.map(({ question, answer }, indexFaq) => (
              <div className="py-4" key={indexFaq}>
                <h5>{question}</h5>
                <div className="answer" dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const FaqContent = styled(FaqContentUnStyled)`
  h5 {
    ${mixin.fontSize(18)};
    ${mixin.fontMontserratSemibold};
    color: ${vars.greyDark};
    padding-bottom: 0;
  }

  .answer {
    color: ${vars.brandNavy};
  }
`;
