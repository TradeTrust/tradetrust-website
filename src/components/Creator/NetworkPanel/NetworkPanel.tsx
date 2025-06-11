import React, { FunctionComponent } from "react";
import { Card } from "../../UI/Card";
import ConnectToMetamask from "../../ConnectToMetamask";
import ConnectToMagicLink from "../../ConnectToMagicLink";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";
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
  );

  return withCardLayout ? <Card>{content}</Card> : content;
};
