import { combineReducers } from "redux";
import certificate from "./certificate";
import { demo } from "./demo";

export const createRootReducer = combineReducers({
  certificate,
  demo,
});

export type RootState = ReturnType<typeof createRootReducer>;
