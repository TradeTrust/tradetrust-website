import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateCertificate } from "../../reducers/certificate";
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

const BackgroundImage = styled.div`
  background-repeat: no-repeat;
  background-position: top right;
  @media screen and (min-width: 480px) {
    background-image: url("/static/images/home/map.png");
  }
`;

const DescriptionSection = () => {
  return (
    <section id="welcome" className="bg-brand-100 text-gray-700 lg:py-16">
      <div className="relative py-16">
        <div className="container">
          <div className="md:w-6/12">
            <div className="w-5/5 text-center lg:py-8 lg:text-left">
              <h1 className="font-ubuntu text-6xl leading-none">A Trust Network for, Trading Partners</h1>
              <p className="text-base leading-5 py-6 lg:w-4/5">
                A digital utility that comprises a set of globally-accepted standards and frameworks that connects
                governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
                electronic trade documents across digital platforms.
              </p>
              <div className="absolute flex right-0 left-0 justify-center lg:relative lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="transparent"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" fill="#F57A29"></circle>
                  <polygon points="10 8 16 12 10 16 10 8" fill="#FFFFFF"></polygon>
                </svg>
                <VerifyButton>
                  <button className="verify-document-btn">Verify Documents</button>
                </VerifyButton>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:top-0 lg:right-0 lg:pb-16">
          <img src="/static/images/home/map.png" />
        </div>
      </div>
    </section>
  );
};

export const WelcomeSection = DescriptionSection;
