const initialState = {
  addressBeneficiary: '',
  addressHolder: '',
  tokenOwnershipTransferPending: false,
  tokenOwnershipTransferSuccess: false,
  tokenOwnershipTransferError: false
};
// Actions
export const types = {
  GET_USER_TOKEN_ADDRESS: "GET_USER_TOKEN_ADDRESS",
  GET_USER_TOKEN_ADDRESS_SUCCESS: "GET_USER_TOKEN_ADDRESS_SUCCESS",
  GET_USER_TOKEN_ADDRESS_ERROR: "GET_USER_TOKEN_ADDRESS_ERROR",
  TRANSFER_TOKEN_OWNERSHIP: "TRANSFER_TOKEN_OWNERSHIP",
  TRANSFER_TOKEN_OWNERSHIP_SUCCESS: "TRANSFER_TOKEN_OWNERSHIP_SUCCESS",
  TRANSFER_TOKEN_OWNERSHIP_ERROR: "TRANSFER_TOKEN_OWNERSHIP_ERROR"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case types.GET_USER_TOKEN_ADDRESS:
    //   return {
    //     ...state,
    //     addressBeneficiary: false,
    //     GET_USER_TOKEN_ADDRESS: action.payload
    //   };
    // case types.GET_USER_TOKEN_ADDRESS_SUCCESS:
    //   return {
    //     ...state,
    //     addressBeneficiary: false,
    //     GET_USER_TOKEN_ADDRESS_SUCCESS: action.payload
    //   };
    case types.TRANSFER_TOKEN_OWNERSHIP:
      return {
        ...state,
        tokenOwnershipTransferPending: true,
        tokenOwnershipTransferSuccess: false,
        tokenOwnershipTransferError: false
      };
    case types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS:
      return {
        ...state,
        tokenOwnershipTransferPending: false,
        tokenOwnershipTransferSuccess: action.payload
      };
    case types.TRANSFER_TOKEN_OWNERSHIP_ERROR:
      return {
        ...state,
        tokenOwnershipTransferPending: false,
        tokenOwnershipTransferError: action.payload
      };
    default:
      return state;
  }
}

export const getUserTokenAddress = payload => ({
  type: types.GET_USER_TOKEN_ADDRESS,
  payload
});

export const getUserTokenAddressSuccess = payload => ({
  type: types.GET_USER_TOKEN_ADDRESS_SUCCESS,
  payload
});

export const getUserTokenAddressError = payload => ({
  type: types.GET_USER_TOKEN_ADDRESS_ERROR,
  payload
});

export const transferTokenOwnership = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP,
  payload
});

export const transferTokenOwnershipSuccess = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS,
  payload
});

export const transferTokenOwnershipFailure = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP_ERROR,
  payload
});
