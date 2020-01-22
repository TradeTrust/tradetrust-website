import reducer, { initialState, types } from "./token";

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it("should handle GET_TOKEN_USER_ADDRESS", () => {
    const action = {
      type: types.GET_TOKEN_USER_ADDRESS
    };
    const prevState = {};

    const expectedState = {
      getTokenUsersAddressPending: false,
      getTokenUsersAddressSuccess: false,
      getTokenUsersAddressError: false,
      isEscrowContract: false
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });

  it("should handle GET_TOKEN_USER_ADDRESS_SUCCESS", () => {
    const action = {
      type: types.GET_TOKEN_USER_ADDRESS_SUCCESS,
      payload: {
        beneficiaryAddress: "0xA",
        holderAddress: "0xB",
        approvedBeneficiaryAddress: "0aC"
      }
    };
    const prevState = {};

    const expectedState = {
      getTokenUsersAddressPending: false,
      getTokenUsersAddressSuccess: true,
      beneficiaryAddress: "0xA",
      holderAddress: "0xB",
      approvedBeneficiaryAddress: "0aC"
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });

  it("should handle GET_TOKEN_USER_ADDRESS_ERROR", () => {
    const action = {
      type: types.GET_TOKEN_USER_ADDRESS_ERROR,
      payload: true
    };
    const prevState = {};

    const expectedState = {
      getTokenUsersAddressPending: false,
      getTokenUsersAddressError: true
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });

  it("should handle TRANSFER_TOKEN_OWNERSHIP", () => {
    const action = {
      type: types.TRANSFER_TOKEN_OWNERSHIP
    };
    const prevState = {};

    const expectedState = {
      tokenOwnershipTransferPending: true,
      tokenOwnershipTransferSuccess: false,
      tokenOwnershipTransferError: false
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });

  it("should handle TRANSFER_TOKEN_OWNERSHIP_SUCCESS", () => {
    const action = {
      type: types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS,
      payload: true
    };
    const prevState = {};

    const expectedState = {
      tokenOwnershipTransferPending: false,
      tokenOwnershipTransferSuccess: true
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });

  it("should handle TRANSFER_TOKEN_OWNERSHIP_ERROR", () => {
    const action = {
      type: types.TRANSFER_TOKEN_OWNERSHIP_ERROR,
      payload: true
    };
    const prevState = {};

    const expectedState = {
      tokenOwnershipTransferPending: false,
      tokenOwnershipTransferError: true
    };
    expect(reducer(prevState, action)).toStrictEqual(expectedState);
  });
});
