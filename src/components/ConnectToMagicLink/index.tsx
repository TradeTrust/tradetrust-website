import { IconWarning } from "@tradetrust-tt/tradetrust-ui-components";
import React from "react";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import Connected from "../ConnectToBlockchain/Connected";

interface ConnectToMagicLinkProps {
  className?: string;
  showOnDisconnectWarningMessage?: boolean;
}

const ConnectToMagicLink: React.FC<ConnectToMagicLinkProps> = ({
  className,
  showOnDisconnectWarningMessage = false,
}) => {
  const { upgradeToMagicSigner, providerType, account } = useProviderContext();

  const handleConnectWallet = async () => {
    try {
      await upgradeToMagicSigner();
    } catch (error: any) {
      console.error(error);
      // handleMetamaskError(error.message, error.code);
    }
  };

  return (
    <div>
      {providerType === SIGNER_TYPE.MAGIC && account ? (
        <Connected imgSrc="/static/images/magic_link.svg" />
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
          {showOnDisconnectWarningMessage && account && (
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
