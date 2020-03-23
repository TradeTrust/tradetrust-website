import React from "react";
import css from "./TitleView.module.scss";
import { AddressInfo } from "../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";
import { useAddressBook } from "../../../common/hooks/useAddressBook";

interface TitleViewProps {
  role: string;
  address: string;
}

export const TitleView = ({ role, address }: TitleViewProps) => {
  const addressHref = makeEtherscanAddressURL(address);
  const { getIdentifier } = useAddressBook();
  const name = getIdentifier(address);

  return (
    <div className={css["title-view"]}>
      <AddressInfo title={role} name={name}>
        <ExternalLink name={address} href={addressHref} />
      </AddressInfo>
    </div>
  );
};
