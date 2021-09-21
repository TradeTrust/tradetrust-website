import { combineReducers } from "redux";
import certificate from "./certificate";
import { sample } from "./sample";
import { demo } from "./demo";

export const createRootReducer = combineReducers({
  certificate,
  sample,
  demo,
});

export type RootState = ReturnType<typeof createRootReducer>;
