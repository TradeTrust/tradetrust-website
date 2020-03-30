import React, { useEffect } from "react";
import css from "./TitleTransferPanelContent.module.scss";
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

  const SkeletonPlaceholder = () => {
    return (
      <div className="mt-3 mb-4">
        <div className={`mb-2 ${css["skeleton-title"]}`} />
        <div className={css["skeleton-address"]} />
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-12 col-lg">
        {beneficiary ? <TitleView role="Beneficiary" address={beneficiary} /> : <SkeletonPlaceholder />}
        {holder ? <TitleView role="Holder" address={holder} /> : <SkeletonPlaceholder />}
      </div>
      <div className="col-12 col-lg">
        <BLinfo />
      </div>
    </div>
  );
};
