import React from "react";

import { fireEvent, render } from "@testing-library/react";
import { DefaultView } from "./DefaultView";
import { Provider } from "react-redux";
import { configureStore } from "../../../store";

const store = configureStore();

const renderWithStore = (additionalProps: any) => {
  return render(
    <Provider store={store}>
      <DefaultView toggleQrReaderVisible={() => {}} verificationError="" {...additionalProps} />
    </Provider>
  );
};

describe("defaultView", () => {
  it("displays correctly if accept is true", () => {
    const { queryByText } = renderWithStore({
      hover: true,
      accept: true,
    });
    expect(queryByText("File cannot be read")).toBeFalsy();
  });

  it("displays correctly class if accept is false", () => {
    const { getByText } = renderWithStore({
      hover: true,
      accept: false,
    });
    expect(getByText("File cannot be read", { exact: false })).toBeInTheDocument();
  });

  it("runs toggleQrReaderVisible when `Scan QR Code` is pressed", () => {
    const toggleQrReaderVisible = jest.fn();
    const { getByTestId } = renderWithStore({
      hover: false,
      accept: true,
      toggleQrReaderVisible,
    });
    const button = getByTestId("scan-qr-button");
    fireEvent.click(button);
    expect(toggleQrReaderVisible).toHaveBeenCalledTimes(1);
  });

  it("displays error if given verification error", () => {
    const sampleErrorMessage = "QR Code is not formatted to TradeTrust specifications";
    const { getByText } = renderWithStore({
      hover: false,
      accept: true,
      verificationError: sampleErrorMessage,
    });
    expect(getByText(sampleErrorMessage)).toBeInTheDocument();
  });
});
