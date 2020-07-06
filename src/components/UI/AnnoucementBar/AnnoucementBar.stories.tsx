import React from "react";
import { AnnoucementBarUnStyled, AnnoucementBar } from "./AnnoucementBar";

export default {
  title: "UI/AnnoucementBar",
  component: AnnoucementBarUnStyled,
  parameters: {
    componentSubtitle: "Textual announcement.",
  },
};

export const Text = () => {
  return (
    <AnnoucementBar>
      <div className="row no-gutters align-items-center">
        <div className="col-12 col-lg-auto mr-3">
          <h6 className="mb-lg-0">Upcoming webinar:</h6>
        </div>
        <div className="col-12 col-lg">
          <p className="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            <a
              className="mx-3"
              href="https://form.gov.sg/#!/5ef05be8e4f89f001195ef4c"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </AnnoucementBar>
  );
};
