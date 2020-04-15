import React, { useState, useContext } from "react";
import { TitleEscrowFactory } from "@govtechsg/token-registry";

import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TokenModuleContext, TOKEN_MODULE } from "../../common/contexts/tokenModuleContext";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";
import { useTokenActions } from "../../common/hooks/useTokenActions";
import { TOKEN_ACTION_TYPES } from "./TokenActionUtil";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";

export const TransferBeneficiary = ({
  titleEscrow,
  approvedEscrowContractAddress,
  registryAddress,
  approvedEscrowInstance,
}: {
  titleEscrow: TitleEscrow;
  approvedEscrowContractAddress: string;
  approvedEscrowInstance: TitleEscrow;
  registryAddress: string;
}) => {
  const [newHolder, setNewHolder] = useState<string>("");
  const [newBeneficiary, setNewBeneficiary] = useState("");

  const { dispatch } = useContext(TokenModuleContext);
  const { executeAction, errorMessage } = useTokenActions({
    titleEscrow,
    actionType: TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY,
  });
  const { beneficiary, holder } = useTitleEscrowUsers({
    titleEscrow: approvedEscrowInstance,
  });

  const { signer } = useInjectedProvider();

  const deployEscrow = async () => {
    const factory = new TitleEscrowFactory(signer);
    const escrowInstance = await factory.deploy(registryAddress, newBeneficiary, newHolder);
    return escrowInstance.address;
  };

  const deployEscrowContractAction = async () => {
    try {
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: true });
      const contractAddress = approvedEscrowContractAddress ? approvedEscrowContractAddress : await deployEscrow();
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: false });
      return contractAddress;
    } catch (e) {
      dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: false });
    }
  };

  const changeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    executeAction(contractAddress);
  };

  return (
    <TokenSideBarField
      id="changebeneficiary"
      title="Endorse Change of Beneficiary"
      label={approvedEscrowContractAddress ? "Confirm" : "Endorse"}
      status="success"
      handleClick={changeBeneficiary}
    >
      <div className={`${css["field-single"]}`}>
        <h6>Holder Address</h6>
        <label>
          <input
            className={`${css["field-input"]} ${errorMessage ? css["is-error"] : ""}`}
            type="text"
            name="approvedHolder"
            value={holder || newHolder}
            onChange={(e) => setNewHolder(e.target.value)}
            disabled={!!approvedEscrowContractAddress}
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
            value={beneficiary || newBeneficiary}
            onChange={(e) => setNewBeneficiary(e.target.value)}
            disabled={!!approvedEscrowContractAddress}
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
      </div>
      {errorMessage && <TokenErrorMessage errorMessage={errorMessage} />}
    </TokenSideBarField>
  );
};
