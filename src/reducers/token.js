export const initialState = {
  beneficiaryAddress: "",
  holderAddress: "",
  approvedBeneficiaryAddress: "",
  getTokenUsersAddressPending: false,
  getTokenUsersAddressSuccess: false,
  getTokenUsersAddressError: false,
  tokenOwnershipTransferPending: false,
  tokenOwnershipTransferSuccess: false,
  tokenOwnershipTransferError: false
};

// Actions
export const types = {
  GET_TOKEN_USER_ADDRESS: "GET_TOKEN_USER_ADDRESS",
  GET_TOKEN_USER_ADDRESS_SUCCESS: "GET_TOKEN_USER_ADDRESS_SUCCESS",
  GET_TOKEN_USER_ADDRESS_ERROR: "GET_TOKEN_USER_ADDRESS_ERROR",
  TRANSFER_TOKEN_OWNERSHIP: "TRANSFER_TOKEN_OWNERSHIP",
  TRANSFER_TOKEN_OWNERSHIP_SUCCESS: "TRANSFER_TOKEN_OWNERSHIP_SUCCESS",
  TRANSFER_TOKEN_OWNERSHIP_ERROR: "TRANSFER_TOKEN_OWNERSHIP_ERROR"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TOKEN_USER_ADDRESS:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressSuccess: false,
        getTokenUsersAddressError: false
      };
    case types.GET_TOKEN_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressSuccess: true,
        beneficiaryAddress: action.payload.beneficiaryAddress,
        holderAddress: action.payload.holderAddress,
        approvedBeneficiaryAddress: action.payload.approvedBeneficiaryAddress
      };
    case types.GET_TOKEN_USER_ADDRESS_ERROR:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressError: action.payload
      };
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

export const getTokenUserAddress = () => ({
  type: types.GET_TOKEN_USER_ADDRESS
});

export const getTokenUserAddressSuccess = payload => ({
  type: types.GET_TOKEN_USER_ADDRESS_SUCCESS,
  payload
});

export const getTokenUserAddressError = payload => ({
  type: types.GET_TOKEN_USER_ADDRESS_ERROR,
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
