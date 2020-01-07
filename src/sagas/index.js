import { all } from "redux-saga/effects";
import applicationSaga from "./application";
import certificateSaga from "./certificate";
import tokenSaga from "./token";

function* rootSaga() {
  yield all([...applicationSaga, ...certificateSaga, ...tokenSaga]);
}

export default rootSaga;
