import React, { useContext } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

import TokenSideBarField from "./TokenSideBarField";
import { TokenErrorMessage } from "./TokenErrorMessage";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TokenModuleContext } from "../../common/contexts/tokenModuleContext";

export const SurrenderDocument = ({
  titleEscrow,
  registryAddress,
}: {
  titleEscrow: TitleEscrow;
  registryAddress: string;
}) => {
  const { dispatch } = useContext(TokenModuleContext);
  const { send, errorMessage } = useContractFunctionHook(titleEscrow, "transferTo");

  const surrenderDocument = () => {
    dispatch({ type: "SET_LOADER", showLoader: true });
    send(registryAddress);
    dispatch({ type: "SET_LOADER", showLoader: false });
  };

  return (
    <TokenSideBarField
      id="surrenderdocument"
      title="Surrender Document"
      label="Surrender"
      status="danger"
      handleClick={surrenderDocument}
    >
      {errorMessage && <TokenErrorMessage errorMessage={errorMessage} />}
    </TokenSideBarField>
  );
};
