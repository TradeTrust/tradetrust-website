import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import certificate from "./certificate";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    certificate,
  });
