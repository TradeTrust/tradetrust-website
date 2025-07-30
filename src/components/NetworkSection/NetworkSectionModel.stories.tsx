import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { OverlayContextProvider } from "../../common/contexts/OverlayContext";
import { ProviderContext, ProviderContextProps, SIGNER_TYPE } from "../../common/contexts/provider";
import { ChainId, ChainInfo } from "../../constants/chain-info";
import { OverlayDemo } from "../UI/Overlay/Overlay.mock";
import NetworkSectionModel from "./NetworkSectionModel";

// Mock Provider Context values
const disconnectedContextValue: ProviderContextProps = {
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

export default {
  title: "Components/NetworkSection/NetworkSectionModel",
  component: NetworkSectionModel,
  parameters: {
    docs: {
      description: {
        component: "Network section model component with network selector.",
      },
    },
  },
} as Meta<typeof NetworkSectionModel>;

const Template: StoryFn<typeof NetworkSectionModel> = (args) => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Open Network Section Modal" defaultOpen>
        <NetworkSectionModel {...args} />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  collapsible: false,
  postContent: <></>,
};
Default.decorators = [
  (Child: React.FC) => (
    <MockProvider value={disconnectedContextValue}>
      <Child />
    </MockProvider>
  ),
];

export const ConnectedToPolygon = Template.bind({});
ConnectedToPolygon.args = {
  collapsible: false,
  postContent: <></>,
};
ConnectedToPolygon.decorators = [
  (Child: React.FC) => (
    <MockProvider value={{ ...disconnectedContextValue, currentChainId: ChainId.Polygon }}>
      <Child />
    </MockProvider>
  ),
];

export const ConnectingToNetwork = Template.bind({});
ConnectingToNetwork.args = {
  collapsible: false,
  postContent: <></>,
};
ConnectingToNetwork.decorators = [
  (Child: React.FC) => (
    <MockProvider
      value={{
        ...disconnectedContextValue,
        currentChainId: ChainId.Polygon,
        providerType: SIGNER_TYPE.METAMASK,
        networkChangeLoading: true,
      }}
    >
      <Child />
    </MockProvider>
  ),
];
