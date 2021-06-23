import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { DefaultView } from "./DefaultView";

describe("defaultView", () => {
  it("displays correctly if accept is true", () => {
    const { queryByText, getByTestId } = render(
      <DefaultView hover={true} accept={true} toggleQrReaderVisible={() => {}} verificationError={""} />
    );
    expect(getByTestId("viewer-container")).toBeInTheDocument();
    expect(queryByText("File cannot be read")).toBeFalsy();
  });

  it("displays correctly class if accept is false", () => {
    const { getByText, getByTestId } = render(
      <DefaultView hover={true} accept={false} toggleQrReaderVisible={() => {}} verificationError={""} />
    );
    expect(getByTestId("viewer-container")).toBeInTheDocument();
    expect(getByText("File cannot be read", { exact: false })).toBeInTheDocument();
  });

  it("runs toggleQrReaderVisible when `Scan QR Code` is pressed", () => {
    const toggleQrReaderVisible = jest.fn();
    const { getByTestId } = render(
      <DefaultView hover={false} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} verificationError={""} />
    );
    const button = getByTestId("scan-qr-button");
    fireEvent.click(button);
    expect(toggleQrReaderVisible).toHaveBeenCalledTimes(1);
  });

  it("displays error if given verification error", () => {
    const sampleErrorMessage = "QR Code is not formatted to TradeTrust specifications";
    const { getByText } = render(
      <DefaultView
        hover={false}
        accept={true}
        toggleQrReaderVisible={() => {}}
        verificationError={sampleErrorMessage}
      />
    );
    expect(getByText(sampleErrorMessage)).toBeInTheDocument();
  });
});
