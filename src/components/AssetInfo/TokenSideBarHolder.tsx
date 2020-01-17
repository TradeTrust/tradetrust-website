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
      <TokenSideBarField
        id="transferholdership"
        title="Transfer Holdership"
        ctaText="Transfer"
        handleClick={transferHoldership}
      >
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
          id="changebeneficiary"
          title="Change Beneficiary"
          ctaText="Submit"
          ctaStatus="success"
          approvedBeneficiaryAddress={approvedBeneficiaryAddress}
          handleClick={changeBeneficiary}
        >
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              placeholder="Address (e.g. 0x483..)"
              disabled={!!approvedBeneficiaryAddress}
              defaultValue={approvedBeneficiaryAddress}
            />
          </label>
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField
          id="surrenderdocument"
          title="Surrender Document"
          ctaText="Surrender"
          ctaStatus="danger"
          handleClick={surrenderDocument}
        >
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              placeholder="Address (e.g. 0x483..)"
              disabled
              value={registryAddress}
            />
          </label>
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
