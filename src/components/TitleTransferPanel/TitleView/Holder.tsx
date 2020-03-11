import React from "react";
import css from "./TitleView.module.scss";
import { Address } from "../Address";
import { AddressLink } from "./../AddressLink";
import { ChangeHolder } from "../Actions/ChangeHolder";
import { makeEtherscanAddressURL } from "../../../utils";
import { FeatureFlag } from "../../FeatureFlag";

interface HolderProps {
  userWalletAddress: string;
  holderAddress: string;
}

export const Holder = ({ userWalletAddress, holderAddress }: HolderProps) => {
  const isUserWalletAddressMatched = userWalletAddress === holderAddress;
  const holderAddressHref = makeEtherscanAddressURL(holderAddress);

  return (
    <div className={css["title-view"]}>
      <Address title="Holder" name="Bank of China">
        <AddressLink name={holderAddress} href={holderAddressHref} />
      </Address>
      <FeatureFlag name="MANAGE_ASSET_REDESIGN" render={() => <>{isUserWalletAddressMatched && <ChangeHolder />}</>} />
    </div>
  );
};
