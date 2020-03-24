import React from "react";
import { useSelector } from "react-redux";
import { TitleView } from "../TitleView";
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
            <TitleView role="Beneficiary" address={beneficiaryAddress} />
            <TitleView role="Holder" address={holderAddress} />
          </div>
        )}
        <div className="col-12 col-lg">
          <BLinfo />
        </div>
      </div>
    </>
  );
};
