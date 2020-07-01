export const initialState = {
  networkId: null,
  networkIdVerbose: "",
};

// Actions
export const types = {
  UPDATE_WEB3: "UPDATE_WEB3",
  UPDATE_NETWORK_ID: "UPDATE_NETWORK_ID",
  UPDATE_NETWORK_ID_SUCCESS: "UPDATE_NETWORK_ID_SUCCESS",
  UPDATE_NETWORK_ID_FAILURE: "UPDATE_NETWORK_ID_FAILURE",
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_WEB3:
      return {
        ...state,
        network: action.payload.network,
      };
    case types.UPDATE_NETWORK_ID:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: true,
        currentBlockNumber: 0,
        currentBlockContents: undefined,
      };
    case types.UPDATE_NETWORK_ID_SUCCESS:
      return {
        ...state,
        networkId: action.payload.networkId,
        networkIdVerbose: action.payload.networkIdVerbose,
        networkUpdatePending: false,
      };
    case types.UPDATE_NETWORK_ID_FAILURE:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: false,
      };
    default:
      return state;
  }
}

// Action Creators
export function updateWeb3(payload) {
  return {
    type: types.UPDATE_WEB3,
    payload,
  };
}

export function updateNetworkId() {
  return {
    type: types.UPDATE_NETWORK_ID,
  };
}

// Selectors
export function getNetworkPending(store) {
  return store.application.networkUpdatePending;
}

export function getNetworkId(store) {
  return store.application.networkId;
}
