import React from "react";
import styled from "@emotion/styled";
import { vars } from "../../styles";

interface SectionByProps {
  className?: string;
}

export const SectionByUnStyled = ({ className }: SectionByProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-lg-9 mx-lg-auto">
            <p>
              Reserve your slot(s) by simply clicking on the &lsquo;Register Now&lsquo; button and select the session(s)
              you wish to attend. The webinar links and details will be sent to registered participants closer to the
              webinar date. You may reserve all six sessions in one registration or choose to register individually.
            </p>
            <p>
              For enquiries, email us at <a href="mailto:tradetrust@imda.gov.sg">tradetrust@imda.gov.sg</a>
            </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12 col-lg-5 mx-lg-auto">
            <p>Brought to you by:</p>
            <div className="row align-items-center justify-content-center">
              <div className="col-3 col-lg-5">
                <img className="img-fluid" src="/static/images/common/logo-govtech.png" alt="" />
              </div>
              <div className="col-4 col-lg-6">
                <img className="img-fluid" src="/static/images/common/logo-imda.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionBy = styled(SectionByUnStyled)`
  padding: 45px 0;
  background-color: ${vars.greyLightest};
`;
