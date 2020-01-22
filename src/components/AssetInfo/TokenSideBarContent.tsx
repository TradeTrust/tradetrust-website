import React, { useState } from "react";
import { getLogger } from "../../utils/logger";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";
import { transferTokenOwnership } from "../../services/token";

const { trace, error } = getLogger("component:TokenSideBarContent");
import getUserRoles, { UserRole } from "../../utils/UserRolesUtil";

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
  const userRole = getUserRoles({ adminAddress, holderAddress, beneficiaryAddress });
  const [fieldValue, setFieldValue] = useState({ newHolder: "", approvedBeneficiary: approvedBeneficiaryAddress || "" });
  const showLoaderCheck = holderAddress === "" && beneficiaryAddress === "";
  trace(`admin address: ${adminAddress}, holder address: ${holderAddress}, beneficiary address: ${beneficiaryAddress}`);
  const [showActionLoader, toggleActionLoader] = useState(false);
  const isEqualBeneficiaryAndHolder = userRole === UserRole.HolderBeneficiary;
  const showHolder = userRole === UserRole.Holder || isEqualBeneficiaryAndHolder;
  const showBeneficiary = userRole === UserRole.Beneficiary && !isEqualBeneficiaryAndHolder;
  const showNoAccess = userRole === UserRole.NoMatch;

  const handleInputChange = (e: any) => {
    setFieldValue({ ...fieldValue, ...{ [e.target.name]: e.target.value } });
  };

  const handleFormActions = async (fn: Function, value: string) => {
    try {
      toggleActionLoader(true);
      const { hash } = await fn(value);
      toggleActionLoader(false);
    } catch (e) {
      error(`handle action error ${e}`);
      toggleActionLoader(false);
      //setError(e.message);
    }
  };

  const approveChangeBeneficiary = () => {
    const { approvedBeneficiary } = fieldValue;
    handleFormActions(transferTokenOwnership, approvedBeneficiary);
  };

  const transferHoldership = async () => {
    const { newHolder } = fieldValue;
    handleFormActions(transferTokenOwnership, newHolder);
  };

  const changeBeneficiary = () => {
    const { approvedBeneficiary } = fieldValue;
    handleFormActions(transferTokenOwnership, approvedBeneficiary);
  };

  const surrenderDocument = () => {};

  return (
    <>
      {showActionLoader && <div className={css.loader} />}
      {!showActionLoader && showNoAccess && <TokenSideBarNoMatch />}
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
