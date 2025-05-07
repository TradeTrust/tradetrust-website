import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import ConnectToMetamask from "./index";
import { OverlayContext } from "../../common/contexts/OverlayContext";

// Mock ReactTooltip module
jest.mock("react-tooltip", () => {
  const mockModule = {
    __esModule: true,
    default: function ReactTooltip(props: { getContent: () => null }) {
      // Get content so we can test the tooltip value
      if (props.getContent) {
        mockModule.tooltipContent = props.getContent();
      }
      return null;
    },
    show: jest.fn(),
    hide: jest.fn(),
    tooltipContent: null,
  };
  return mockModule;
});

// Mock the useProviderContext hook
jest.mock("../../common/contexts/provider", () => {
  const originalModule = jest.requireActual("../../common/contexts/provider");
  return {
    ...originalModule,
    useProviderContext: jest.fn(),
  };
});

// Mock the navigator.clipboard object
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock the OverlayContext
const mockShowOverlay = jest.fn();
const mockOverlayContext = {
  showOverlay: mockShowOverlay,
  closeOverlay: jest.fn(),
};

describe("ConnectToMetamask", () => {
  const mockUpgradeToMetaMaskSigner = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the useProviderContext hook
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: null, // Default to no account connected
      providerType: SIGNER_TYPE.METAMASK,
    });
  });

  it("renders the 'Connect to Metamask' button when no account is connected", () => {
    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    expect(screen.getByTestId("connectToWallet")).toBeInTheDocument();
    expect(screen.getByText("Connect to Metamask")).toBeInTheDocument();
  });

  it("renders the active wallet address when an account is connected", () => {
    const mockAccount = "0x1234567890123456789012345678901234567890";
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: mockAccount,
      providerType: SIGNER_TYPE.METAMASK,
    });

    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    expect(screen.getByTestId("activeWallet")).toBeInTheDocument();
    expect(screen.getByText("Active Wallet")).toBeInTheDocument();
    expect(screen.getByText(`...${mockAccount.slice(-4)}`)).toBeInTheDocument(); // Truncated address
  });

  it("calls upgradeToMetaMaskSigner when the 'Connect to Metamask' button is clicked", async () => {
    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    fireEvent.click(screen.getByTestId("connectToWallet"));
    await waitFor(() => {
      expect(mockUpgradeToMetaMaskSigner).toHaveBeenCalled();
    });
  });

  it("shows an error overlay with the correct message when connecting to MetaMask fails", async () => {
    const mockError = {
      message: "Failed to connect",
      code: 4001, // Simulate a user-denied authorization error
    };
    mockUpgradeToMetaMaskSigner.mockRejectedValueOnce(mockError);

    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    fireEvent.click(screen.getByTestId("connectToWallet"));

    await waitFor(() => {
      expect(mockShowOverlay).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            title: "Failed to connect", // Check for the title
            isSuccess: false,
            isButtonMetamaskInstall: false,
          }),
        })
      );
    });
  });

  it("copies the wallet address to the clipboard when the active wallet is clicked", async () => {
    const mockAccount = "0x1234567890123456789012345678901234567890";
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: mockAccount,
      providerType: SIGNER_TYPE.METAMASK,
    });

    // Mock successful clipboard write
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    // Click the wallet to copy address
    await act(async () => {
      fireEvent.click(screen.getByTestId("activeWallet"));
    });

    // Verify clipboard was called with the right address
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockAccount);
  });

  it("shows an error message when copying the wallet address fails", async () => {
    const mockAccount = "0x1234567890123456789012345678901234567890";
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: mockAccount,
      providerType: SIGNER_TYPE.METAMASK,
    });

    // Mock the clipboard.writeText to throw an error
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error("Failed to copy"));

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <OverlayContext.Provider
        value={{
          ...mockOverlayContext,
          overlayContent: null,
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("activeWallet"));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockAccount);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to copy: ", expect.any(Error));
  });
});
