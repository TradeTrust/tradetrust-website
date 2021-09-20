import { put, select, takeEvery } from "redux-saga/effects";
import { getLogger } from "../utils/logger";
import {
  verifyDemoMagicDocumentCompleted,
  verifyDemoMagicDocumentFailure,
  getDemoMagicDocument,
} from "../reducers/demoMagicWallet";
import { verifyDocument } from "../services/verify";
import { isValid } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../config";
import { history } from "../history";

const { trace } = getLogger("saga:demoMagicWallet");

export function* verifyDemoMagicDocument() {
  try {
    yield put({
      type: "demoMagicWallet/verifyingDemoMagicDocument",
    });

    const demoMagicDocument = yield select(getDemoMagicDocument);
    const verificationStatus = yield verifyDocument(demoMagicDocument);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    yield put(verifyDemoMagicDocumentCompleted(verificationStatus));
    // TODO: redirect to the correct page for DEMO MAGIC once the document successfully verified
    // if (NETWORK_NAME === "local" ? true : isValid(verificationStatus)) {
    //   yield history.push("/demoViewer");
    // }
  } catch (e) {
    yield put(verifyDemoMagicDocumentFailure(e.message));
  }
}

export default [takeEvery("demoMagicWallet/updateDemoMagicDocument", verifyDemoMagicDocument)];
