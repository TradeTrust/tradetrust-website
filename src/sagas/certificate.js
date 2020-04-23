import { put, select, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import { getLogger } from "../utils/logger";
import {
  types,
  verifyingCertificateCompleted,
  verifyingCertificateFailure,
  getCertificate,
} from "../reducers/certificate";
import { types as applicationTypes } from "../reducers/application";
import { sendEmail } from "../services/email/sendEmail";
import { processQrCode } from "../services/qrProcessor";
import { verifyDocument } from "../services/verify";
import { isValid } from "../services/verify/fragments";
import { decryptString } from "@govtechsg/oa-encryption";

const { trace } = getLogger("saga:certificate");

export function* verifyCertificate() {
  try {
    yield put({
      type: types.VERIFYING_CERTIFICATE,
    });

    const certificate = yield select(getCertificate);
    const verificationStatus = yield verifyDocument(certificate);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    // Instead of success/failure, report completeness
    yield put(verifyingCertificateCompleted(verificationStatus));
    if (isValid(verificationStatus)) {
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
      captcha,
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put({
      type: types.SENDING_CERTIFICATE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.SENDING_CERTIFICATE_FAILURE,
      payload: e.message,
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET,
  });
}

export function* handleQrScanned({ payload: qrCode }) {
  try {
    const document = yield processQrCode(qrCode);
    yield put({
      type: types.UPDATE_CERTIFICATE,
      payload: document,
    });
  } catch (e) {
    yield put(verifyingCertificateFailure(e.message));
  }
}

export function* retrieveCertificateByAction({ payload: { uri, key } }) {
  try {
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING,
    });

    // if a key has been provided, let's assume
    let certificate = yield window.fetch(uri).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error(`Unable to load the certificate from ${uri}`);
      }
      return response.json();
    });
    certificate = certificate.document || certificate; // opencerts-function returns the document in a nested document object

    if (!certificate) {
      throw new Error(`Certificate at address ${uri} is empty`);
    }
    // if there is a key and the type is "OPEN-ATTESTATION-TYPE-1", let's use oa-encryption
    if (key && certificate.type === "OPEN-ATTESTATION-TYPE-1") {
      certificate = JSON.parse(
        decryptString({
          tag: certificate.tag,
          cipherText: certificate.cipherText,
          iv: certificate.iv,
          key,
          type: certificate.type,
        })
      );
    } else if (key || certificate.type) {
      throw new Error(`Unable to decrypt certificate with key=${key} and type=${certificate.type}`);
    }

    yield put({
      type: types.UPDATE_CERTIFICATE,
      payload: certificate,
    });
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
      payload: e.message,
    });
  }
}

export default [
  takeEvery(types.CERTIFICATE_PROCESS_QR_CODE, handleQrScanned),
  takeEvery(types.UPDATE_CERTIFICATE, verifyCertificate),
  takeEvery(types.SENDING_CERTIFICATE, sendCertificate),
  takeEvery(applicationTypes.UPDATE_WEB3, networkReset),
  takeEvery(types.RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
];
