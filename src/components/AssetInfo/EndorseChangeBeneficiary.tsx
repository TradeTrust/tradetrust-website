import React, { useState, useContext, useEffect, ReactElement } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { checkIfApprovedAddress } from "./TokenActionUtil";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";
import { deployEscrowContract } from "../../services/token";

import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TokenModuleContext } from "../../common/contexts/tokenModuleContext";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";

interface TokenBeneficiaryInterface {
  titleEscrow: TitleEscrow;
  approvedEscrowContractAddress: string;
  registryAddress: string;
}

export const EndorseChangeBeneficiary = ({
  titleEscrow,
  approvedEscrowContractAddress,
  registryAddress,
}: TokenBeneficiaryInterface): ReactElement => {
  const [newHolder, setNewHolder] = useState("");
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const [deployedContractAddress, setDeployedContractAddress] = useState("");

  const { signer } = useInjectedProvider();
  const { dispatch } = useContext(TokenModuleContext);
  const { send, errorMessage } = useContractFunctionHook(titleEscrow, "endorseTransfer");

  useEffect(() => {
    try {
      if (checkIfApprovedAddress(approvedEscrowContractAddress)) {
        const instance = TitleEscrowFactory.connect(approvedEscrowContractAddress, signer);
        const { beneficiary: approvedBeneficiary, holder: approvedHolder } = useTitleEscrowUsers({
          titleEscrow: instance,
        });
        if (approvedBeneficiary) setNewBeneficiary(approvedBeneficiary);
        if (approvedHolder) setNewHolder(approvedHolder);
      }
    } catch (e) {
      console.error("no approved escrow contract");
    }
  }, [approvedEscrowContractAddress, signer]);

  const deployEscrowContractAction = async () => {
    try {
      dispatch({ type: "SET_LOADER", showLoader: true });
      const contractAddress = approvedEscrowContractAddress
        ? approvedEscrowContractAddress
        : await deployEscrowContract({
            registryAddress,
            beneficiaryAddress: newBeneficiary,
            holderAddress: newHolder,
          });
      setDeployedContractAddress(contractAddress);
      dispatch({ type: "SET_LOADER", showLoader: false });
    } catch (e) {
      dispatch({ type: "SET_LOADER", showLoader: false });
    }
  };

  const approveChangeBeneficiary = async () => {
    dispatch({ type: "SET_LOADER", showLoader: true });
    await deployEscrowContractAction();
    send(deployedContractAddress);
    dispatch({ type: "SET_LOADER", showLoader: false });
  };

  return (
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
            className={`${css["field-input"]} ${errorMessage ? css["is-error"] : ""}`}
            type="text"
            name="approvedHolder"
            value={newHolder}
            onChange={(e) => setNewHolder(e.target.value)}
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
      </div>
      <div className={`${css["field-single"]}`}>
        <h6>Beneficiary Address</h6>
        <label>
          <input
            className={`${css["field-input"]} ${errorMessage ? css["is-error"] : ""}`}
            type="text"
            name="approvedBeneficiary"
            value={newBeneficiary}
            onChange={(e) => setNewBeneficiary(e.target.value)}
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
      </div>
      {errorMessage && <TokenErrorMessage errorMessage={errorMessage} />}
    </TokenSideBarField>
  );
};
