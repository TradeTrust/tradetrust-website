import { decryptString } from "@govtechsg/oa-encryption";
import { errorMessages, getTokenId, getTokenRegistryAddress, isTransferableRecord, isValid } from "@trustvc/trustvc";
import { race, call, put, delay, select, takeEvery } from "redux-saga/effects";
import { history } from "../history";
import {
  detectingTRV4Certificate,
  getCertificate,
  types,
  verifyingCertificateCompleted,
  verifyingCertificateFailure,
} from "../reducers/certificate";
import { processQrCode } from "../services/qrProcessor";
import { verifyDocument } from "../services/verify";
import { getLogger } from "../utils/logger";
import { isTokenRegistryV4 } from "../utils/shared";
import { ActionPayload } from "./../types";

const { trace } = getLogger("saga:certificate");

const { TYPES } = errorMessages;

export function* verifyCertificate(): any {
  let certificate;
  let isTransferableAssetVal;
  let registryAddress;
  let tokenId;

  try {
    certificate = yield select(getCertificate);
    yield put({
      type: types.VERIFYING_CERTIFICATE,
    });

    isTransferableAssetVal = isTransferableRecord(certificate);
    if (isTransferableAssetVal) {
      registryAddress = getTokenRegistryAddress(certificate);
      tokenId = getTokenId(certificate);
    }
  } catch (e) {
    yield put(verifyingCertificateFailure(TYPES.VERIFICATION_ERROR));
    return;
  }

  try {
    if (isTransferableAssetVal && registryAddress && tokenId) {
      const { tokenRegistryV4, timeout } = yield race({
        tokenRegistryV4: call(isTokenRegistryV4, registryAddress, tokenId),
        timeout: delay(5 * 1000), // 5-second timeout
      });

      if (timeout) {
        yield put(verifyingCertificateFailure(TYPES.SERVER_ERROR));
        return;
      }

      if (tokenRegistryV4) {
        yield put(detectingTRV4Certificate(TYPES.INVALID));
        return;
      }
    }
  } catch (e) {
    yield put(verifyingCertificateFailure(TYPES.SERVER_ERROR));
    return;
  }

  try {
    const verificationStatus = yield verifyDocument(certificate);
    trace(`Verification Status: ${JSON.stringify(verificationStatus)}`);

    yield put(verifyingCertificateCompleted(verificationStatus));
    if (isValid(verificationStatus)) {
      yield history.push("/viewer");
    }
  } catch (e) {
    yield put(verifyingCertificateFailure(TYPES.VERIFICATION_ERROR));
    return;
  }
}

export function* handleQrScanned({ payload: qrCode }: { type: string; payload: any }): any {
  try {
    const { payload, anchor } = yield processQrCode(qrCode);

    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION,
      payload,
      anchor,
    });
  } catch (e) {
    yield put(verifyingCertificateFailure(TYPES.CLIENT_NETWORK_ERROR));
  }
}

interface RetrieveCertificateByAction {
  type: string;
  payload: ActionPayload;
  anchor: { key: string };
}

export function* retrieveCertificateByAction({ payload, anchor }: RetrieveCertificateByAction): any {
  try {
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING,
    });

    const { uri, key: payloadKey } = payload;
    const { key: anchorKey } = anchor;
    const key = anchorKey || payloadKey; // https://github.com/TradeTrust/tradetrust-website/pull/397

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

    // will only decrypt if type is `OPEN-ATTESTATION-TYPE-1`, so far only oa-encryption uses this
    if (certificate.type === "OPEN-ATTESTATION-TYPE-1") {
      if (key) {
        const decryptedCertificate = decryptString({
          tag: certificate.tag,
          cipherText: certificate.cipherText,
          iv: certificate.iv,
          key,
          type: certificate.type,
        });
        certificate = JSON.parse(decryptedCertificate);
      } else {
        throw new Error(`Unable to decrypt certificate with key=${key} and type=${certificate.type}`);
      }
    }

    yield put({
      type: types.UPDATE_CERTIFICATE,
      payload: certificate,
    });
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS,
    });
  } catch (e) {
    if (e instanceof Error) {
      yield put({
        type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
        payload: e.message,
      });
    }
  }
}

export default [
  takeEvery(types.CERTIFICATE_PROCESS_QR_CODE, handleQrScanned),
  takeEvery(types.UPDATE_CERTIFICATE, verifyCertificate),
  takeEvery(types.RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
];
