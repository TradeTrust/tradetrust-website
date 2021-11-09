import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedErrors } from "../DetailedErrors";

interface ViewVerificationErrorProps {
  resetData: () => void;
}

export const ViewVerificationError: FunctionComponent<ViewVerificationErrorProps> = ({ resetData }) => {
  const { verificationStatus } = useSelector((state: RootState) => state.certificate);

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <div className="w-auto mr-2">
          <img src="/static/images/dropzone/invalid.svg" alt="Document invalid" />
        </div>
        <div className="w-auto">
          <p className="text-2xl">This document is not valid</p>
        </div>
      </div>
      <DetailedErrors verificationStatus={verificationStatus} />
      <Link
        to="/faq"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button className={`text-white bg-red-500 border-red-500 hover:bg-red-300 hover:border-red-300`}>
          What Should I do?
        </Button>
      </Link>
      <br />
      <div
        data-testid="try-another"
        className="my-8 transition-colors duration-200 underline cursor-pointer text-red-500 hover:text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          resetData();
        }}
      >
        Try another document
      </div>
    </div>
  );
};
