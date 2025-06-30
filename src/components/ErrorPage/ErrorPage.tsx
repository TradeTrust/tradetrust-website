import React, { FunctionComponent } from "react";

export interface ErrorPageProps {
  pageTitle: string;
  header: string;
  description: string;
  image: string;
}

export const ErrorPage: FunctionComponent<ErrorPageProps> = ({ pageTitle, header, description, image, children }) => {
  return (
    <div
      className="bg-cerulean-50 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${"/static/images/common/wave-lines.png"})` }}
    >
      <div className="container">
        <div className="py-8">
          <h2 className="bold text-cloud-800 mb-8">{pageTitle}</h2>
          <div className="max-w-2xl mx-auto flex flex-wrap items-center">
            <div className="mx-auto w-1/2 px-4 mb-8 sm:mb-0">
              <img src={image} alt="" />
            </div>
            <div className="w-full sm:w-1/2 px-4">
              <h1 className="text-xl sm:text-4xl mb-4">{header}</h1>
              <h3 className="font-normal leading-tight text-lg sm:text-2xl">{description}</h3>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
