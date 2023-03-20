import React, { FunctionComponent } from "react";
import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementTitleProps {
  setFormActionNone: (isPendingConfirmation: boolean) => void;
  formAction: AssetManagementActions;
  disabled: boolean;
}

export const AssetManagementTitle: FunctionComponent<AssetManagementTitleProps> = ({
  setFormActionNone,
  formAction,
  disabled,
}) => {
  return (
    <div className="flex flex-wrap my-4">
      <div
        className={`mb-2 ${disabled ? "text-cloud-200 cursor-default" : "text-cloud-500 cursor-pointer"}`}
        onClick={() => setFormActionNone(disabled)}
        data-disabled={disabled}
      >
        <BackArrow />
        <h3 className="font-bold text-cloud-800">
          {formAction === AssetManagementActions.Surrender && <>Surrender Document</>}
          {formAction === AssetManagementActions.AcceptSurrendered && <>Accept Surrender of Document</>}
          {formAction === AssetManagementActions.RejectSurrendered && <>Reject Surrender of Document</>}
          {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
          {formAction === AssetManagementActions.EndorseBeneficiary && <>Endorse Change of Ownership</>}
          {formAction === AssetManagementActions.NominateBeneficiary && <>Nominate Change of Ownership</>}
          {formAction === AssetManagementActions.EndorseTransfer && <>Endorse Transfer of Ownership</>}
        </h3>
      </div>
    </div>
  );
};
