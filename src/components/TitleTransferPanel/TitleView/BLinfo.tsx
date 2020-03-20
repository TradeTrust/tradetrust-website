import React from "react";
import { useSelector } from "react-redux";
import css from "./TitleView.module.scss";
import { Address } from "../Address";
import { ExternalLink } from "../../Helpers/ExternalLink";
import { getAssetInfo } from "../../../utils";
import { makeEtherscanAddressURL, makeEtherscanTokenURL } from "../../../utils";

export const BLinfo = () => {
  const { document } = useSelector((state: any) => ({
    document: state.certificate.raw
  }));
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  const tokenRegistryHref = makeEtherscanAddressURL(registryAddress);
  const tokenHistoryHref = makeEtherscanTokenURL({ registryAddress, tokenId });

  return (
    <div className={css["title-view"]}>
      <Address title="BL information">
        <>
          <ExternalLink name="View BL Registry" href={tokenRegistryHref} />
          <br />
          <ExternalLink name="View Endorsement Chain" href={tokenHistoryHref} />
        </>
      </Address>
    </div>
  );
};
