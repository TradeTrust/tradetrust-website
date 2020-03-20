import React from "react";
import { get } from "lodash";
import css from "./TitleView.module.scss";
import { AddressInfo } from "../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";
import registry from "../../../../static/registry.json";

interface TitleViewProps {
  role: string;
  address: string;
}

export const TitleView = ({ role, address }: TitleViewProps) => {
  const addressHref = makeEtherscanAddressURL(address);
  const issuerName = get(registry.issuers, `${address}`) ? get(registry.issuers, `${address}`).name : null;

  return (
    <div className={css["title-view"]}>
      <AddressInfo title={role} name={issuerName}>
        <ExternalLink name={address} href={addressHref} />
      </AddressInfo>
    </div>
  );
};
