import React from "react";
import css from "./TitleView.module.scss";
import { AddressInfo } from "../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";

interface BeneficiaryProps {
  beneficiaryAddress: string;
}

export const Beneficiary = ({ beneficiaryAddress }: BeneficiaryProps) => {
  const beneficiaryAddressHref = makeEtherscanAddressURL(beneficiaryAddress);

  return (
    <div className={css["title-view"]}>
      <AddressInfo title="Beneficiary" name="Bank of China">
        <ExternalLink name={beneficiaryAddress} href={beneficiaryAddressHref} />
      </AddressInfo>
    </div>
  );
};
