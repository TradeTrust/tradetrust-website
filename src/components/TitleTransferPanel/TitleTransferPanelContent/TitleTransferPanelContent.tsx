import React from "react";
import css from "./TitleTransferPanelContent.module.scss";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useTitleEscrowUsers } from "../../../common/hooks/useTitleEscrowUsers";

export const TitleTransferPanelContent = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const { beneficiary, holder } = useTitleEscrowUsers({ titleEscrow });

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
