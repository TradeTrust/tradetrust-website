import { all } from "redux-saga/effects";
import certificateSaga from "./certificate";
import demoMagicWalletSaga from "./demoMagicWallet";

function* rootSaga() {
  yield all([...certificateSaga, ...demoMagicWalletSaga]);
}

export default rootSaga;
