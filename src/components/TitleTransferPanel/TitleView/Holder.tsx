import React from "react";
import css from "./TitleView.module.scss";
import { Address } from "../Address";
import { ExternalLink } from "../../Helpers/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";

interface HolderProps {
  holderAddress: string;
}

export const Holder = ({ holderAddress }: HolderProps) => {
  const holderAddressHref = makeEtherscanAddressURL(holderAddress);

  return (
    <div className={css["title-view"]}>
      <Address title="Holder" name="Bank of China">
        <ExternalLink name={holderAddress} href={holderAddressHref} />
      </Address>
    </div>
  );
};
