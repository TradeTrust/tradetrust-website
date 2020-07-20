import React from "react";
import styled from "@emotion/styled";
import content from "./FaqContent.json";
import { mixin, vars } from "./../../styles";

interface FaqContentProps {
  className?: string;
}

export const FaqContentUnStyled = ({ className }: FaqContentProps) => (
  <div className={`${className} py-5`}>
    <div className="container-custom">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Frequently Asked Questions</h1>
        </div>
      </div>
      {content.map(({ category, faq = [] }, indexContent) => (
        <div className="row" key={indexContent}>
          <div className="col-12 col-lg-8 mx-auto">
            <h4>{category}</h4>
            {faq.map(({ question, answer }, indexFaq) => (
              <div className="py-3" key={indexFaq}>
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
  h4 {
    ${mixin.fontMontserratSemibold};
    color: ${vars.brandOrange};
  }

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
