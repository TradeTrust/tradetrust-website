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
            <img className="mx-auto my-6" src="static/images/cost/open-source-icon.svg" alt="openSourceIcon" />
            <div className="px-2 md:px-16 lg:px-36 pb-8">
              TradeTrust&apos;s open-source code can be downloaded for free from{" "}
              <a href="https://github.com/TradeTrust/tradetrust-website" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{" "}
              under the open-source licensing terms. It can be easily integrated into any existing system of businesses
              and service providers to automate the document validation process and provide new service offerings to
              support viable use cases.
            </div>
            <div className="-mt-6">
              Leveraging on the immutability and security of cutting-edge technologies like Blockchain, Smart Contracts
              and Non-Fungible Tokens (NFTs), governments and businesses can endorse, exchange, verify electronic
              documents and enable the digitalisation of transferable documents into Electronic Transferable Records
              that have the legal ability^ to effect title transfer across different digital platforms seamlessly. A
              blockchain transaction fee, also known as gas fee, is incurred to execute a transaction on the blockchain
              and is paid to validators.
            </div>
            <h6 className="px-2 md:px-16 lg:px-36 pb-2 md:pb-16 xl:pb-24 mt-2 text-cloud-400">
              ^Singapore&apos;s 2021 amendment of its Electronic Transactions Act (one of the first few internationally,
              enables the creation and use of ETRs such as electronic Bills of Lading) empowering practitioners to reap
              the benefits of digitalisation more easily.
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};
