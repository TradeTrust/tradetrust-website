import { put, select, takeLatest, call } from "redux-saga/effects";

import {
  deployDocStoreSuccess,
  deployDocStoreFailure,
  createTempDnsSuccess,
  createTempDnsFailure,
  getDocumentStoreAddress,
  getTempDns,
  wrapDocumentSuccess,
  wrapDocumentFailure,
  issueDocumentSuccess,
  getWrappedDocument as getDemoWrappedDocument,
  issueDocumentFailure,
} from "../reducers/demo-create";
import { createTempDns, deployDocumentStore, getWrappedDocument, publishDocument } from "../services/create";
import { Signer } from "ethers";

export function* deployDemoDocStore({ payload }: { payload: Signer; type: string }): any {
  try {
    const signer = payload;

    const documentStoreAddress = yield call(deployDocumentStore, signer, "DEMO_STORE");
    yield put(deployDocStoreSuccess(documentStoreAddress));
  } catch (e) {
    if (e instanceof Error) {
      yield put(deployDocStoreFailure(e.message));
    }
  }
}

export function* createDemoTempDns(): any {
  try {
    yield put({
      type: "demo-create/creatingTempDns",
    });
    const documentStoreAddress = yield select(getDocumentStoreAddress);
    const tempDns = yield call(createTempDns, documentStoreAddress);

    yield put(createTempDnsSuccess(tempDns));
  } catch (e) {
    if (e instanceof Error) {
      yield put(createTempDnsFailure(e.message));
    }
  }
}

export function* wrapDemoDocument({ payload }: { payload: Record<string, any>; type: string }): any {
  try {
    const demoFormValues = payload;
    const documentStoreAddress = yield select(getDocumentStoreAddress);
    const tempDns = yield select(getTempDns);

    const wrappedDocument = yield call(getWrappedDocument, documentStoreAddress, demoFormValues, tempDns);

    yield put(wrapDocumentSuccess(wrappedDocument));
  } catch (e) {
    if (e instanceof Error) {
      yield put(wrapDocumentFailure(e.message));
    }
  }
}

export function* issueDemoDocument({ payload }: { payload: Signer; type: string }): any {
  try {
    const documentStoreAddress = yield select(getDocumentStoreAddress);
    const wrappedDocument = yield select(getDemoWrappedDocument);

    const signer = payload;

    yield call(publishDocument, documentStoreAddress, wrappedDocument, signer);
    yield put(issueDocumentSuccess());
  } catch (e) {
    if (e instanceof Error) {
      yield put(issueDocumentFailure(e.message));
    }
  }
}

export default [
  takeLatest("demo-create/deployingDocStore", deployDemoDocStore),
  takeLatest("demo-create/deployDocStoreSuccess", createDemoTempDns),
  takeLatest("demo-create/wrappingDocument", wrapDemoDocument),
  takeLatest("demo-create/issuingDocument", issueDemoDocument),
];
