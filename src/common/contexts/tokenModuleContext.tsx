import React, { createContext, useReducer, ReactElement } from "react";
import { TOKEN_ACTION_TYPES } from "../../components/AssetInfo/TokenActionUtil";

type STATE = {
  showLoader: boolean;
  transactionHash: string;
  actionType: TOKEN_ACTION_TYPES;
};

interface TokenState {
  state: STATE;
  dispatch: React.Dispatch<any>;
}

const initialState = { showLoader: false, transactionHash: "", actionType: TOKEN_ACTION_TYPES.CHANGE_HOLDER };
const TokenModuleContext = createContext({} as TokenState);

const TokenStateProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_LOADER":
        return { ...state, showLoader: action.payload.showLoader };
      case "SET_TRANSACTION_HASH":
        return { ...state, transactionHash: action.payload.transactionHash };
      case "SET_ACTION_TYPE":
        return { ...state, actionType: action.payload.actionType };
      default:
        throw new Error();
    }
  }, initialState);

  return <TokenModuleContext.Provider value={{ state, dispatch }}>{children}</TokenModuleContext.Provider>;
};

export { TokenModuleContext, TokenStateProvider };
