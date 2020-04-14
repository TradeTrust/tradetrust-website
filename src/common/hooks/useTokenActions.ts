import { useEffect, useContext } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TOKEN_ACTION_TYPES } from "../../components/AssetInfo/TokenActionUtil";
import { TokenModuleContext, TOKEN_MODULE } from "../contexts/tokenModuleContext";

const getActionName = (actionType: TOKEN_ACTION_TYPES) => {
  switch (actionType) {
    case TOKEN_ACTION_TYPES.CHANGE_HOLDER:
      return "changeHolder";
    case TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY:
    case TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT:
      return "transferTo";
    case TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY:
      return "endorseTransfer";
    default:
      throw new Error("can not find action");
  }
};

export const useTokenActions = ({
  titleEscrow,
  actionType,
}: {
  titleEscrow: TitleEscrow;
  actionType: TOKEN_ACTION_TYPES;
}) => {
  const actionName = getActionName(actionType);
  const { dispatch } = useContext(TokenModuleContext);
  const { send, transactionHash, errorMessage } = useContractFunctionHook(titleEscrow, actionName);

  const executeAction = async (value: string) => {
    dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: true });
    dispatch({ type: TOKEN_MODULE.SET_ACTION_TYPE, actionType: TOKEN_ACTION_TYPES.CHANGE_HOLDER });
    await send(value);
    dispatch({ type: TOKEN_MODULE.SET_LOADER, showLoader: false });
  };

  useEffect(() => {
    dispatch({ type: TOKEN_MODULE.SET_TRANSACTION_HASH, transactionHash });
  }, [dispatch, transactionHash]);

  return { executeAction, errorMessage };
};
