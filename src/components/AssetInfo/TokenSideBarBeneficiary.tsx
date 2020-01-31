import React, { ReactElement } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TOKEN_ACTION_TYPES } from "./util";

interface TokenBeneficiaryInterface {
  setBeneficiary: (e: any) => void;
  approvedBeneficiary: string;
  error: { type: TOKEN_ACTION_TYPES; message: string } | null;
  approveChangeBeneficiary: () => void;
}

const TokenSideBarBeneficiary = ({
  setBeneficiary,
  approvedBeneficiary,
  error,
  approveChangeBeneficiary
}: TokenBeneficiaryInterface): ReactElement => (
  <TokenSideBarField
    id="sec-approvechangebeneficiary"
    title="Approve Change Beneficiary"
    label="Approve"
    status="success"
    handleClick={approveChangeBeneficiary}
  >
    <label>
      <input
        className={`${css["field-input"]} ${
          error && error.type === TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY ? css["is-error"] : ""
        }`}
        type="text"
        placeholder="Address (e.g. 0x483..)"
        name="approvedBeneficiary"
        value={approvedBeneficiary}
        onChange={setBeneficiary}
      />
    </label>
    {error && error.type === TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY && (
      <div className={`${css["message"]} ${css["message-error"]}`}>
        <p>{error.message}</p>
      </div>
    )}
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
