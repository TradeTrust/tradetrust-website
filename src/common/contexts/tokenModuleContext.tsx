import React, { createContext, useReducer, ReactElement } from "react";
import { TOKEN_ACTION_TYPES } from "../../components/AssetInfo/TokenActionUtil";

export enum TOKEN_MODULE {
  "SET_LOADER",
  "SET_TRANSACTION_HASH",
  "SET_ACTION_TYPE",
}

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
      case TOKEN_MODULE.SET_LOADER:
        return { ...state, showLoader: action.showLoader };
      case TOKEN_MODULE.SET_TRANSACTION_HASH:
        return { ...state, transactionHash: action.transactionHash };
      case TOKEN_MODULE.SET_ACTION_TYPE:
        return { ...state, actionType: action.actionType };
      default:
        throw new Error();
    }
  }, initialState);

  return <TokenModuleContext.Provider value={{ state, dispatch }}>{children}</TokenModuleContext.Provider>;
};

export { TokenModuleContext, TokenStateProvider };
