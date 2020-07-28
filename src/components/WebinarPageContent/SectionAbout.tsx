import React from "react";
import styled from "@emotion/styled";
import { vars } from "../../styles";

interface SectionAboutProps {
  className?: string;
}

export const SectionAboutUnStyled = ({ className }: SectionAboutProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 order-lg-2">
            <h2>About TradeTrust</h2>
            <p>
              TradeTrust comprises a set of globally-accepted trade process standards and frameworks, that connects
              governments and businesses to a public blockchain. In doing so, it enables interoperability across
              different platforms so that electronic trade documents can be exchanged in a trusted fashion across these
              digital platforms.
            </p>
          </div>
          <div className="col-12 col-lg-7 order-lg-1">
            <img className="img-fluid w-100" src="/static/images/webinar/about.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionAbout = styled(SectionAboutUnStyled)`
  padding: 60px 0;
  background-color: ${vars.greyLightest};
`;
