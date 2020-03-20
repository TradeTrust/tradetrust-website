import React from "react";
import css from "./TitleView.module.scss";
import { Address } from "../Address";
import { ExternalLink } from "../../Helpers/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";

interface BeneficiaryProps {
  beneficiaryAddress: string;
}

export const Beneficiary = ({ beneficiaryAddress }: BeneficiaryProps) => {
  const beneficiaryAddressHref = makeEtherscanAddressURL(beneficiaryAddress);

  return (
    <div className={css["title-view"]}>
      <Address title="Beneficiary" name="Bank of China">
        <ExternalLink name={beneficiaryAddress} href={beneficiaryAddressHref} />
      </Address>
    </div>
  );
};
