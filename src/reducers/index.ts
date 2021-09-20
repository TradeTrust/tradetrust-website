import { combineReducers } from "redux";
import certificate from "./certificate";
import { sample } from "./sample";
import { demoMagicWallet } from "./demoMagicWallet";

export const createRootReducer = combineReducers({
  certificate,
  sample,
  demoMagicWallet,
});

export type RootState = ReturnType<typeof createRootReducer>;
