import React, { FunctionComponent } from "react";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";
import ConnectToMagicLink from "../../ConnectToMagicLink";
import ConnectToMetamask from "../../ConnectToMetamask";
import { Card } from "../../UI/Card";
import { NetworkLabel } from "./NetworkLabel";

interface NetworkPanelProps {
  isTransferableRecord?: boolean;
  withCardLayout?: boolean;
}

export const NetworkPanel: FunctionComponent<NetworkPanelProps> = ({
  isTransferableRecord = false,
  withCardLayout = true,
}) => {
  const { currentChainId, providerType } = useProviderContext();

  // Get network name from chain ID
  const networkName = currentChainId ? getChainInfo(currentChainId).networkLabel : "Unknown";

  // Only show for transferable records
  if (!isTransferableRecord) {
    return null;
  }

  const ConnectToProvider = providerType === SIGNER_TYPE.MAGIC ? ConnectToMagicLink : ConnectToMetamask;

  const content = (
    <>
      <div
        className={`flex flex-col flex-start md:flex-row md:justify-between md:items-center gap-4 ${
          !withCardLayout && "bg-gray-100 rounded-lg border border-gray-200 px-4 py-4"
        }`}
      >
        <NetworkLabel networkName={networkName} />
        <div>
          <ConnectToProvider className="w-full xs:w-72" withCardLayout={withCardLayout} />
        </div>
      </div>
      {withCardLayout && providerType === SIGNER_TYPE.METAMASK && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-2">
          <div
            className="flex items-start gap-2 text-red-600 font-medium text-sm md:ml-auto md:mt-0"
            style={{ maxWidth: "18rem" }}
          >
            <img className="h-4 w-4 mt-0.5" src="/static/images/alert/warning.png" alt="Warning" />
            <span>Do not make any changes to MetaMask during issuance, or the process may fail.</span>
          </div>
        </div>
      )}
    </>
  );

  return withCardLayout ? <Card>{content}</Card> : content;
};
