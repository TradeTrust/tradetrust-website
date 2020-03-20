import React from "react";
import css from "./TitleView.module.scss";
import { AddressInfo } from "../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";

interface HolderProps {
  holderAddress: string;
}

export const Holder = ({ holderAddress }: HolderProps) => {
  const holderAddressHref = makeEtherscanAddressURL(holderAddress);

  return (
    <div className={css["title-view"]}>
      <AddressInfo title="Holder" name="Bank of China">
        <ExternalLink name={holderAddress} href={holderAddressHref} />
      </AddressInfo>
    </div>
  );
};
