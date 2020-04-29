import React from "react";
import { AssetManagementActions } from "./../../AssetManagementContainer";
import { SvgIcon, SvgIconArrowLeft } from "../../../UI/SvgIcon";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../../styles";

interface AssetManagementTitleProps {
  className?: string;
  onBack: () => void;
  formAction: AssetManagementActions;
}

export const AssetManagementTitle = styled(({ className, onBack, formAction }: AssetManagementTitleProps) => {
  return (
    <div className={`row ${className}`}>
      <div className="col-12">
        <div className="action-back" onClick={onBack}>
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
        </h3>
      </div>
    </div>
  );
})`
  .action-back {
    color: ${vars.grey};
    cursor: pointer;
    margin-bottom: 10px;
  }

  .action-title {
    ${mixin.fontSourcesansproBold};
    color: ${vars.greyDark};
    margin-bottom: 10px;
  }
`;
