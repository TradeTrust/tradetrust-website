import React, { useState } from "react";

import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TOKEN_ACTION_TYPES } from "./TokenActionUtil";
import { useTokenActions } from "../../common/hooks/useTokenActions";

export const TransferHoldership = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const [newHolder, setNewHolder] = useState("");
  const { executeAction, errorMessage } = useTokenActions({
    titleEscrow,
    actionType: TOKEN_ACTION_TYPES.CHANGE_HOLDER,
  });

  return (
    <>
      <TokenSideBarField
        id="transferholdership"
        title="Transfer Holdership"
        label="Transfer"
        handleClick={() => executeAction(newHolder)}
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
