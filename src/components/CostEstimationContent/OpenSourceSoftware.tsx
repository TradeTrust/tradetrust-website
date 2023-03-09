import React, { FunctionComponent } from "react";

export const OpenSourceSoftware: FunctionComponent = () => {
  return (
    <section id="open-source-software" className="bg-white text-cloud-800 py-16">
      <div
        className="bg-no-repeat lg:bg-single-wave"
        style={{
          backgroundSize: "1920px auto",
          backgroundPosition: "center 120px",
        }}
      >
        <div className="container">
          <div className="text-center">
            <h2>Open-Source Software</h2>
            <img className="mx-auto my-12" src="static/images/cost/open-source-icon.svg" alt="openSourceIcon" />
            <div className="px-2 md:px-16 lg:px-36 pb-2 md:pb-16 xl:pb-24">
              TradeTrust’s open-source code can be downloaded for free from{" "}
              <a href="https://github.com/TradeTrust/tradetrust-website" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{" "}
              under the open-source licensing terms. It can be easily integrated into any existing system of businesses
              and service providers to automate the document validation process and provide new service offerings to
              support viable use cases. Governments and businesses can endorse, exchange, verify electronic documents
              and effect title transfer across different digital platforms seamlessly.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
