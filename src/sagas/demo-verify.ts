import { put, select, takeEvery } from "redux-saga/effects";
import { getLogger } from "../utils/logger";
import { verifyDemoDocumentCompleted, verifyDemoDocumentFailure, getDemoDocument } from "../reducers/demo-verify";
import { verifyDocument, VerifierType } from "../services/verify";

const { trace } = getLogger("saga:demo");

export function* verifyDemoDocument(): any {
  try {
    yield put({
      type: "demo-verify/verifyingDemoDocument",
    });

    const demoDocument = yield select(getDemoDocument);
    const verificationStatus = yield verifyDocument(demoDocument, VerifierType.DEMO);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    yield put(verifyDemoDocumentCompleted(verificationStatus));
  } catch (e) {
    if (e instanceof Error) {
      yield put(verifyDemoDocumentFailure(e.message));
    }
  }
}

export default [takeEvery("demo-verify/updateDemoDocument", verifyDemoDocument)];
