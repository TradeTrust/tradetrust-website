import React, { useEffect } from "react";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { LoaderSkeleton } from "../../UI/Loader";
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
        <LoaderSkeleton className="mb-2" width="90px" />
        <LoaderSkeleton />
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-12 col-lg">
        <BLinfo />
      </div>
      <div className="col-12 col-lg">
        {beneficiary ? <TitleView role="Beneficiary" address={beneficiary} /> : <SkeletonPlaceholder />}
      </div>
      <div className="col-12 col-lg">
        {holder ? <TitleView role="Holder" address={holder} /> : <SkeletonPlaceholder />}
      </div>
    </div>
  );
};
