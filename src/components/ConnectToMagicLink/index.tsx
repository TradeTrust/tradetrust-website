import { IconWarning } from "@tradetrust-tt/tradetrust-ui-components";
import React from "react";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import Connected from "../ConnectToBlockchain/Connected";
import { Button } from "../Button";
import NetworkSectionModel from "../NetworkSection/NetworkSectionModel";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { showDocumentTransferMessage } from "../UI/Overlay/OverlayContent";

interface ConnectToMagicLinkProps {
  className?: string;
  showOnNewConnectWarningMessage?: boolean;
  nextStep: React.ReactNode;
}

const ConnectToMagicLink: React.FC<ConnectToMagicLinkProps> = ({
  className,
  showOnNewConnectWarningMessage = false,
  nextStep,
}) => {
  const { upgradeToMagicSigner, providerType, account, disconnectWallet } = useProviderContext();
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

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const handleContinue = () => {
    showOverlay(<NetworkSectionModel collapsible={false} nextStep={nextStep} />);
  };

  return (
    <div>
      {providerType === SIGNER_TYPE.MAGIC && account ? (
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Connected imgSrc="/static/images/magic_link.svg" />
          </div>
          <div className="flex flex-col xs:flex-row gap-2">
            <Button className="h-12 flex-1" onClick={handleDisconnect}>
              Disconnect
            </Button>
            <Button className="h-12 flex-1 bg-cerulean-500 text-white hover:bg-cerulean-800" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <>
          <button
            className={`flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${className}`}
            onClick={handleConnectWallet}
          >
            <img
              src="/static/images/magic_link.svg"
              alt="MagicLink"
              className="w-6 h-6 mr-2 filter brightness-0 invert"
            />
            <span>Continue with MagicLink</span>
          </button>
          {showOnNewConnectWarningMessage &&
            account &&
            providerType !== SIGNER_TYPE.MAGIC &&
            providerType !== SIGNER_TYPE.NONE && (
              <div className="flex items-center gap-2 border rounded-lg px-4 py-3 bg-lemon-100 mt-4">
                <IconWarning className="h-5 w-5" />
                <p className="text-sm text-gray-500">You’ll be logged out of Metamask if you login with MagicLink</p>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default ConnectToMagicLink;
