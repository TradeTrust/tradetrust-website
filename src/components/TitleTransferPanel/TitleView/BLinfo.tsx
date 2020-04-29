import React from "react";
import { useSelector } from "react-redux";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress, ExternalLinkEtherscanToken } from "../../UI/ExternalLink";
import { getAssetInfo } from "../../../utils";

export const BLinfo = () => {
  const { document } = useSelector((state: any) => ({
    document: state.certificate.raw,
  }));
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  return (
    <div className="py-3">
      <AddressInfo title="BL information">
        <>
          <ExternalLinkEtherscanAddress name="View BL Registry" address={registryAddress} />
          <br />
          <ExternalLinkEtherscanToken
            name="View Endorsement Chain"
            tokenId={tokenId}
            tokenRegistryAddress={registryAddress}
            data-testid="token-address"
          />
        </>
      </AddressInfo>
    </div>
  );
};
