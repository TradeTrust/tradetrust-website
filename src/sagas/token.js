import { put, select, takeEvery, all, call } from "redux-saga/effects";
import { types } from "../reducers/token";
import { getCertificate } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import {
  transferTokenOwnershipSuccess,
  transferTokenOwnershipFailure,
  getTokenUserAddressSuccess,
  getTokenUserAddressError,
  initializeTokenSuccess,
  initializeTokenFailure,
  setIsEscrowContractSuccess,
  setIsEscrowContractError,
  getApprovedEscrowUsers,
  getApprovedEscrowUsersSuccess,
  getApprovedEscrowUsersError,
} from "../reducers/token";

import {
  transferTokenOwnership,
  getBeneficiaryAddress,
  initializeTokenInstance,
  getHolderAddress,
  isEscrowContract,
  getApprovedEscrowContractAddress,
  createTokenOwnerInstance,
  getApprovedEscrowContractUsers,
} from "../services/token";
import { getProvider } from "../services/etherjs";

const { trace, error } = getLogger("saga:token");

export function* checkIfTitleEscrow(document) {
  try {
    const isTitleEscrow = yield call(isEscrowContract, document);
    if (!isTitleEscrow) throw new Error("Document owner is not a escrow contract");
    yield put(setIsEscrowContractSuccess());
    return isTitleEscrow;
  } catch (e) {
    error(`checkIfTitleEscrow: ${e}`);
    yield put(setIsEscrowContractError());
    return false;
  }
}

export function* getApprovedUserAddressess({ contractAddress }) {
  try {
    yield put(getApprovedEscrowUsers());
    const { provider } = yield getProvider();
    const { approvedBeneficiary, approvedHolder } = yield call(getApprovedEscrowContractUsers, {
      contractAddress,
      web3Provider: provider,
    });
    yield put(getApprovedEscrowUsersSuccess({ approvedBeneficiary, approvedHolder }));
  } catch (e) {
    error(`getApprovedUserAddressess: ${JSON.stringify(e)}`);
    yield put(getApprovedEscrowUsersError(e.message));
  }
}

export function* getTokenUsers() {
  try {
    const document = yield select(getCertificate);
    const isTitleEscrow = yield call(checkIfTitleEscrow, document);
    if (!isTitleEscrow) throw new Error("Can not get escrow contract users");

    const [beneficiaryAddress, holderAddress, approvedEscrowContractAddress] = yield all([
      call(getBeneficiaryAddress, document),
      call(getHolderAddress, document),
      call(getApprovedEscrowContractAddress, document),
    ]);
    trace(
      `Beneficiary Address is: ${beneficiaryAddress} and Holder Address is: ${holderAddress} and Approved Target Address is: ${approvedEscrowContractAddress}`
    );

    yield put(getTokenUserAddressSuccess({ beneficiaryAddress, holderAddress, approvedEscrowContractAddress }));
    if (approvedEscrowContractAddress) {
      yield call(getApprovedUserAddressess, { contractAddress: approvedEscrowContractAddress });
    }
  } catch (e) {
    error(`getTokenUsers: ${e}`);
    yield put(getTokenUserAddressError(e.message));
  }
}

export function* initializeToken() {
  try {
    const document = yield select(getCertificate);
    const { provider, signer } = yield getProvider();
    yield initializeTokenInstance(document, provider, signer);
    yield createTokenOwnerInstance();
    yield put(initializeTokenSuccess());
  } catch (e) {
    error(e);
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
  takeEvery(types.GET_TOKEN_USER_ADDRESS, getTokenUsers),
];
