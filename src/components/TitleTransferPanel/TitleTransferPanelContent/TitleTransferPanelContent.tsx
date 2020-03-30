import React, { useEffect } from "react";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

export const TitleTransferPanelContent = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  useEffect(() => {
    getBeneficiary();
    getHolder();
  }, [titleEscrow, getBeneficiary, getHolder]);
  return (
    <div className="row">
      <div className="col-12 col-lg">
        {beneficiary && <TitleView role="Beneficiary" address={beneficiary} />}
        {holder && <TitleView role="Holder" address={holder} />}
      </div>
      <div className="col-12 col-lg">
        <BLinfo />
      </div>
    </div>
  );
};
