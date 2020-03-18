import React from "react";
import { useSelector } from "react-redux";
import css from "./TitleEscrow.module.scss";
import { Holder } from "../TitleView/Holder";
import { Beneficiary } from "../TitleView/Beneficiary";
import { BLinfo } from "../TitleView/BLinfo";
import { SurrenderDocument } from "../Actions/SurrenderDocument";
import {
  // holderAddress,
  // beneficiaryAddress,
  userWalletAddress,
  finaliseEndorsementHolderAddress,
  finaliseEndorsementBeneficiaryAddress
} from "./../../../test/fixture/sample-addresses";
import { FeatureFlag } from "../../FeatureFlag";

export const TitleEscrow = () => {
  const { holderAddress, beneficiaryAddress } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress
  }));

  return (
    <div className={css.TitleEscrow}>
      <div className="row">
        {(holderAddress || beneficiaryAddress) && (
          <div className="col-12 col-lg">
            <Beneficiary
              userWalletAddress={userWalletAddress}
              beneficiaryAddress={beneficiaryAddress}
              finaliseEndorsementHolderAddress={finaliseEndorsementHolderAddress}
              finaliseEndorsementBeneficiaryAddress={finaliseEndorsementBeneficiaryAddress}
            />
            <Holder userWalletAddress={userWalletAddress} holderAddress={holderAddress} />
          </div>
        )}
        <div className="col-12 col-lg">
          <BLinfo />
        </div>
      </div>
      <FeatureFlag
        name="MANAGE_ASSET_REDESIGN"
        render={() => (
          <>
            {userWalletAddress === holderAddress && userWalletAddress === beneficiaryAddress && (
              <div className="row my-4">
                <div className="col-12">
                  <SurrenderDocument />
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
