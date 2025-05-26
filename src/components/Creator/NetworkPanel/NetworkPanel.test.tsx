import { render, screen } from "@testing-library/react";
import React from "react";
import { NetworkPanel } from "./NetworkPanel";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";

// Mock the useProviderContext hook
jest.mock("../../../common/contexts/provider", () => {
  const originalModule = jest.requireActual("../../../common/contexts/provider");
  return {
    ...originalModule,
    useProviderContext: jest.fn(),
  };
});

// Mock the ConnectToMetamask component
jest.mock("../../ConnectToMetamask", () => ({
  __esModule: true,
  default: () => <div data-testid="connect-to-metamask">Connect to Metamask</div>,
}));

// Mock the ConnectToMagicLink component
jest.mock("../../ConnectToMagicLink", () => ({
  __esModule: true,
  default: () => <div data-testid="connect-to-magic-link">Connect to Magic Link</div>,
}));

describe("NetworkPanel", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useProviderContext as jest.Mock).mockReturnValue({
      currentChainId: 1, // Ethereum Mainnet
      providerType: SIGNER_TYPE.METAMASK,
    });
  });

  it("should not render when isTransferableRecord is false", () => {
    render(<NetworkPanel isTransferableRecord={false} />);
    expect(screen.queryByText("Selected Network:")).not.toBeInTheDocument();
  });

  it("should render when isTransferableRecord is true", () => {
    render(<NetworkPanel isTransferableRecord={true} />);
    expect(screen.getByText("Selected Network:")).toBeInTheDocument();
    // Check that the network name is displayed correctly
    const networkLabel = getChainInfo(1).networkLabel;
    expect(screen.getByTestId("selected-network")).toHaveTextContent(networkLabel);
    // Check that the ConnectToMetamask component is rendered
    expect(screen.getByTestId("connect-to-metamask")).toBeInTheDocument();
  });

  it("should render ConnectToMagicLink when provider type is MAGIC", () => {
    // Override the mock for this test
    (useProviderContext as jest.Mock).mockReturnValue({
      currentChainId: 1,
      providerType: SIGNER_TYPE.MAGIC,
    });

    render(<NetworkPanel isTransferableRecord={true} />);
    // Check that the ConnectToMagicLink component is rendered
    expect(screen.getByTestId("connect-to-magic-link")).toBeInTheDocument();
  });
});
