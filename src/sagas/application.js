import { put, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/application";
import { getProvider } from "../services/etherjs";

export function* updateNetworkId() {
  try {
    const { provider } = yield getProvider();
    const network = yield provider.getNetwork();
    if (!network) throw new Error("Can not detect metamask network.");

    yield put({
      type: types.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        networkId: network.chainId,
        networkIdVerbose: network.name,
      },
    });
  } catch (e) {
    console.error(e); // eslint-disable-line
    yield put({
      type: types.UPDATE_NETWORK_ID_FAILURE,
      payload: e,
    });
  }
}

export default [takeEvery(types.UPDATE_NETWORK_ID, updateNetworkId), takeEvery(types.UPDATE_WEB3, updateNetworkId)];
