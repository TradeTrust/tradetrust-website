import { combineReducers } from "redux";
import certificate from "./certificate";
import { demoDocument } from "./demoDocument";
import { demoMagicWallet } from "./demoMagicWallet";

export const createRootReducer = combineReducers({
  certificate,
  demoDocument,
  demoMagicWallet,
});

export type RootState = ReturnType<typeof createRootReducer>;
