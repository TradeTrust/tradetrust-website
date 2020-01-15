import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

interface TokenSideBarHolderProps {
  isEqualBeneficiaryAndHolder: boolean;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
  newHolder: string;
  setNewHolder: (e: any) => void;
  transferHoldership: () => void;
  changeBeneficiary: () => void;
  surrenderDocument: () => void;
}

const TokenSideBarHolder = ({
  isEqualBeneficiaryAndHolder,
  approvedBeneficiaryAddress,
  registryAddress,
  setNewHolder,
  newHolder,
  transferHoldership,
  changeBeneficiary,
  surrenderDocument
}: TokenSideBarHolderProps) => {
  const showChangeBeneficiary = !!approvedBeneficiaryAddress || isEqualBeneficiaryAndHolder;

  return (
    <>
      <TokenSideBarField title="Transfer Ownership" ctaText="Transfer" handleClick={transferHoldership}>
        <label>
          <input
            className={`${css["field-input"]}`}
            name="newHolder"
            value={newHolder}
            onChange={setNewHolder}
            type="text"
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField
          title="Change Beneficiary"
          ctaText="Change"
          ctaStatus="success"
          handleClick={changeBeneficiary}
        >
          <label>
            <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField
          title="Surrender Document"
          ctaText="Surrender"
          ctaStatus="danger"
          handleClick={surrenderDocument}
        >
          <div className={`${css.field}`}>
            <p className={`${css["register-address"]}`}>{registryAddress}</p>
          </div>
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
