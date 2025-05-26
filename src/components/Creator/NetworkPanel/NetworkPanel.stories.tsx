import React, { FunctionComponent } from "react";
import { NetworkPanel } from "./NetworkPanel";
import { ProviderContextProvider, SIGNER_TYPE } from "../../../common/contexts/provider";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

export const NetworkPanelTransferable: FunctionComponent = () => {
  return (
    <ProviderContextProvider
      networks={Object.values(ChainInfo)}
      defaultChainId={ChainId.Sepolia}
      defaultProviderType={SIGNER_TYPE.METAMASK}
    >
      <NetworkPanel isTransferableRecord={true} />
    </ProviderContextProvider>
  );
};

export const NetworkPanelNonTransferable: FunctionComponent = () => {
  return (
    <ProviderContextProvider networks={Object.values(ChainInfo)} defaultChainId={ChainId.Sepolia}>
      <NetworkPanel isTransferableRecord={false} />
    </ProviderContextProvider>
  );
};

export const NetworkPanelTransferableMagic: FunctionComponent = () => {
  return (
    <ProviderContextProvider
      networks={Object.values(ChainInfo)}
      defaultChainId={ChainId.Sepolia}
      defaultProviderType={SIGNER_TYPE.MAGIC}
    >
      <NetworkPanel isTransferableRecord={true} />
    </ProviderContextProvider>
  );
};

export default {
  title: "Creator/NetworkPanel",
  component: NetworkPanelTransferable,
  parameters: {
    componentSubtitle: "Network Panel for displaying the selected network and connection options",
  },
};
