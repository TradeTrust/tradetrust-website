import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TOKEN_ACTION_TYPES } from "./../../utils/TokenActionUtil";
import { TokenErrorMessage } from "./TokenErrorMessage";

type ErrorType = { type: TOKEN_ACTION_TYPES; message: string };

interface TokenSideBarHolderProps {
  isEqualBeneficiaryAndHolder: boolean;
  approvedHolderAddress: string;
  approvedBeneficiaryAddress: string;
  newHolder: string;
  setNewHolder: (e: any) => void;
  setApprovedHolder: (e: any) => void;
  setApprovedBeneficiary: (e: any) => void;
  transferHoldership: () => void;
  changeBeneficiary: () => void;
  surrenderDocument: () => void;
  error: ErrorType | null;
}

const isChangeHolderError = (error: any): error is ErrorType => error?.type === TOKEN_ACTION_TYPES.CHANGE_HOLDER;
const isChangeBeneficiaryError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY;
const isSurrenderDocumentError = (error: any): error is ErrorType =>
  error?.type === TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT;

const TokenSideBarHolder = ({
  isEqualBeneficiaryAndHolder,
  approvedBeneficiaryAddress,
  approvedHolderAddress,
  setNewHolder,
  setApprovedHolder,
  setApprovedBeneficiary,
  newHolder,
  transferHoldership,
  changeBeneficiary,
  surrenderDocument,
  error
}: TokenSideBarHolderProps) => {
  const isApprovedAddress = !!approvedBeneficiaryAddress && !!approvedHolderAddress;
  const showChangeBeneficiary = isApprovedAddress || isEqualBeneficiaryAndHolder;
  const isApprovedEscrowAddress = isApprovedAddress && !isEqualBeneficiaryAndHolder;
  return (
    <>
      <TokenSideBarField
        id="transferholdership"
        title="Transfer Holdership"
        label="Transfer"
        handleClick={transferHoldership}
      >
        <label>
          <input
            className={`${css["field-input"]} ${isChangeHolderError(error) ? css["is-error"] : ""}`}
            name="newHolder"
            value={newHolder}
            onChange={e => setNewHolder(e.target.value)}
            type="text"
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
        {isChangeHolderError(error) && <TokenErrorMessage errorMessage={error.message} />}
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField
          id="changebeneficiary"
          title="Endorse Change of Beneficiary"
          label={isApprovedAddress ? "Confirm" : "Endorse"}
          status="success"
          handleClick={changeBeneficiary}
        >
          <div className={`${css["field-single"]}`}>
            <h6>Holder Address</h6>
            <label>
              <input
                className={`${css["field-input"]} ${isChangeBeneficiaryError(error) ? css["is-error"] : ""}`}
                type="text"
                name="approvedHolder"
                value={approvedHolderAddress}
                onChange={e => setApprovedHolder(e.target.value)}
                disabled={isApprovedEscrowAddress}
                placeholder="Address (e.g. 0x483..)"
              />
            </label>
          </div>
          <div className={`${css["field-single"]}`}>
            <h6>Beneficiary Address</h6>
            <label>
              <input
                className={`${css["field-input"]} ${isChangeBeneficiaryError(error) ? css["is-error"] : ""}`}
                type="text"
                name="approvedBeneficiary"
                value={approvedBeneficiaryAddress}
                onChange={e => setApprovedBeneficiary(e.target.value)}
                disabled={isApprovedEscrowAddress}
                placeholder="Address (e.g. 0x483..)"
              />
            </label>
          </div>
          {isChangeBeneficiaryError(error) && <TokenErrorMessage errorMessage={error.message} />}
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField
          id="surrenderdocument"
          title="Surrender Document"
          label="Surrender"
          status="danger"
          handleClick={surrenderDocument}
        >
          {isSurrenderDocumentError(error) && <TokenErrorMessage errorMessage={error.message} />}
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
