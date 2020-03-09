import React, { ReactElement } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TOKEN_ACTION_TYPES } from "./TokenActionUtil";
import { TokenErrorMessage } from "./TokenErrorMessage";

type ErrorType = { type: TOKEN_ACTION_TYPES; message: string };

interface TokenBeneficiaryInterface {
  setApprovedBeneficiary: (e: any) => void;
  setApprovedHolder: (e: any) => void;
  approvedHolder: string;
  approvedBeneficiary: string;
  error: ErrorType | null;
  approveChangeBeneficiary: () => void;
}

const isEndorseBeneficiaryError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY;

const TokenSideBarBeneficiary = ({
  setApprovedBeneficiary,
  setApprovedHolder,
  approvedHolder,
  approvedBeneficiary,
  approveChangeBeneficiary,
  error
}: TokenBeneficiaryInterface): ReactElement => (
  <TokenSideBarField
    id="approvechangebeneficiary"
    title="Endorse Change of Beneficiary"
    label="Endorse"
    status="success"
    handleClick={approveChangeBeneficiary}
  >
    <div className={`${css["field-single"]}`}>
      <h6>Holder Address</h6>
      <label>
        <input
          className={`${css["field-input"]} ${isEndorseBeneficiaryError(error) ? css["is-error"] : ""}`}
          type="text"
          name="approvedHolder"
          value={approvedHolder}
          onChange={e => setApprovedHolder(e.target.value)}
          placeholder="Address (e.g. 0x483..)"
        />
      </label>
    </div>
    <div className={`${css["field-single"]}`}>
      <h6>Beneficiary Address</h6>
      <label>
        <input
          className={`${css["field-input"]} ${isEndorseBeneficiaryError(error) ? css["is-error"] : ""}`}
          type="text"
          name="approvedBeneficiary"
          value={approvedBeneficiary}
          onChange={e => setApprovedBeneficiary(e.target.value)}
          placeholder="Address (e.g. 0x483..)"
        />
      </label>
    </div>
    {isEndorseBeneficiaryError(error) && <TokenErrorMessage errorMessage={error.message} />}
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
