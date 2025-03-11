import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ConnectToMetamask from "./index";
import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import { useProviderContext } from "../../common/contexts/provider";

// Mock the OverlayContext
const mockShowOverlay = jest.fn();
const mockOverlayContext = {
  showOverlay: mockShowOverlay,
  closeOverlay: jest.fn(),
};

// Mock the useProviderContext hook
jest.mock("../../common/contexts/provider", () => ({
  useProviderContext: jest.fn(),
}));

// Mock the navigator.clipboard object
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

jest.mock("react-tooltip", () => ({
  __esModule: true,
  default: () => null, // Mock ReactTooltip to render nothing
  show: jest.fn(),
  hide: jest.fn(),
}));

describe("ConnectToMetamask", () => {
  const mockUpgradeToMetaMaskSigner = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the useProviderContext hook
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: null, // Default to no account connected
    });
  });

  it("renders the 'Connect to Metamask' button when no account is connected", () => {
    render(
      <OverlayContext.Provider
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
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
    });

    render(
      <OverlayContext.Provider
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    expect(screen.getByTestId("activeWallet")).toBeInTheDocument();
    expect(screen.getByText("Active Wallet")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockAccount.slice(0, mockAccount.length - 20)}...${mockAccount.slice(-4)}`)
    ).toBeInTheDocument(); // Truncated address
  });

  it("calls upgradeToMetaMaskSigner when the 'Connect to Metamask' button is clicked", async () => {
    render(
      <OverlayContext.Provider
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
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
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
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
    });

    render(
      <OverlayContext.Provider
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    // Simulate clicking the active wallet
    await act(async () => {
      fireEvent.click(screen.getByTestId("activeWallet"));
    });

    // Verify that the clipboard.writeText was called with the correct address
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockAccount);

    // Verify that the tooltip message was updated to "Copied!"
    expect(screen.getByTestId("activeWallet")).toHaveAttribute("data-tip", "Copied!");
  });

  it("shows an error message when copying the wallet address fails", async () => {
    const mockAccount = "0x1234567890123456789012345678901234567890";
    (useProviderContext as jest.Mock).mockReturnValue({
      upgradeToMetaMaskSigner: mockUpgradeToMetaMaskSigner,
      account: mockAccount,
    });

    // Mock the clipboard.writeText to throw an error
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error("Failed to copy"));

    render(
      <OverlayContext.Provider
        value={{ ...mockOverlayContext, overlayContent: null, isOverlayVisible: false, setOverlayVisible: () => {} }}
      >
        <ConnectToMetamask />
      </OverlayContext.Provider>
    );

    fireEvent.click(screen.getByTestId("activeWallet"));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockAccount);
      expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    });
  });
});
