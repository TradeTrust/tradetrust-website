import { get, partition, compact } from "lodash";
import { put, all, call, select, takeEvery } from "redux-saga/effects";
import { getData, verifySignature } from "@govtechsg/open-attestation";
import { isValidAddress as isEthereumAddress } from "ethereumjs-util";
import Router from "next/router";
import { getDocumentStoreRecords } from "@govtechsg/dnsprove";
import { getLogger } from "../utils/logger";
import {
  types,
  verifyingCertificateIssuerSuccess,
  verifyingCertificateIssuerFailure,
  verifyingCertificateRevocationSuccess,
  verifyingCertificateRevocationFailure,
  verifyingCertificateIssuedSuccess,
  verifyingCertificateIssuedFailure,
  verifyingCertificateHashSuccess,
  verifyingCertificateHashFailure,
  verifyingCertificateStoreSuccess,
  verifyingCertificateStoreFailure,
  verifyingCertificateSuccess,
  verifyingCertificateFailure,
  getCertificate
} from "../reducers/certificate";
import { types as applicationTypes } from "../reducers/application";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";
import { combinedHash } from "../utils";
import { ensResolveAddress } from "../services/ens";
import sendEmail from "../services/email";
import { processQrCode } from "../services/qrProcessor";
import { analyticsEvent } from "../components/Analytics";
import verify from "@govtechsg/oa-verify";
import { getSelectedWeb3 } from "./application";
import { IS_MAINNET, NETWORK_NAME } from "../config";
import { getIssuersIdentities } from "../services/verify";
const { trace, error } = getLogger("saga:certificate");

export function* verifyCertificate() {
  yield put({
    type: types.VERIFYING_CERTIFICATE
  });
  const certificate = yield select(getCertificate);
  const certificateData = yield getData(certificate);

  // Get status on hash, issuance and revocation
  console.log("Verifying on", NETWORK_NAME);
  const vertificationStatus = yield verify(certificate, NETWORK_NAME);
  trace(`oa-verify: ${JSON.stringify(vertificationStatus)}`);

  // Get status on identity
  const identities = yield getIssuersIdentities(certificateData.issuers);
  const allIdentified = identities.reduce(
    (prev, curr) => prev && !!curr.dns,
    true
  );

  // Finally determine if validation passes
  const verified = vertificationStatus.valid && allIdentified;

  if (verified) {
    yield put(verifyingCertificateSuccess());
    // Temporarily putting verifyingCertificateIssuerSuccess here.
    // Can pass the identity into verifyingCertificateSuccess and have it update the state
    yield put(
      verifyingCertificateIssuerSuccess({
        issuerIdentities: identities
      })
    );
    Router.push("/viewer");
  } else {
    // Should pass in failure reasons from vertificationStatus and identities
    // to allow component consuming those results to figure out what failed
    yield put(verifyingCertificateFailure());
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

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
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
  takeEvery(applicationTypes.UPDATE_WEB3, networkReset)
];
