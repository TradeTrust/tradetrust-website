import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { configureStore } from "../../store";
import fileContent from "./../../test/fixture/stabilitytestnet/v2/ebl-withoutnetwork.json";
import { CertificateDropZone } from "./CertificateDropZone";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
import { MemoryRouter } from "react-router";
import NetworkSectionModel from "../NetworkSection/NetworkSectionModel";
import { HeaderIconState } from "../UI/Overlay/OverlayContent/Modal";
jest.mock("qr-scanner");

const store = configureStore();

const renderWithStore = (additionalProps: any) => {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <CertificateDropZoneContainer {...additionalProps}>
          <CertificateDropZone />
        </CertificateDropZoneContainer>
      </Provider>
    </MemoryRouter>
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
        setCollapsible: () => {},
        collapsible: false,
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
      <MemoryRouter>
        <Provider store={store}>
          <OverlayProvider>
            <CertificateDropZone />
          </OverlayProvider>
        </Provider>
      </MemoryRouter>
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
        <NetworkSectionModel
          collapsible={false}
          title="TradeTrust Document Uploaded"
          headerIconState={HeaderIconState.SUCCESS}
          cancelText="Cancel"
          continueText="Proceed"
          preContent={
            <div className="flex justify-center items-center">
              <p>Select network for transferable document verification.</p>
            </div>
          }
          postContent={<></>}
          nextStep={expect.any(Function)}
        />
      );
    });
  });
});
