import React, { useState } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";
import { transferTokenOwnership, transactionMinedReceipt } from "../../services/token";

interface TokenSideBarContentProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
}

const TokenSideBarContent = ({
  adminAddress,
  beneficiaryAddress,
  holderAddress,
  approvedBeneficiaryAddress,
  registryAddress
}: TokenSideBarContentProps) => {
  const [fieldValue, setFieldValue] = useState({ newHolder: "", approvedBeneficiary: "" });
  const [showLoader, toggleLoader] = useState(false);
  const [error, setError] = useState("");

  const isEqualBeneficiaryAndHolder = adminAddress === holderAddress && adminAddress === beneficiaryAddress;
  const showHolder = adminAddress === holderAddress || isEqualBeneficiaryAndHolder;
  const showBeneficiary = adminAddress === beneficiaryAddress && !isEqualBeneficiaryAndHolder;
  const showLoaderCheck = holderAddress === "" && beneficiaryAddress === "";
  const showNoAccess = showLoader === false && (adminAddress !== holderAddress && adminAddress !== beneficiaryAddress);

  const handleInputChange = (e: any) => {
    setFieldValue({ ...fieldValue, ...{ [e.target.name]: e.target.value } });
  };

  const handleFormActions = async (fn: Function, value: string) => {
    try {
      toggleLoader(true);
      const { hash } = await fn(value);
      await transactionMinedReceipt(hash);
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      setError(e.message);
    }
  };

  const approveChangeBeneficiary = () => {};

  const transferHoldership = async () => {
    const { newHolder } = fieldValue;
    handleFormActions(transferTokenOwnership, newHolder);
  };

  const changeBeneficiary = () => {};

  const surrenderDocument = () => {};

  return (
    <>
      {showLoaderCheck && <div className={css.loader} />}
      {showNoAccess && <TokenSideBarNoMatch />}
      {showHolder && (
        <TokenSideBarHolder
          isEqualBeneficiaryAndHolder={isEqualBeneficiaryAndHolder}
          approvedBeneficiaryAddress={approvedBeneficiaryAddress}
          registryAddress={registryAddress}
          newHolder={fieldValue.newHolder}
          setNewHolder={handleInputChange}
          transferHoldership={transferHoldership}
          changeBeneficiary={changeBeneficiary}
          surrenderDocument={surrenderDocument}
        />
      )}
      {showBeneficiary && (
        <TokenSideBarBeneficiary
          setBeneficiary={handleInputChange}
          approveChangeBeneficiary={approveChangeBeneficiary}
          approvedBeneficiary={fieldValue.approvedBeneficiary}
        />
      )}
    </>
  );
};

export default TokenSideBarContent;
