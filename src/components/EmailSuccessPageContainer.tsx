import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { Check } from "react-feather";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Section } from "./Layout/Section";

export const SectionEmailSuccess = styled(Section)`
  ${tw`text-grey-700 py-16`}
`;

export const EmailSuccessPageContainer: FunctionComponent = () => {
  return (
    <SectionEmailSuccess>
      <div className="max-w-md bg-white mx-auto rounded-lg shadow text-center overflow-hidden">
        <div className="flex items-center justify-center p-12 text-white bg-gradient-to-r from-blue-400 to-pink">
          <div className="border-4 border-solid border-white rounded-full w-20 h-20 flex items-center justify-center">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="mb-0 ml-8 font-semibold text-4xl uppercase">Success</h1>
        </div>
        <div className="flex flex-wrap px-6 py-12">
          <div className="w-full">
            <h5 className="font-semibold">Thank you for your email enquiry.</h5>
            <p>We will get back to you shortly!</p>
            <p>
              Back to <Link to="/">home page</Link>.
            </p>
          </div>
        </div>
      </div>
    </SectionEmailSuccess>
  );
};
