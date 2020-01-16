import { put, select, takeEvery, all, call } from "redux-saga/effects";
import { types } from "../reducers/token";
import { getCertificate } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import {
  transferTokenOwnershipSuccess,
  transferTokenOwnershipFailure,
  getTokenUserAddressSuccess,
  getTokenUserAddressError
} from "../reducers/token";
import {
  transferTokenOwnership,
  getBeneficiaryAddress,
  getHolderAddress,
  getApprovedBeneficiaryAddress
} from "../services/token";

const { trace } = getLogger("saga:token");

export function* getTokenUsers() {
  try {
    const document = yield select(getCertificate);
    const [beneficiaryAddress, holderAddress, approvedBeneficiaryAddress] = yield all([
      call(getBeneficiaryAddress, document),
      call(getHolderAddress, document),
      call(getApprovedBeneficiaryAddress, document)
    ]);
    trace(
      `Beneficiary Address is: ${beneficiaryAddress} and Holder Address is: ${holderAddress} and Approved Target Address is: ${approvedBeneficiaryAddress}`
    );

    yield put(getTokenUserAddressSuccess({ beneficiaryAddress, holderAddress, approvedBeneficiaryAddress }));
  } catch (e) {
    yield put(getTokenUserAddressError(e.message));
  }
}

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

export default [
  takeEvery(types.TRANSFER_TOKEN_OWNERSHIP, transferOwnership),
  takeEvery(types.GET_TOKEN_USER_ADDRESS, getTokenUsers)
];
