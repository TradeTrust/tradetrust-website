import React from "react";
import { useSelector } from "react-redux";
import { Holder } from "../TitleView/Holder";
import { Beneficiary } from "../TitleView/Beneficiary";
import { BLinfo } from "../TitleView/BLinfo";

export const TitleTransferPanelContent = () => {
  const { holderAddress, beneficiaryAddress } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress
  }));

  return (
    <>
      <div className="row">
        {(holderAddress || beneficiaryAddress) && (
          <div className="col-12 col-lg">
            <Beneficiary beneficiaryAddress={beneficiaryAddress} />
            <Holder holderAddress={holderAddress} />
          </div>
        )}
        <div className="col-12 col-lg">
          <BLinfo />
        </div>
      </div>
    </>
  );
};
