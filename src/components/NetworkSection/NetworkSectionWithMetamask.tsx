import React from "react";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import ConnectToMagicLink from "../ConnectToMagicLink";
import ConnectToMetamask from "../ConnectToMetamask";
import { NetworkSection } from "./NetworkSection";

interface NetworkSectionProps {
  subtitle: string;
  overlayMargin?: string; // e.g. "ml-2" or "ml-3"
  className?: string;
  disabled?: boolean;
  document?: any;
  showConnectToBlockchain?: boolean;
}

export const NetworkSectionWithMetamask = ({
  subtitle,
  overlayMargin = "ml-2",
  className = "",
  disabled = false,
  document,
  showConnectToBlockchain = false,
}: NetworkSectionProps): JSX.Element => {
  const { providerType, account } = useProviderContext();
  return (
    <div className={`flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-2 ${className}`}>
      <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
        <div className="w-full xs:w-auto text-gray-900 flex items-center" data-testid="page-subtitle">
          {subtitle}
        </div>
        <NetworkSection overlayMargin={overlayMargin} disabled={disabled} document={document} />
      </div>
      {showConnectToBlockchain && <></>}
      {providerType === SIGNER_TYPE.METAMASK && account && (
        <ConnectToMetamask className="w-full xs:w-72" openConnectToBlockchainModel={true} />
      )}
      {providerType === SIGNER_TYPE.MAGIC && account && (
        <ConnectToMagicLink className="w-full xs:w-72" openConnectToBlockchainModel={true} />
      )}
    </div>
  );
};
