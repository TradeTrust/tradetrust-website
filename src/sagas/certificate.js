import { put, select, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import { getLogger } from "../utils/logger";
import {
  types,
  verifyingCertificateSuccess,
  verifyingCertificateFailure,
  getCertificate
} from "../reducers/certificate";
import { types as applicationTypes } from "../reducers/application";
import sendEmail from "../services/email";
import { processQrCode } from "../services/qrProcessor";
import { verifyDocument } from "../services/verify";

const { trace } = getLogger("saga:certificate");

export function* verifyCertificate() {
  try {
    yield put({
      type: types.VERIFYING_CERTIFICATE
    });

    const certificate = yield select(getCertificate);
    const verificationStatus = yield verifyDocument(certificate);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    // Instead of success/failure, report completeness
    yield put(verifyingCertificateSuccess(verificationStatus));
    if (verificationStatus.valid) {
      yield put(push("/viewer"));
    }
  } catch (e) {
    yield put(verifyingCertificateFailure(e.message));
  }
}

export function* sendCertificate({ payload }) {
  try {
    const certificate = yield select(getCertificate);
    const { email, captcha } = payload;
    const success = yield sendEmail({
      certificate,
      email,
      captcha
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put({
      type: types.SENDING_CERTIFICATE_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.SENDING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* handleQrScanned({ payload: qrCode }) {
  const document = yield processQrCode(qrCode);
  yield put({
    type: types.UPDATE_CERTIFICATE,
    payload: document
  });
}

export default [
  takeEvery(types.CERTIFICATE_PROCESS_QR_CODE, handleQrScanned),
  takeEvery(types.UPDATE_CERTIFICATE, verifyCertificate),
  takeEvery(types.SENDING_CERTIFICATE, sendCertificate),
];
