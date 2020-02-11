import { put, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/admin";

import getAccounts from "../services/etherjs/accounts";

import { getProvider } from "../services/etherjs";
import { getLogger } from "../utils/logger";

const { error } = getLogger("admin.js:");

export function* loadAdminAddress() {
  try {
    const { provider } = yield getProvider();
    const accounts = yield getAccounts(provider);

    if (!accounts || !accounts.length || accounts.length === 0) throw new Error("Accounts not found");
    yield put({
      type: types.LOADING_ADMIN_ADDRESS_SUCCESS,
      payload: accounts[0]
    });
  } catch (e) {
    if (e.message === "Accounts not found") {
      return yield put({
        type: types.LOADING_ADMIN_ADDRESS_FAILURE,
        payload: e.message
      });
    }
    console.log("here it is");
    yield put({
      type: types.METAMASK_NOT_FOUND,
      payload: e.message
    });
    error("loadAdminAddress:", e);
  }
}

export default [takeEvery(types.LOADING_ADMIN_ADDRESS, loadAdminAddress)];
