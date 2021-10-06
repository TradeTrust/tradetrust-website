import { put, select, takeEvery, takeLatest, call } from "redux-saga/effects";
import { getLogger } from "../utils/logger";
import {
  verifyDemoDocumentCompleted,
  verifyDemoDocumentFailure,
  getDemoDocument,
  getSigner,
  deployDocStoreSuccess,
  deployDocStoreFailure,
  createTempDnsSuccess,
  createTempDnsFailure,
  getDocumentStoreAddress,
  getTempDns,
  getDemoFormValues,
  wrapDocumentSuccess,
  wrapDocumentFailure,
  issueDocumentSuccess,
  issueDocumentFailure,
} from "../reducers/demo";
import { verifyDocument, VerifierType } from "../services/verify";
import { createTempDns, deployDocumentStore, getWrappedDocument, publishDocument } from "../services/create";
// import { isValid } from "@govtechsg/oa-verify";
// import { NETWORK_NAME } from "../config";
// import { history } from "../history";

const { trace } = getLogger("saga:demo");

export function* verifyDemoDocument(): any {
  try {
    yield put({
      type: "demo/verifyingDemoDocument",
    });

    const demoDocument = yield select(getDemoDocument);
    const verificationStatus = yield verifyDocument(demoDocument, VerifierType.DEMO);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    yield put(verifyDemoDocumentCompleted(verificationStatus));
    // TODO: redirect to the correct page for DEMO once the document successfully verified
    // if (NETWORK_NAME === "local" ? true : isValid(verificationStatus)) {
    //   yield history.push("/demoViewer");
    // }
  } catch (e) {
    if (e instanceof Error) {
      yield put(verifyDemoDocumentFailure(e.message));
    }
  }
}

export function* prepareDemoDocument(): any {
  try {
    yield put({
      type: "demo/deployingDocStore",
    });
    const signer = yield select(getSigner);
    const documentStoreAddress = yield call(deployDocumentStore, signer, "DEMO_STORE");
    // const documentStoreAddress = yield deployDocumentStore(signer, "DEMO_STORE");
    yield put(deployDocStoreSuccess(documentStoreAddress));

    try {
      yield put({
        type: "demo/creatingTempDns",
      });

      const tempDns = yield call(createTempDns, documentStoreAddress);

      yield put(createTempDnsSuccess(tempDns));
    } catch (e) {
      if (e instanceof Error) {
        yield put(createTempDnsFailure(e.message));
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(deployDocStoreFailure(e.message));
    }
  }
}

export function* issueDemoDocument(): any {
  try {
    yield put({
      type: "demo/wrappingDocument",
    });

    const documentStoreAddress = yield select(getDocumentStoreAddress);
    const tempDns = yield select(getTempDns);
    const demoFormValues = yield select(getDemoFormValues);

    const wrappedDocument = yield call(getWrappedDocument, documentStoreAddress, demoFormValues, tempDns);

    yield put(wrapDocumentSuccess(wrappedDocument));

    try {
      yield put({
        type: "demo/issuingDocument",
      });

      const signer = yield select(getSigner);
      yield call(publishDocument, documentStoreAddress, wrappedDocument, signer);
      yield put(issueDocumentSuccess());
    } catch (e) {
      if (e instanceof Error) {
        yield put(issueDocumentFailure(e.message));
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(wrapDocumentFailure(e.message));
    }
  }
}

export default [
  takeEvery("demo/updateDemoDocument", verifyDemoDocument),
  takeLatest("demo/updateDemoCreateStatusToForm", prepareDemoDocument),
  takeLatest("demo/updateDemoCreateStatusToIssue", issueDemoDocument),
];
