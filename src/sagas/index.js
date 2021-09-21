import { all } from "redux-saga/effects";
import certificateSaga from "./certificate";
import demoSaga from "./demo";

function* rootSaga() {
  yield all([...certificateSaga, ...demoSaga]);
}

export default rootSaga;
