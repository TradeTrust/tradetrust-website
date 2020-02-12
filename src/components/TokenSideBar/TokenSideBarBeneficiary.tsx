import React, { ReactElement } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TOKEN_ACTION_TYPES } from "./../../utils/TokenSuccessUtil";
import { TokenErrorMessage } from "./TokenErrorMessage";

type ErrorType = { type: TOKEN_ACTION_TYPES; message: string };

interface TokenBeneficiaryInterface {
  setBeneficiary: (e: any) => void;
  approvedBeneficiary: string;
  error: ErrorType | null;
  approveChangeBeneficiary: () => void;
}

const isEndorseBeneficiaryError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY;

const TokenSideBarBeneficiary = ({
  setBeneficiary,
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
    <label>
      <input
        className={`${css["field-input"]} ${isEndorseBeneficiaryError(error) ? css["is-error"] : ""}`}
        type="text"
        name="approvedBeneficiary"
        value={approvedBeneficiary}
        onChange={setBeneficiary}
      />
    </label>
    {isEndorseBeneficiaryError(error) && <TokenErrorMessage errorMessage={error.message} />}
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
