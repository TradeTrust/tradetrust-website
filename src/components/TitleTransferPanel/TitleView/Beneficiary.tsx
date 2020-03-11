import React from "react";
import css from "./TitleView.module.scss";
import { Address } from "../Address";
import { AddressLink } from "./../AddressLink";
import { PrepareEndorsement } from "../Actions/PrepareEndorsement";
import { FinaliseEndorsement } from "../Actions/FinaliseEndorsement";
import { makeEtherscanAddressURL } from "../../../utils";
import { FeatureFlag } from "../../FeatureFlag";

interface BeneficiaryProps {
  userWalletAddress: string;
  beneficiaryAddress: string;
  finaliseEndorsementHolderAddress: string;
  finaliseEndorsementBeneficiaryAddress: string;
}

export const Beneficiary = ({
  userWalletAddress,
  beneficiaryAddress,
  finaliseEndorsementHolderAddress,
  finaliseEndorsementBeneficiaryAddress
}: BeneficiaryProps) => {
  const isFinalisingEndorsement =
    finaliseEndorsementHolderAddress !== "" || finaliseEndorsementBeneficiaryAddress !== "";
  const isUserWalletAddressMatched = userWalletAddress === beneficiaryAddress;
  const beneficiaryAddressHref = makeEtherscanAddressURL(beneficiaryAddress);

  return (
    <div className={css["title-view"]}>
      <Address title="Beneficiary" name="Bank of China">
        <AddressLink name={beneficiaryAddress} href={beneficiaryAddressHref} />
      </Address>
      <FeatureFlag
        name="MANAGE_ASSET_REDESIGN"
        render={() => (
          <>
            {isFinalisingEndorsement ? (
              <FinaliseEndorsement
                finaliseEndorsementHolderAddress={finaliseEndorsementHolderAddress}
                finaliseEndorsementBeneficiaryAddress={finaliseEndorsementBeneficiaryAddress}
              />
            ) : (
              isUserWalletAddressMatched && <PrepareEndorsement />
            )}
          </>
        )}
      />
    </div>
  );
};
