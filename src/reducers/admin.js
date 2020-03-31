export const initialState = {
  adminAddress: "",
  metamaskAccountError: false,
  metamaskNotFound: false,
  isAdminAddressLoading: false,
};

// Actions
export const types = {
  NETWORK_RESET: "NETWORK_RESET", // For network change

  LOADING_ADMIN_ADDRESS: "LOADING_ADMIN_ADDRESS",
  LOADING_ADMIN_ADDRESS_SUCCESS: "LOADING_ADMIN_ADDRESS_SUCCESS",
  LOADING_ADMIN_ADDRESS_FAILURE: "LOADING_ADMIN_ADDRESS_FAILURE",
  METAMASK_NOT_FOUND: "METAMASK_NOT_FOUND",
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.NETWORK_RESET:
      return {
        ...initialState,
      };
    case types.LOADING_ADMIN_ADDRESS_FAILURE:
      return {
        ...state,
        adminAddress: "",
        metamaskAccountError: true,
        metamaskNotFound: false,
        isAdminAddressLoading: false,
      };
    case types.METAMASK_NOT_FOUND:
      return {
        ...state,
        adminAddress: "",
        metamaskAccountError: false,
        metamaskNotFound: true,
        isAdminAddressLoading: false,
      };
    case types.LOADING_ADMIN_ADDRESS_SUCCESS:
      return {
        ...state,
        adminAddress: action.payload,
        isAdminAddressLoading: false,
      };
    case types.LOADING_ADMIN_ADDRESS:
      return {
        ...state,
        metamaskAccountError: false,
        metamaskNotFound: false,
        isAdminAddressLoading: true,
      };
    default:
      return state;
  }
}

// Action Creators
export function loadAdminAddress() {
  return {
    type: types.LOADING_ADMIN_ADDRESS,
  };
}

// Selectors
export function getAdminAddress(store) {
  return store.admin.adminAddress;
}
