import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../components/Layout/Page";
import ConnectToBlockchainModel from "../components/ConnectToBlockchain";
import { OverlayDemo } from "../components/UI/Overlay/Overlay.mock";
import { SIGNER_TYPE, useProviderContext } from "../common/contexts/provider";
import ConnectToMetamask from "../components/ConnectToMetamask";
import ConnectToMagicLink from "../components/ConnectToMagicLink";

export const WalletPage = (): React.ReactElement => {
  const { providerType } = useProviderContext();
  return (
    <>
      <Helmet>
        <title>TradeTrust - Wallet</title>
      </Helmet>

      <Page title="Wallet">
        <OverlayDemo
          buttonText="Connect to Blockchain Wallet"
          defaultOpen={providerType === SIGNER_TYPE.NONE || providerType === SIGNER_TYPE.IDENTITY}
        >
          <ConnectToBlockchainModel />
        </OverlayDemo>
        {providerType === SIGNER_TYPE.METAMASK && <ConnectToMetamask />}
        {providerType === SIGNER_TYPE.MAGIC && <ConnectToMagicLink />}
      </Page>
    </>
  );
};

export default WalletPage;
