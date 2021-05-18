import React from "react";
import styled from "@emotion/styled";

const VerifyButton = styled.div`
  .verify-document-btn {
    align-items: center;
    padding: 12px 16px;
    width: 183px;
    height: 48px;
    left: 96px;
    top: 507px;
    background: #3b8cc5;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    color: #ffffff;
    font-weight: bold;
  }
`;

// const BackgroundImage = styled.div`
//   background-repeat: no-repeat;
//   background-position: top right;
//   background-image: url("/static/images/home/map.png");
//   // @media screen and (min-width: 480px) {
//   //   background-image: url("/static/images/home/map.png");
//   // }
// `;

const DescriptionSection = () => {
  return (
    <section id="welcome" className="bg-brand-100 h-full text-gray-700 md:pt-16">
      <div className="relative bg-135% bg-right-bottom bg-homepage-map bg-no-repeat py-16 md:bg-auto md:h-full md:bg-right-top">
        <div className="container md:h-140">
          <div className="md:w-6/12">
            <div className="w-5/5 text-center md:py-8 md:text-left">
              <h1 className="font-ubuntu text-6xl leading-none">A Trust Network for, Trading Partners</h1>
              <p className="text-base mb-85% leading-5 py-6 md:w-4/5 md:mb-16">
                A digital utility that comprises a set of globally-accepted standards and frameworks that connects
                governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
                electronic trade documents across digital platforms.
              </p>
              <div className="absolute flex -mt-10% right-0 left-0 justify-center items-end md:relative md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" fill="#F57A29" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#FFFFFF" />
                </svg>
                <VerifyButton>
                  <button className="verify-document-btn">Verify Documents</button>
                </VerifyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="lg:absolute lg:top-0 lg:right-0 lg:pb-16">
          <img src="/static/images/home/map.png" />
        </div> */}
    </section>
  );
};

export const WelcomeSection = DescriptionSection;
