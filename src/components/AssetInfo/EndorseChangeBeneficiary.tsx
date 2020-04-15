import React, { useState, useContext, ReactElement } from "react";
import {TitleEscrowFactory} from "@govtechsg/token-registry";

import { TOKEN_ACTION_TYPES } from "./TokenActionUtil";
import { deployEscrowContract } from "../../services/token";

import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TokenModuleContext, TOKEN_MODULE } from "../../common/contexts/tokenModuleContext";
import { useTokenActions } from "../../common/hooks/useTokenActions";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";

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

  const { dispatch } = useContext(TokenModuleContext);
  const { executeAction, errorMessage } = useTokenActions({
    titleEscrow,
    actionType: TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY,
  });

  const { signer } = useInjectedProvider();

  const deployEscrow = async () => {
    const factory = new TitleEscrowFactory(signer);
    const escrowInstance = await factory.deploy(registryAddress, newBeneficiary, newHolder);
    return escrowInstance.address;
  }

  const deployEscrowContractAction = async () => {
    console.log("approved address");
    console.log(approvedEscrowContractAddress);
    try {
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: true });
      const contractAddress = approvedEscrowContractAddress
        ? approvedEscrowContractAddress
        : await deployEscrow();
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: false });
      return contractAddress;
    } catch (e) {
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: false });
    }
  };

  const approveChangeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    executeAction(contractAddress);
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
