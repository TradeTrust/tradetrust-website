import { IconWarning } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useContext } from "react";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import Connected from "../ConnectToBlockchain/Connected";
import { showDocumentTransferMessage } from "../UI/Overlay/OverlayContent";
import { Button } from "../Button";
import { useLocation } from "react-router-dom";
import { NetworkContent } from "../NetworkSection/NetworkContent";

export interface ConnectToMetamaskModelProps {
  showOnNewConnectWarningMessage: boolean;
  nextStep?: React.ReactNode;
  path?: string[];
}

export const ConnectToMetamaskModelComponent = ({
  showOnNewConnectWarningMessage = false,
  path,
}: ConnectToMetamaskModelProps) => {
  const { providerType, account, disconnectWallet } = useProviderContext();
  const { pathname } = useLocation();

  const handleDisconnect = () => {
    disconnectWallet();
  };

  return (
    <div className="flex flex-col gap-4">
      {providerType === SIGNER_TYPE.METAMASK && account && <span>Connected as: </span>}
      <ConnectToMetamask className="w-full" />
      {showOnNewConnectWarningMessage &&
        providerType !== SIGNER_TYPE.METAMASK &&
        providerType !== SIGNER_TYPE.NONE &&
        account && (
          <div className="flex items-center gap-2 border rounded-lg px-4 py-3 bg-lemon-100">
            <IconWarning className="h-5 w-5" />
            <p className="text-sm text-gray-500">You’ll be logged out of MagicLink if you login with Metamask</p>
          </div>
        )}
      {path?.includes(pathname) && providerType === SIGNER_TYPE.METAMASK && account && (
        <NetworkContent disabled={false} />
      )}
      {providerType === SIGNER_TYPE.METAMASK && account && (
        <div className="flex flex-col xs:flex-row gap-2">
          <Button className="flex-1 text-cerulean-500" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};

interface ConnectToMetamaskProps {
  className?: string;
  openConnectToBlockchainModel?: boolean;
}

const ConnectToMetamask: React.FC<ConnectToMetamaskProps> = ({ className, openConnectToBlockchainModel = false }) => {
  const { showOverlay } = useContext(OverlayContext);
  const { upgradeToMetaMaskSigner, account, providerType } = useProviderContext();

  const handleConnectWallet = async () => {
    try {
      await upgradeToMetaMaskSigner();
    } catch (error: any) {
      console.error(error);
      handleMetamaskError(error.message, error.code);
    }
  };
  const handleMetamaskError = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;
    showOverlay(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
        isButtonMetamaskInstall: !isUserDeniedAccountAuthorization,
      })
    ); // there is 2 type of errors that will be handled here, 1st = NO_METAMASK (error thrown from provider.tsx), 2nd = NO_USER_AUTHORIZATION (error from metamask extension itself).
  };

  return (
    <div className={`self-start md:self-center w-[18.25rem] ${className}`}>
      {providerType === SIGNER_TYPE.METAMASK && account ? (
        <Connected imgSrc="/static/images/wallet.png" openConnectToBlockchainModel={openConnectToBlockchainModel} />
      ) : (
        <>
          <Button
            className="w-full bg-white hover:bg-cloud-100 rounded-xl text-lg py-2 px-3 flex items-center gap-2 text-[16px] font-bold justify-center"
            data-testid={"connectToMetamask"}
            onClick={handleConnectWallet}
          >
            {" "}
            <img src="/static/images/wallet.png" alt="MetaMask" className="w-6 h-6" />
            <div className="text-center">Connect to Metamask</div>
          </Button>
        </>
      )}
    </div>
  );
};

export default ConnectToMetamask;
