import React, { useState, useContext } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TokenModuleContext } from "../../common/contexts/tokenModuleContext";

export const TransferHoldership = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const [newHolder, setNewHolder] = useState("");
  const { dispatch } = useContext(TokenModuleContext);
  const { send, errorMessage } = useContractFunctionHook(titleEscrow, "changeHolder");

  const changeHolder = () => {
    dispatch({ type: "SET_LOADER", showLoader: true });
    send(newHolder);
    dispatch({ type: "SET_LOADER", showLoader: false });
  };

  return (
    <>
      <TokenSideBarField
        id="transferholdership"
        title="Transfer Holdership"
        label="Transfer"
        handleClick={changeHolder}
      >
        <label>
          <input
            className={`${css["field-input"]} ${errorMessage ? css["is-error"] : ""}`}
            name="newHolder"
            value={newHolder}
            onChange={(e) => setNewHolder(e.target.value)}
            type="text"
            placeholder="Address (e.g. 0x483..)"
          />
        </label>
        {errorMessage && <TokenErrorMessage errorMessage={errorMessage} />}
      </TokenSideBarField>
    </>
  );
};
