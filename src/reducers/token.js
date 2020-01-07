const initialState = {
  initializeTokenPending: false,
  initializeTokenSuccess: false,
  initializeTokenError: false,
  tokenOwnershipTransferPending: false,
  tokenOwnershipTransferSuccess: false,
  tokenOwnershipTransferError: false
};
// Actions
export const types = {
  INITIALIZE_TOKEN: "INITIALIZE_TOKEN",
  INITIALIZE_TOKEN_SUCCESS: "INITIALIZE_TOKEN_SUCCESS",
  INITIALIZE_TOKEN_ERROR: "INITIALIZE_TOKEN_ERROR",
  TRANSFER_TOKEN_OWNERSHIP: "TRANSFER_TOKEN_OWNERSHIP",
  TRANSFER_TOKEN_OWNERSHIP_SUCCESS: "TRANSFER_TOKEN_OWNERSHIP_SUCCESS",
  TRANSFER_TOKEN_OWNERSHIP_ERROR: "TRANSFER_TOKEN_OWNERSHIP_ERROR"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE_TOKEN:
      return {
        ...state,
        initializeTokenPending: true,
        initializeTokenSuccess: false,
        initializeTokenError: false
      };
    case types.INITIALIZE_TOKEN_SUCCESS:
      return {
        ...state,
        initializeTokenPending: false,
        initializeTokenSuccess: action.payload
      };
    case types.INITIALIZE_TOKEN_ERROR:
      return {
        ...state,
        initializeTokenPending: false,
        initializeTokenError: action.payload
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
        tokenOwnershipTransferSuccess: true
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

export const initializeToken = () => ({
  type: types.INITIALIZE_TOKEN,
});

export const initializeTokenSuccess = () => ({
  type: types.INITIALIZE_TOKEN_SUCCESS
});

export const initializeTokenFailure = payload => ({
  type: types.INITIALIZE_TOKEN_ERROR,
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
