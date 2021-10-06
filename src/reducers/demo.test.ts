import {
  initialState as defaultInitialState,
  demo,
  resetDemoState,
  updateDemoDocument,
  verifyingDemoDocument,
  verifyDemoDocumentCompleted,
  verifyDemoDocumentFailure,
  updateSigner,
  updateDemoCreateStatusToStart,
  updateDemoCreateStatusToForm,
  updateDemoCreateStatusToReview,
  updateDemoCreateStatusToIssue,
  deployDocStoreSuccess,
  deployDocStoreFailure,
  deployingDocStore,
  creatingTempDns,
  createTempDnsSuccess,
  createTempDnsFailure,
  updateDemoFormValues,
  wrappingDocument,
  wrapDocumentSuccess,
  wrapDocumentFailure,
  issuingDocument,
  issueDocumentSuccess,
  issueDocumentFailure,
} from "./demo";

describe("demo", () => {
  let initialState: any;
  beforeEach(() => {
    initialState = { ...defaultInitialState };
  });

  it("should set the correct state when updateSigner is called", () => {
    const finalState = {
      ...initialState,
      signer: { signer: "demo" },
    };

    const state = demo(initialState, updateSigner({ signer: "demo" }));

    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToStart is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "start",
    };

    const state = demo(initialState, updateDemoCreateStatusToStart());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToForm is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "form",
    };

    const state = demo(initialState, updateDemoCreateStatusToForm());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToReview is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "review",
    };

    const state = demo(initialState, updateDemoCreateStatusToReview());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToIssue is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "issue",
    };

    const state = demo(initialState, updateDemoCreateStatusToIssue());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when deployingDocStore is called", () => {
    const finalState = {
      ...initialState,
      deploymentDocStoreStatus: "pending",
    };

    const state = demo(initialState, deployingDocStore());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when deployDocStoreSuccess is called", () => {
    const finalState = {
      ...initialState,
      documentStoreAddress: "0xfbb61b8b98a59fbc4bd79c23212addbefaeb289f",
      deploymentDocStoreStatus: "success",
    };

    const state = demo(initialState, deployDocStoreSuccess("0xfbb61b8b98a59fbc4bd79c23212addbefaeb289f"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when deployDocStoreFailure is called", () => {
    const finalState = {
      ...initialState,
      deploymentDocStoreError: "Error: some error message",
      deploymentDocStoreStatus: "failure",
    };

    const state = demo(initialState, deployDocStoreFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when creatingTempDns is called", () => {
    const finalState = {
      ...initialState,
      createTempDnsStatus: "pending",
    };

    const state = demo(initialState, creatingTempDns());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when createTempDnsSuccess is called", () => {
    const finalState = {
      ...initialState,
      tempDns: "cool-pink-rabbit",
      createTempDnsStatus: "success",
    };

    const state = demo(initialState, createTempDnsSuccess("cool-pink-rabbit"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when createTempDnsFailure is called", () => {
    const finalState = {
      ...initialState,
      createTempDnsError: "Error: some error message",
      createTempDnsStatus: "failure",
    };

    const state = demo(initialState, createTempDnsFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when wrappingDocument is called", () => {
    const finalState = {
      ...initialState,
      wrapDocumentStatus: "pending",
    };

    const state = demo(initialState, wrappingDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when wrapDocumentSuccess is called", () => {
    const finalState = {
      ...initialState,
      wrappedDocument: { name: "WRAPPED_DOCUMENT" },
      wrapDocumentStatus: "success",
    };

    const state = demo(initialState, wrapDocumentSuccess({ name: "WRAPPED_DOCUMENT" }));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when wrapDocumentFailure is called", () => {
    const finalState = {
      ...initialState,
      wrapDocumentError: "Error: some error message",
      wrapDocumentStatus: "failure",
    };

    const state = demo(initialState, wrapDocumentFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when issuingDocument is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentStatus: "pending",
    };

    const state = demo(initialState, issuingDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when issueDocumentSuccess is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentStatus: "success",
    };

    const state = demo(initialState, issueDocumentSuccess());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when issueDocumentFailure is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentError: "Error: some error message",
      issueDocumentStatus: "failure",
    };

    const state = demo(initialState, issueDocumentFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when updateDemoFormValues is called", () => {
    const finalState = {
      ...initialState,
      demoFormValues: {
        ...initialState.demoFormValues,
        documentName: "DOCUMENT_NAME",
        exporterDetails: {
          ...initialState.demoFormValues.exporterDetails,
          exporterCountry: "JAPAN",
        },
        importerDetails: {
          ...initialState.demoFormValues.importerDetails,
          importerAddress: {
            ...initialState.demoFormValues.importerDetails.importerAddress,
            line1: "IMPORTER_ADDRESS_LINE_1",
          },
        },
        descriptionOfGoods: {
          ...initialState.demoFormValues.descriptionOfGoods,
          hsCode: "123456789",
        },
      },
    };

    const state1 = demo(initialState, updateDemoFormValues({ documentName: "DOCUMENT_NAME" }));
    const state2 = demo(
      state1,
      updateDemoFormValues({
        exporterDetails: {
          ...initialState.demoFormValues.exporterDetails,
          exporterCountry: "JAPAN",
        },
      })
    );
    const state3 = demo(
      state2,
      updateDemoFormValues({
        importerDetails: {
          ...initialState.demoFormValues.importerDetails,
          importerAddress: {
            ...initialState.demoFormValues.importerDetails.importerAddress,
            line1: "IMPORTER_ADDRESS_LINE_1",
          },
        },
      })
    );
    const state4 = demo(
      state3,
      updateDemoFormValues({
        descriptionOfGoods: {
          ...initialState.demoFormValues.descriptionOfGoods,
          hsCode: "123456789",
        },
      })
    );

    expect(state4).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when updateDemoDocument is called", () => {
    const finalState = {
      ...initialState,
      rawDocument: "demoDocument",
      rawModifiedDocument: "demoDocument",
    };
    const state = demo(initialState, updateDemoDocument("demoDocument"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyingDemoDocument is called", () => {
    const finalState = {
      ...initialState,
      verificationPending: true,
    };
    const state = demo(initialState, verifyingDemoDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyDemoDocumentCompleted is called", () => {
    const finalState = {
      ...initialState,
      verificationStatus: "completed",
    };
    const state = demo(initialState, verifyDemoDocumentCompleted("completed"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when verifyDemoDocumentFailure is called", () => {
    const finalState = {
      ...initialState,
      verificationError: "failed",
    };
    const state = demo(initialState, verifyDemoDocumentFailure("failed"));
    expect(state).toStrictEqual(finalState);
  });

  it("should reset the state when resetDemoDocument is called", () => {
    const action1 = demo(initialState, updateDemoDocument("demoDocument"));
    const action2 = demo(action1, verifyingDemoDocument());
    const action3 = demo(action2, verifyDemoDocumentCompleted("completed"));
    const action4 = demo(action3, verifyDemoDocumentFailure("failed"));
    const resetState = demo(action4, resetDemoState());
    expect(resetState).toStrictEqual(initialState);
  });
});
