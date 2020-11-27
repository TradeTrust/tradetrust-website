import styled from "@emotion/styled";
import React from "react";
import { ArrowLeft } from "react-feather";
import { mixin, vars } from "../../../../styles";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementTitleProps {
  className?: string;
  setFormActionNone: (isPendingConfirmation: boolean) => void;
  formAction: AssetManagementActions;
  disabled: boolean;
}

export const AssetManagementTitle = styled(
  ({ className, setFormActionNone, formAction, disabled }: AssetManagementTitleProps) => {
    return (
      <div className={`flex flex-wrap ${className}`}>
        <div className="action-back" onClick={() => setFormActionNone(disabled)} data-disabled={disabled}>
          <div className="flex flex-wrap items-center">
            <div className="w-auto mr-1">
              <ArrowLeft />
            </div>
            <div className="w-auto">
              <p className="mb-0">Back</p>
            </div>
          </div>
          <h3 className="action-title">
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
  }
)`
  .action-back {
    color: ${vars.grey};
    cursor: pointer;
    margin-bottom: 10px;

    &[data-disabled="true"] {
      color: ${vars.greyLight};
      cursor: default;
    }
  }

  .action-title {
    ${mixin.fontSourcesansproBold};
    color: ${vars.greyDark};
    margin-bottom: 10px;
  }
`;
