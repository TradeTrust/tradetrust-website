import React from "react";
import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementTitleProps {
  setFormActionNone: (isPendingConfirmation: boolean) => void;
  formAction: AssetManagementActions;
  disabled: boolean;
}

export const AssetManagementTitle = ({ setFormActionNone, formAction, disabled }: AssetManagementTitleProps) => {
  return (
    <div className="flex flex-wrap">
      <div
        className={`mb-2 ${disabled ? "text-grey-300 cursor-default" : "text-grey cursor-pointer"}`}
        onClick={() => setFormActionNone(disabled)}
        data-disabled={disabled}
      >
        <BackArrow />
        <h3 className="font-bold text-grey-700 mb-2">
          {formAction === AssetManagementActions.Surrender && <>Surrender Document</>}
          {formAction === AssetManagementActions.AcceptSurrendered && <>Accept Surrender of Document</>}
          {formAction === AssetManagementActions.RejectSurrendered && <>Reject Surrender of Document</>}
          {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
          {formAction === AssetManagementActions.EndorseBeneficiary && <>Endorse Change of Ownership</>}
          {formAction === AssetManagementActions.NominateBeneficiaryHolder && <>Nominate Change of Ownership</>}
          {formAction === AssetManagementActions.EndorseTransfer && <>Endorse Transfer of Ownership</>}
        </h3>
      </div>
    </div>
  );
};
