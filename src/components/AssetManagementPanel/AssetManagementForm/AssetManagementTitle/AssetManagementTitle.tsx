import styled from "@emotion/styled";
import React from "react";
import { mixin, vars } from "../../../../styles";
import { SvgIcon, SvgIconArrowLeft } from "../../../UI/SvgIcon";
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
      <div className={`row ${className}`}>
        <div className="col-12">
          <div className="action-back" onClick={() => setFormActionNone(disabled)} data-disabled={disabled}>
            <div className="row align-items-center no-gutters">
              <div className="col-auto mr-1">
                <SvgIcon>
                  <SvgIconArrowLeft />
                </SvgIcon>
              </div>
              <div className="col-auto">
                <p className="mb-0">Back</p>
              </div>
            </div>
          </div>
          <h3 className="action-title">
            {formAction === AssetManagementActions.Surrender && <>Surrender Document</>}
            {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
            {formAction === AssetManagementActions.EndorseBeneficiary && <>Endorse Change of Beneficiary</>}
            {formAction === AssetManagementActions.NominateBeneficiaryHolder && <>Nominate Change of Beneficiary</>}
            {formAction === AssetManagementActions.EndorseTransfer && <>Endorse Transfer of Beneficiary/Holder</>}
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
