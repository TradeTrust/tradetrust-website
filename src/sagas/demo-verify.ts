import { put, select, takeEvery } from "redux-saga/effects";
import { getLogger } from "../utils/logger";
import { verifyDemoDocumentCompleted, verifyDemoDocumentFailure, getDemoDocument } from "../reducers/demo-verify";
import { verifyDocument, VerifierType } from "../services/verify";
import { isValid } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../config";
import { history } from "../history";
import { MESSAGES } from "../constants/VerificationErrorMessages";
import { errorMessageHandling } from "../services/verify/fragments";

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

    if (NETWORK_NAME === "local" ? true : isValid(verificationStatus)) {
      yield history.push("/demo/viewer");
    } else {
      const errorMsg = errorMessageHandling(verificationStatus).map((errorType) => MESSAGES[errorType].failureMessage);
      yield put(verifyDemoDocumentFailure(errorMsg));
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(verifyDemoDocumentFailure([e.message]));
    }
  }
}

export default [takeEvery("demo-verify/updateDemoDocument", verifyDemoDocument)];
