export const initialState = {
  adminAddress: "",
  isAdminAddressLoading: false
};

// Actions
export const types = {
  NETWORK_RESET: "NETWORK_RESET", // For network change

  LOADING_ADMIN_ADDRESS: "LOADING_ADMIN_ADDRESS",
  LOADING_ADMIN_ADDRESS_SUCCESS: "LOADING_ADMIN_ADDRESS_SUCCESS",
  LOADING_ADMIN_ADDRESS_FAILURE: "LOADING_ADMIN_ADDRESS_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.NETWORK_RESET:
      return {
        ...initialState
      };
    case types.LOADING_ADMIN_ADDRESS_FAILURE:
      return {
        ...state,
        adminAddress: "",
        isAdminAddressLoading: false
      };
    case types.LOADING_ADMIN_ADDRESS_SUCCESS:
      return {
        ...state,
        adminAddress: action.payload,
        isAdminAddressLoading: false
      };
    case types.LOADING_ADMIN_ADDRESS:
      return {
        ...state,
        isAdminAddressLoading: true
      };
    default:
      return state;
  }
}

// Action Creators
export function loadAdminAddress() {
  return {
    type: types.LOADING_ADMIN_ADDRESS
  };
}

// Selectors
export function getAdminAddress(store) {
  return store.admin.adminAddress;
}
