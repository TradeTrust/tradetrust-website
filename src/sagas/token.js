import { put, select, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/token";
import { getCertificate } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import { transferTokenOwnershipSuccess, transferTokenOwnershipFailure } from "../reducers/token";
import { transferTokenOwnership } from "../services/token";

const { trace } = getLogger("saga:token");

export function* transferOwnership({ payload }) {
  try {
    const document = yield select(getCertificate);
    const { newTokenOwner } = payload;
    const transferStatus = yield transferTokenOwnership(document, newTokenOwner);
    trace(`Transfer Status: ${JSON.stringify(transferStatus)}`);

    yield put(transferTokenOwnershipSuccess(transferStatus));
  } catch (e) {
    yield put(transferTokenOwnershipFailure(e.message));
  }
}

export default [takeEvery(types.TRANSFER_TOKEN_OWNERSHIP, transferOwnership)];
