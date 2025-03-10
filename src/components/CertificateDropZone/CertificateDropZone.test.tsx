import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
import { CertificateDropZone } from "./CertificateDropZone";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import { ConnectMetamaskOverlay } from "./ConnectMetamaskOverlay";
import fileContent from "./../../test/fixture/local/w3c/v1_tr_er.json";
jest.mock("qr-scanner");

const store = configureStore();

const renderWithStore = (additionalProps: any) => {
  return render(
    <Provider store={store}>
      <CertificateDropZoneContainer {...additionalProps}>
        <CertificateDropZone />
      </CertificateDropZoneContainer>
    </Provider>
  );
};

const mockShowOverlay = jest.fn();
const mockCloseOverlay = jest.fn();

const OverlayProvider: React.FC = ({ children }) => {
  return (
    <OverlayContext.Provider
      value={{
        showOverlay: mockShowOverlay,
        closeOverlay: mockCloseOverlay,
        overlayContent: null,
        isOverlayVisible: false,
        setOverlayVisible: () => {},
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

describe("CertificateDropZone", () => {
  it("shows QrReader when qrReaderVisible is true", () => {
    renderWithStore({
      updateNetworkId: () => {},
    });
    fireEvent.click(screen.getByText("Scan QR Code"));
    expect(screen.getByTestId("qr-code-reader")).not.toBeNull();
  });

  it("shows CertificateDropZone when qrReaderVisible is false", () => {
    renderWithStore({
      updateNetworkId: () => {},
    });
    expect(screen.getByTestId("certificate-dropzone")).not.toBeNull();
  });

  it("opens ConnectMetamaskOverlay when a file with chainId is dropped and no account is connected", async () => {
    // Mock the useProviderContext hook
    jest.mock("../../common/contexts/provider", () => ({
      useProviderContext: () => ({
        currentChainId: 1,
        account: null, // Ensure account is null to trigger the overlay
      }),
    }));

    const file = new File([JSON.stringify(fileContent)], "test.json", { type: "application/json" });

    render(
      <Provider store={store}>
        <OverlayProvider>
          <CertificateDropZone />
        </OverlayProvider>
      </Provider>
    );

    // Debug the rendered DOM
    screen.debug();

    const dropzone = screen.getByTestId("certificate-dropzone");

    // Create a mock dataTransfer object
    const dataTransfer = {
      files: [file],
      items: [
        {
          kind: "file",
          type: "application/json",
          getAsFile: () => file,
        },
      ],
      types: ["Files"],
    };

    // Simulate the drop event
    fireEvent.drop(dropzone, {
      dataTransfer,
    });

    // Check if onDrop was triggered
    await waitFor(() => {
      expect(mockShowOverlay).toHaveBeenCalledWith(
        <ConnectMetamaskOverlay handleConnection={expect.any(Function)} handleDispatch={expect.any(Function)} />
      );
    });
  });
});
