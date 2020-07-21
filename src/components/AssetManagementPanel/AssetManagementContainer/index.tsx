import React from "react";
import { AssetManagementApplication } from "./../AssetManagementApplication";

export const AssetManagementContainer = ({
  setShowEndorsementChain,
  tokenId,
  tokenRegistryAddress,
}: {
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}) => {
  return (
    <AssetManagementApplication
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      setShowEndorsementChain={setShowEndorsementChain}
    />
  );
};
