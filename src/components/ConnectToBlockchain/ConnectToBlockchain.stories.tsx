import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import { OverlayContextProvider } from "../../common/contexts/OverlayContext";
import { ProviderContext, ProviderContextProps, SIGNER_TYPE } from "../../common/contexts/provider";
import { OverlayDemo } from "../UI/Overlay/Overlay.mock";
import ConnectToBlockchainModel from "./index";

// Mock Provider Context values
const mockProviderContextValue: ProviderContextProps = {
  providerType: SIGNER_TYPE.IDENTITY,
  upgradeToMetaMaskSigner: async () => action("upgradeToMetaMaskSigner")(),
  upgradeToMagicSigner: async () => action("upgradeToMagicSigner")(),
  changeNetwork: action("changeNetwork"),
  reloadNetwork: async () => action("reloadNetwork")(),
  supportedChainInfoObjects: [], // Provide mock data if needed
  currentChainId: undefined,
  provider: undefined,
  providerOrSigner: undefined,
  account: undefined,
  networkChangeLoading: false,
  setNetworkChangeLoading: action("setNetworkChangeLoading"),
  disconnectWallet: async () => action("disconnectWallet")(),
};

const connectedContextValue: ProviderContextProps = {
  ...mockProviderContextValue,
  account: "0x1234567890abcdef1234567890abcdef12345678",
  providerType: SIGNER_TYPE.METAMASK,
};

// Mock Provider component for Storybook
const MockProvider: React.FC<{ value: ProviderContextProps; children: React.ReactNode }> = ({ value, children }) => (
  <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>
);

export default {
  title: "Components/ConnectToBlockchain",
  component: ConnectToBlockchainModel,
  argTypes: {
    collapsible: { control: "boolean" },
  },
  // Always render the modal as open in stories for visibility
  args: {
    collapsible: false,
  },
} as Meta<typeof ConnectToBlockchainModel>;

const Template: StoryFn<typeof ConnectToBlockchainModel> = (args: any) => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Open Connect To Blockchain Modal" defaultOpen>
        <ConnectToBlockchainModel collapsible={args.collapsible} />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const Disconnected = Template.bind({});
Disconnected.decorators = [
  (Child: React.FC) => (
    <MockProvider value={mockProviderContextValue}>
      <Child />
    </MockProvider>
  ),
];
Disconnected.args = {};

export const ConnectedWithMetamask = Template.bind({});
ConnectedWithMetamask.decorators = [
  (Child: React.FC) => (
    <MockProvider value={connectedContextValue}>
      <Child />
    </MockProvider>
  ),
];
ConnectedWithMetamask.args = {};

export const ConnectedWithMagic = Template.bind({});
ConnectedWithMagic.decorators = [
  (Child: React.FC) => (
    <MockProvider value={{ ...connectedContextValue, providerType: SIGNER_TYPE.MAGIC }}>
      <Child />
    </MockProvider>
  ),
];
