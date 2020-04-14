import React from "react";

import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TOKEN_ACTION_TYPES } from "./TokenActionUtil";
import { useTokenActions } from "../../common/hooks/useTokenActions";

export const SurrenderDocument = ({
  titleEscrow,
  registryAddress,
}: {
  titleEscrow: TitleEscrow;
  registryAddress: string;
}) => {
  const { executeAction, errorMessage } = useTokenActions({
    titleEscrow,
    actionType: TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT,
  });

  return (
    <TokenSideBarField
      id="surrenderdocument"
      title="Surrender Document"
      label="Surrender"
      status="danger"
      handleClick={() => executeAction(registryAddress)}
    >
      {errorMessage && <TokenErrorMessage errorMessage={errorMessage} />}
    </TokenSideBarField>
  );
};
