import { all } from "redux-saga/effects";
import applicationSaga from "./application";
import certificateSaga from "./certificate";
import tokenSaga from "./token";
import adminSaga from "./admin";

function* rootSaga() {
  yield all([...applicationSaga, ...certificateSaga, ...tokenSaga, ...adminSaga]);
}

export default rootSaga;
