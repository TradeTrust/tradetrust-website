import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

interface TokenSideBarHolderProps {
  isEqualBeneficiaryAndHolder: boolean;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
  newHolder: string;
  handleInputChange: (e: any) => void;
  transferHoldership: () => void;
  changeBeneficiary: () => void;
  surrenderDocument: () => void;
}

const TokenSideBarHolder = ({
  isEqualBeneficiaryAndHolder,
  approvedBeneficiaryAddress,
  registryAddress,
  handleInputChange,
  newHolder,
  transferHoldership,
  changeBeneficiary,
  surrenderDocument
}: TokenSideBarHolderProps) => {
  const showChangeBeneficiary = !!approvedBeneficiaryAddress || isEqualBeneficiaryAndHolder;

  return (
    <>
      <TokenSideBarField
        id="sec-transferownership"
        title="Transfer Holdership"
        label="Transfer"
        handleClick={transferHoldership}
      >
        <label>
          <input
            className={`${css["field-input"]}`}
            name="newHolder"
            value={newHolder}
            onChange={handleInputChange}
            type="text"
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField
          id="sec-changebeneficiary"
          title="Change Beneficiary"
          label="Submit"
          status="success"
          handleClick={changeBeneficiary}
        >
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              name="approvedBeneficiary"
              value={approvedBeneficiaryAddress}
              onChange={handleInputChange}
              placeholder="Address (e.g. 0x483..)"
              disabled={!!approvedBeneficiaryAddress && !isEqualBeneficiaryAndHolder}
            />
          </label>
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField
          id="sec-surrenderdocument"
          title="Surrender Document"
          label="Surrender"
          status="danger"
          handleClick={surrenderDocument}
        >
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              placeholder="Address (e.g. 0x483..)"
              disabled
              defaultValue={registryAddress}
            />
          </label>
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
