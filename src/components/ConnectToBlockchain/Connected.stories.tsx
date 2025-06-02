import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { StoryContext } from "@storybook/types"; // Or from '@storybook/react' if re-exported
import { Connected } from "./Connected";
import { ProviderContext, SIGNER_TYPE, ProviderContextProps } from "../../common/contexts/provider";
import { ChainId } from "../../constants/chain-info";
import { ChainInfoObject } from "../../constants/chain-info"; // Added for supportedChainInfoObjects type

const mockProviderContextValue: ProviderContextProps = {
  providerType: SIGNER_TYPE.METAMASK,
  upgradeToMetaMaskSigner: async () => {
    console.log("mock upgradeToMetaMaskSigner called");
  },
  upgradeToMagicSigner: async () => {
    console.log("mock upgradeToMagicSigner called");
  },
  changeNetwork: (chainId: ChainId) => {
    console.log("mock changeNetwork called with", chainId);
  },
  reloadNetwork: async () => {
    console.log("mock reloadNetwork called");
  },
  supportedChainInfoObjects: [] as ChainInfoObject[],
  currentChainId: ChainId.Sepolia,
  provider: undefined,
  providerOrSigner: undefined,
  account: "0x1234567890abcdef1234567890abcdef12345678", // Sample account
  networkChangeLoading: false,
  setNetworkChangeLoading: (loading: boolean) => {
    console.log("mock setNetworkChangeLoading called with", loading);
  },
  disconnectWallet: async (disconnectOnly?: boolean) => {
    console.log("mock disconnectWallet called with", disconnectOnly);
  },
};

export default {
  title: "Components/ConnectToBlockchain/Connected",
  component: Connected,
  decorators: [
    (
      StoryComponent: StoryFn<React.ComponentProps<typeof Connected>>,
      context: StoryContext<any, React.ComponentProps<typeof Connected>>
    ) => (
      <ProviderContext.Provider value={mockProviderContextValue}>
        <StoryComponent {...context.args} />
      </ProviderContext.Provider>
    ),
  ],
  argTypes: {
    imgSrc: { control: "text" },
  },
} as Meta<React.ComponentProps<typeof Connected>>;

const Template: StoryFn<React.ComponentProps<typeof Connected>> = (args) => <Connected {...args} />;

export const Default: StoryFn<React.ComponentProps<typeof Connected>> = Template.bind({});
Default.args = {
  imgSrc: "",
};

export const WithDifferentIcon: StoryFn<React.ComponentProps<typeof Connected>> = Template.bind({});
WithDifferentIcon.args = {
  imgSrc: "/static/images/magic_link.svg",
};

export const CopyAddress: StoryFn<React.ComponentProps<typeof Connected>> = Template.bind({});
CopyAddress.args = {
  imgSrc: "/static/images/wallet.png",
};

export const OpenConnectToBlockchainModel: StoryFn<React.ComponentProps<typeof Connected>> = Template.bind({});
OpenConnectToBlockchainModel.args = {
  imgSrc: "/static/images/wallet.png",
  openConnectToBlockchainModel: true,
};
