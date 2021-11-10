import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { ViewVerificationError } from "./ViewVerificationError";
import { Provider } from "react-redux";
import { configureStore } from "../../../store";
import { whenDocumentHashInvalidAndNotIssued } from "../../../test/fixture/verifier-responses";

const RenderWithStore = ({ children, ...props }: any) => {
  const {
    raw,
    rawModified,
    verificationStatus,
    verificationPending,
    verificationError,
    retrieveCertificateByActionState,
    retrieveCertificateByActionError,
  } = props;

  const store = configureStore({
    certificate: {
      raw,
      rawModified,
      verificationStatus,
      verificationPending,
      verificationError,
      retrieveCertificateByActionState,
      retrieveCertificateByActionError,
    },
  });
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

describe("ViewVerificationError", () => {
  it("displays texts correctly", () => {
    render(
      <RenderWithStore verificationStatus={whenDocumentHashInvalidAndNotIssued}>
        <ViewVerificationError resetData={() => {}} />
      </RenderWithStore>
    );

    expect(screen.getByText("This document is not valid")).toBeInTheDocument();
    expect(screen.getByText("What Should I do?")).toBeInTheDocument();
    expect(screen.getByText("Try another document")).toBeInTheDocument();
  });

  it("should reset document", () => {
    const resetData = jest.fn();

    render(
      <RenderWithStore verificationStatus={whenDocumentHashInvalidAndNotIssued}>
        <ViewVerificationError resetData={resetData} />
      </RenderWithStore>
    );

    fireEvent.click(screen.getByText("Try another document"));
    expect(resetData).toBeCalledTimes(1);
  });
});
