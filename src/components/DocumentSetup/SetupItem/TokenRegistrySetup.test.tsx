import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { TokenRegistrySetup } from "./TokenRegistrySetup";
import { CreatorItemState, useCreatorContext } from "../../../common/contexts/CreatorContext";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { ChainId } from "../../../constants/chain-info";

import { DocumentSetupType } from "../DocumentSetup";

// Mock the contexts and dependencies
jest.mock("../../../common/contexts/CreatorContext");
jest.mock("../../../common/contexts/provider");
jest.mock("react-feather");

const mockUseCreatorContext = useCreatorContext as jest.MockedFunction<typeof useCreatorContext>;
const mockUseProviderContext = useProviderContext as jest.MockedFunction<typeof useProviderContext>;
const mockProviderOrSigner = {
  getChainId: jest.fn().mockResolvedValue(ChainId.Sepolia),
  getAddress: jest.fn().mockResolvedValue("0x123...abc"),
};
describe("TokenRegistrySetup", () => {
  const mockProcessTokenRegistry = jest.fn();
  const mockResetTokenRegistry = jest.fn();
  const mockProviderContext = {
    providerType: SIGNER_TYPE.METAMASK,
    upgradeToMetaMaskSigner: jest.fn(),
    upgradeToMagicSigner: jest.fn(),
    changeNetwork: jest.fn(),
    reloadNetwork: jest.fn(),
    supportedChainInfoObjects: [],
    currentChainId: ChainId.Sepolia,
    provider: {} as any,
    providerOrSigner: mockProviderOrSigner as any,
    account: "0x123...abc",
    networkChangeLoading: false,
    setNetworkChangeLoading: jest.fn(),
    disconnectWallet: jest.fn(),
  };
  const getMockCreatorContext: any = (overrides?: Partial<typeof getMockCreatorContext.tokenRegistry>) => ({
    tokenRegistry: {
      type: DocumentSetupType.TOKEN_REGISTRY,
      state: undefined,
      stateMessage: "Checking smart contract address...",
      displayRedeployTokenRegistry: false,
      address: undefined,
      ...overrides, // allow custom overrides
    },
    processTokenRegistry: mockProcessTokenRegistry,
    resetTokenRegistry: mockResetTokenRegistry,
    processDid: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
    resetDid: function (): void {
      throw new Error("Function not implemented.");
    },
  });

  beforeEach(() => {
    mockUseProviderContext.mockReturnValue(mockProviderContext);

    mockUseCreatorContext.mockReturnValue(getMockCreatorContext());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component with initial loading state", () => {
    render(<TokenRegistrySetup />);

    expect(screen.getByText("Smart contract address for Token Registry.")).toBeInTheDocument();
    expect(screen.getByText("Checking smart contract address...")).toBeInTheDocument();
    expect(screen.queryByText("Redeploy")).not.toBeInTheDocument();
  });

  it("should call processTokenRegistry on mount when state is undefined", async () => {
    render(<TokenRegistrySetup />);

    await waitFor(() => {
      expect(mockProcessTokenRegistry).toHaveBeenCalledWith(
        mockProviderOrSigner,
        ChainId.Sepolia,
        SIGNER_TYPE.METAMASK
      );
    });
  });

  it("should not call processTokenRegistry on mount when state is defined", () => {
    mockUseCreatorContext.mockReturnValue(
      getMockCreatorContext({
        state: CreatorItemState.SUCCESS,
        stateMessage: "Address found: 0x123...abc",
        address: "0x123...abc",
      })
    );

    render(<TokenRegistrySetup />);
    expect(mockProcessTokenRegistry).not.toHaveBeenCalled();
  });

  it("should call resetTokenRegistry on unmount", () => {
    const { unmount } = render(<TokenRegistrySetup />);
    unmount();
    expect(mockResetTokenRegistry).toHaveBeenCalled();
  });

  it("should show success state with contract address and explorer link", async () => {
    const mockAddress = "0x123456789abcdef123456789abcdef123456789";
    mockUseCreatorContext.mockReturnValue(
      getMockCreatorContext({
        state: CreatorItemState.SUCCESS,
        stateMessage: (
          <div>
            Address found:
            <a href={`https://sepolia.etherscan.io/address/${mockAddress}`}>
              {mockAddress}
              <span>ExternalLink</span>
            </a>
          </div>
        ),
        address: mockAddress,
      })
    );

    render(<TokenRegistrySetup />);

    expect(screen.getByText("Address found:")).toBeInTheDocument();
    expect(screen.getByText(mockAddress)).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: new RegExp(mockAddress, "i"),
    });
    expect(link).toHaveAttribute("href", `https://sepolia.etherscan.io/address/${mockAddress}`);
  });

  it("should show error state with redeploy button", () => {
    mockUseCreatorContext.mockReturnValue(
      getMockCreatorContext({
        state: CreatorItemState.ERROR,
        stateMessage: "Error generating record",
        displayRedeployTokenRegistry: true,
      })
    );

    render(<TokenRegistrySetup />);

    expect(screen.getByText("Error generating record")).toBeInTheDocument();
    expect(screen.getByText("Redeploy")).toBeInTheDocument();
  });

  it("should call processTokenRegistry when redeploy button is clicked", async () => {
    mockUseCreatorContext.mockReturnValue(
      getMockCreatorContext({
        state: CreatorItemState.ERROR,
        stateMessage: "Error generating record",
        displayRedeployTokenRegistry: true,
      })
    );

    render(<TokenRegistrySetup />);

    const redeployButton = screen.getByText("Redeploy");
    fireEvent.click(redeployButton);

    await waitFor(() => {
      expect(mockProcessTokenRegistry).toHaveBeenCalledWith(
        mockProviderOrSigner,
        ChainId.Sepolia,
        SIGNER_TYPE.METAMASK
      );
    });
  });

  it("should show insufficient funds error with learn more link", () => {
    mockUseCreatorContext.mockReturnValue(
      getMockCreatorContext({
        state: CreatorItemState.ERROR,
        stateMessage: (
          <div>
            Insufficient funds
            <a href="https://metamask.io/en-GB/news/how-to-buy-crypto">
              Learn how to top-up cryptocurrency
              <span>ExternalLink</span>
            </a>
          </div>
        ),
        displayRedeployTokenRegistry: true,
      })
    );

    render(<TokenRegistrySetup />);

    expect(screen.getByText("Insufficient funds")).toBeInTheDocument();
    const link = screen.getByText("Learn how to top-up cryptocurrency");
    expect(link).toHaveAttribute("href", "https://metamask.io/en-GB/news/how-to-buy-crypto");
  });

  it("should render learn more link with correct attributes", () => {
    render(<TokenRegistrySetup />);

    const learnMoreLink = screen.getByText("Learn More");
    expect(learnMoreLink).toHaveAttribute(
      "href",
      "https://docs.tradetrust.io/docs/introduction/key-components-of-tradetrust/w3c-vc/identify-the-issuer/issuer-method-did-web"
    );
    expect(learnMoreLink).toHaveAttribute("target", "_blank");
    expect(learnMoreLink).toHaveAttribute("rel", "noreferrer");
  });
});
