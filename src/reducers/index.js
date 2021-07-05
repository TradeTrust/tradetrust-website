import { combineReducers } from "redux";
import certificate from "./certificate";

export const createRootReducer = () =>
  combineReducers({
    certificate,
  });
