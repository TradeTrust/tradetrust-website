import React, { FunctionComponent } from "react";
import { BackArrow } from "@tradetrust-tt/tradetrust-ui-components";
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
          {formAction === AssetManagementActions.ReturnToIssuer && <>Return ETR to Issuer</>}
          {formAction === AssetManagementActions.AcceptReturnToIssuer && <>Accept ETR Return</>}
          {formAction === AssetManagementActions.RejectReturnToIssuer && <>Reject ETR Return</>}
          {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
          {formAction === AssetManagementActions.EndorseBeneficiary && <>Endorse Change of Ownership</>}
          {formAction === AssetManagementActions.NominateBeneficiary && <>Nominate Change of Ownership</>}
          {formAction === AssetManagementActions.TransferOwnerHolder && <>Endorse Transfer of Ownership</>}
          {formAction === AssetManagementActions.RejectTransferOwnerHolder && (
            <>Reject Transfer of Ownership and Holdership</>
          )}
          {formAction === AssetManagementActions.RejectTransferOwner && <>Reject Transfer of Ownership</>}
          {formAction === AssetManagementActions.RejectTransferHolder && <>Reject Transfer of Holdership</>}
        </h3>
      </div>
    </div>
  );
};
