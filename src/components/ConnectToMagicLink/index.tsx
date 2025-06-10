import { IconWarning } from "@tradetrust-tt/tradetrust-ui-components";
import React from "react";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import { Button } from "../Button";
import Connected from "../ConnectToBlockchain/Connected";
import NetworkSectionModel from "../NetworkSection/NetworkSectionModel";
import { showDocumentTransferMessage } from "../UI/Overlay/OverlayContent";

interface ConnectToMagicLinkProps {
  className?: string;
  openConnectToBlockchainModel?: boolean;
}

interface ConnectToMagicLinkModelProps {
  showOnNewConnectWarningMessage?: boolean;
  nextStep?: React.ReactNode;
}

export const ConnectToMagicLinkModelComponent = ({
  showOnNewConnectWarningMessage = false,
  nextStep,
}: ConnectToMagicLinkModelProps) => {
  const { providerType, account, disconnectWallet } = useProviderContext();
  const { showOverlay, closeOverlay } = useOverlayContext();

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const handleContinue = () => {
    if (!nextStep) {
      closeOverlay();
      return;
    }
    showOverlay(<NetworkSectionModel collapsible={false} nextStep={nextStep} />);
  };

  return (
    <div className="flex flex-col gap-4">
      {providerType === SIGNER_TYPE.MAGIC && account && <span>Connected as: </span>}
      <ConnectToMagicLink className="w-full" />
      {showOnNewConnectWarningMessage &&
        providerType !== SIGNER_TYPE.MAGIC &&
        providerType !== SIGNER_TYPE.NONE &&
        account && (
          <div className="flex items-center gap-2 border rounded-lg px-4 py-3 bg-lemon-100">
            <IconWarning className="h-5 w-5" />
            <p className="text-sm text-gray-500">You’ll be logged out of Metamask if you login with MagicLink</p>
          </div>
        )}
      {providerType === SIGNER_TYPE.MAGIC && account && (
        <div className="flex flex-col xs:flex-row gap-2">
          <Button data-testid="disconnect-magic" className="flex-1" onClick={handleDisconnect}>
            Disconnect
          </Button>
          <Button
            data-testid="continue-magic"
            className="flex-1 bg-cerulean-500 text-white hover:bg-cerulean-800"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export const ConnectToMagicLink: React.FC<ConnectToMagicLinkProps> = ({
  className,
  openConnectToBlockchainModel = false,
}) => {
  const { upgradeToMagicSigner, providerType, account } = useProviderContext();
  const { showOverlay } = useOverlayContext();

  const handleConnectWallet = async () => {
    try {
      await upgradeToMagicSigner();
    } catch (error: any) {
      console.error(error);
      handleMagicError(error.message);
    }
  };

  const handleMagicError = (errorMesssage: string) => {
    showOverlay(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
      })
    );
  };

  return (
    <div className={`self-start md:self-center w-[18.25rem] ${className}`}>
      {providerType === SIGNER_TYPE.MAGIC && account ? (
        <Connected imgSrc="/static/images/magic_link.svg" openConnectToBlockchainModel={openConnectToBlockchainModel} />
      ) : (
        <>
          <Button
            className="w-full bg-white hover:bg-cloud-100 rounded-xl text-lg py-2 px-3 flex items-center gap-2 text-[16px] font-bold justify-center"
            data-testid="connectToMagicLink"
            onClick={handleConnectWallet}
          >
            <img src="/static/images/magic_link.svg" alt="MagicLink" className="w-6 h-6" />
            <div className="text-center">Connect to MagicLink</div>
          </Button>
        </>
      )}
    </div>
  );
};

export default ConnectToMagicLink;
