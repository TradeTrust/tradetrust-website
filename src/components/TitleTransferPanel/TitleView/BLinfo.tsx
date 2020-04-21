import React from "react";
import { useSelector } from "react-redux";
import { AddressInfo } from "../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL, makeEtherscanTokenURL, getAssetInfo } from "../../../utils";

export const BLinfo = () => {
  const { document } = useSelector((state: any) => ({
    document: state.certificate.raw,
  }));
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  const tokenRegistryHref = makeEtherscanAddressURL(registryAddress);
  const tokenHistoryHref = makeEtherscanTokenURL({ registryAddress, tokenId });

  return (
    <div className="py-3">
      <AddressInfo title="BL information">
        <>
          <ExternalLink name="View BL Registry" href={tokenRegistryHref} />
          <br />
          <ExternalLink name="View Endorsement Chain" href={tokenHistoryHref} />
        </>
      </AddressInfo>
    </div>
  );
};
