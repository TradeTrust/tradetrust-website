import {
  demoMagicWallet,
  resetDemoMagicDocument,
  updateDemoMagicDocument,
  verifyingDemoMagicDocument,
  verifyDemoMagicDocumentCompleted,
  verifyDemoMagicDocumentFailure,
} from "./demoMagicWallet";

describe("demoMagicWallet", () => {
  let initialState: any;
  beforeEach(() => {
    initialState = {
      rawDocument: null,
      rawModifiedDocument: null,
      verificationPending: false,
      verificationStatus: null,
      verificationError: null,
    };
  });

  it("should set the correct state from payload when updateDemoDocument is called", () => {
    const finalState = {
      rawDocument: "demoDocument",
      rawModifiedDocument: "demoDocument",
      verificationPending: false,
      verificationStatus: null,
      verificationError: null,
    };
    const state = demoMagicWallet(initialState, updateDemoMagicDocument("demoDocument"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyingDemoDocument is called", () => {
    const finalState = {
      rawDocument: null,
      rawModifiedDocument: null,
      verificationPending: true,
      verificationStatus: null,
      verificationError: null,
    };
    const state = demoMagicWallet(initialState, verifyingDemoMagicDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyDemoDocumentCompleted is called", () => {
    const finalState = {
      rawDocument: null,
      rawModifiedDocument: null,
      verificationPending: false,
      verificationStatus: "completed",
      verificationError: null,
    };
    const state = demoMagicWallet(initialState, verifyDemoMagicDocumentCompleted("completed"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyDemoDocumentFailure is called", () => {
    const finalState = {
      rawDocument: null,
      rawModifiedDocument: null,
      verificationPending: false,
      verificationStatus: null,
      verificationError: "failed",
    };
    const state = demoMagicWallet(initialState, verifyDemoMagicDocumentFailure("failed"));
    expect(state).toStrictEqual(finalState);
  });

  it("should reset the state when resetDemoDocument is called", () => {
    const action1 = demoMagicWallet(initialState, updateDemoMagicDocument("demoDocument"));
    const action2 = demoMagicWallet(action1, verifyingDemoMagicDocument());
    const action3 = demoMagicWallet(action2, verifyDemoMagicDocumentCompleted("completed"));
    const action4 = demoMagicWallet(action3, verifyDemoMagicDocumentFailure("failed"));
    const resetState = demoMagicWallet(action4, resetDemoMagicDocument());
    expect(resetState).toStrictEqual(initialState);
  });
});
