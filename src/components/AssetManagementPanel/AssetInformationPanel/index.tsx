import React, { FunctionComponent } from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";

interface AssetInformationPanelProps {
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  className?: string;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanelProps> = ({
  tokenRegistryAddress,
  setShowEndorsementChain,
  className,
}) => {
  return (
    <div className={className}>
      <AddressInfo title="" name="" resolvedBy="" source="">
        <ExternalLinkEtherscanAddress name="View NFT Registry" address={tokenRegistryAddress} />
        <div
          onClick={() => setShowEndorsementChain(true)}
          className="cursor-pointer transition-colors duration-200 ease-out text-cerulean-300 hover:text-cerulean-500"
          id="endorsement-chain-button"
        >
          <h5 className="text-cerulean-300 hover:text-cerulean-500">View Endorsement Chain</h5>
        </div>
      </AddressInfo>
    </div>
  );
};
