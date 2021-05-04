import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import certificate from "./certificate";

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    certificate,
  });
