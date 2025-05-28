import React, { FunctionComponent } from "react";
import { Card } from "../../UI/Card";
import ConnectToMetamask from "../../ConnectToMetamask";
import ConnectToMagicLink from "../../ConnectToMagicLink";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";

interface NetworkPanelProps {
  isTransferableRecord?: boolean;
}

export const NetworkPanel: FunctionComponent<NetworkPanelProps> = ({ isTransferableRecord = false }) => {
  const { currentChainId, providerType } = useProviderContext();

  // Get network name from chain ID
  const networkName = currentChainId ? getChainInfo(currentChainId).networkLabel : "Unknown";

  // Only show for transferable records
  if (!isTransferableRecord) {
    return null;
  }

  const ConnectToProvider = providerType === SIGNER_TYPE.MAGIC ? ConnectToMagicLink : ConnectToMetamask;

  return (
    <Card>
      <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-1 flex flex-wrap flex-row md:flex-col gap-2 md:gap-0 items-center md:items-start justify-start">
          <h6>Selected Network:</h6>
          <p data-testid="selected-network">{networkName} Network</p>
        </div>
        <div>
          <ConnectToProvider className="w-full xs:w-72" />
        </div>
      </div>
    </Card>
  );
};
