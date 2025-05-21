import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { OverlayContextProvider } from "../../common/contexts/OverlayContext";
import { ProviderContext, ProviderContextProps, SIGNER_TYPE } from "../../common/contexts/provider";
import { ChainId, ChainInfo } from "../../constants/chain-info";
import { Overlay } from "../UI/Overlay";
import { NetworkSection } from "./NetworkSection";

// Mock Provider Context values
const mockProviderContextValue: ProviderContextProps = {
  providerType: SIGNER_TYPE.METAMASK,
  upgradeToMetaMaskSigner: async () => action("upgradeToMetaMaskSigner")(),
  upgradeToMagicSigner: async () => action("upgradeToMagicSigner")(),
  changeNetwork: action("changeNetwork"),
  reloadNetwork: async () => action("reloadNetwork")(),
  supportedChainInfoObjects: [ChainInfo[ChainId.Ethereum], ChainInfo[ChainId.Polygon]], // Provide mock data if needed
  currentChainId: undefined, // Or another default/mock chain ID
  provider: undefined, // Or a mock provider
  providerOrSigner: undefined, // Or a mock provider/signer
  account: undefined,
  networkChangeLoading: false,
  setNetworkChangeLoading: action("setNetworkChangeLoading"),
  disconnectWallet: async () => action("disconnectWallet")(),
};

// Mock Provider component for Storybook
const MockProvider: React.FC<{ value: ProviderContextProps; children: React.ReactNode }> = ({ value, children }) => (
  <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>
);

const meta: Meta<typeof NetworkSection> = {
  title: "Components/NetworkSection/NetworkSection",
  component: NetworkSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NetworkSection>;

const Template: StoryFn<typeof NetworkSection> = (args) => {
  return (
    <OverlayContextProvider>
      <Overlay />
      <NetworkSection {...args} />
    </OverlayContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.decorators = [
  (Child: React.FC) => (
    <MockProvider value={{ ...mockProviderContextValue, currentChainId: ChainId.Polygon }}>
      <Child />
    </MockProvider>
  ),
];

export const WithCustomOverlayMargin: Story = {
  args: {
    overlayMargin: "ml-4",
  },
};

export const WithInPlaceLoading: Story = {
  args: {
    inPlaceLoading: true,
  },
};

export const WithDocument: Story = {
  args: {
    document: {
      // Add mock document data here if needed
      id: "doc-1",
      network: "ethereum",
    },
  },
};
