import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "../../store";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
jest.mock("qr-scanner");

const store = configureStore();

const renderWithStore = (additionalProps: any) => {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <CertificateDropZoneContainer {...additionalProps} />
      </Provider>
    </MemoryRouter>
  );
};

describe("certificateDropZoneContainer", () => {
  it("toggles qrReaderVisible when toggleQrReaderVisible is called", () => {
    const { getByTestId } = renderWithStore({ updateNetworkId: () => {} });
    fireEvent.click(screen.getByText("Scan QR Code"));
    expect(getByTestId("qr-code-reader")).toBeInTheDocument();
  });
});
