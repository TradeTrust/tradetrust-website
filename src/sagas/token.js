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
import { transferTokenOwnership, getBeneficiaryAddress, initializeToken, getHolderAddress } from "../services/token";
import { getProvider } from "../services/etherjs";

const { trace } = getLogger("saga:token");

export function* getTokenUsers() {
  try {
    const document = yield select(getCertificate);
    const [beneficiaryAddress, holderAddress] = yield all([
      call(getBeneficiaryAddress, document),
      call(getHolderAddress, document)
    ]);
    trace(`Beneficiary Address is: ${beneficiaryAddress} and Holder Address is: ${holderAddress}`);

    yield put(getTokenUserAddressSuccess({ beneficiaryAddress, holderAddress }));
  } catch (e) {
    yield put(getTokenUserAddressError(e.message));
  }
}

export function* initializeToken() {
  try {
    const document = yield select(getCertificate);
    const {provider, signer} = yield getProvider();
    trace(`Web3 provider: ${JSON.stringify(provider)}`);
    yield initializeToken(document, provider, signer);
    yield put(initializeTokenSuccess());
  } catch(e) {
    yield put(initializeTokenFailure(e.message));
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
  takeEvery(types.INITIALIZE_TOKEN, initializeToken),
  takeEvery(types.TRANSFER_TOKEN_OWNERSHIP, transferOwnership),
  takeEvery(types.GET_TOKEN_USER_ADDRESS, getTokenUsers)
];
