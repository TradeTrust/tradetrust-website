import {
  initialState as defaultInitialState,
  demoCreate,
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
} from "./demo-create";

describe("demo", () => {
  let initialState: any;
  beforeEach(() => {
    initialState = { ...defaultInitialState };
  });

  it("should set the correct state when updateDemoCreateStatusToStart is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "start",
    };

    const state = demoCreate(initialState, updateDemoCreateStatusToStart());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToForm is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "form",
    };

    const state = demoCreate(initialState, updateDemoCreateStatusToForm());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToReview is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "review",
    };

    const state = demoCreate(initialState, updateDemoCreateStatusToReview());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when updateDemoCreateStatusToIssue is called", () => {
    const finalState = {
      ...initialState,
      demoCreateStatus: "issue",
    };

    const state = demoCreate(initialState, updateDemoCreateStatusToIssue());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when deployingDocStore is called", () => {
    const finalState = {
      ...initialState,
      deploymentDocStoreStatus: "pending",
    };

    const state = demoCreate(initialState, deployingDocStore());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when deployDocStoreSuccess is called", () => {
    const finalState = {
      ...initialState,
      documentStoreAddress: "0xfbb61b8b98a59fbc4bd79c23212addbefaeb289f",
      deploymentDocStoreStatus: "success",
    };

    const state = demoCreate(initialState, deployDocStoreSuccess("0xfbb61b8b98a59fbc4bd79c23212addbefaeb289f"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when deployDocStoreFailure is called", () => {
    const finalState = {
      ...initialState,
      deploymentDocStoreError: "Error: some error message",
      deploymentDocStoreStatus: "failure",
    };

    const state = demoCreate(initialState, deployDocStoreFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when creatingTempDns is called", () => {
    const finalState = {
      ...initialState,
      createTempDnsStatus: "pending",
    };

    const state = demoCreate(initialState, creatingTempDns());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when createTempDnsSuccess is called", () => {
    const finalState = {
      ...initialState,
      tempDns: "cool-pink-rabbit",
      createTempDnsStatus: "success",
    };

    const state = demoCreate(initialState, createTempDnsSuccess("cool-pink-rabbit"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when createTempDnsFailure is called", () => {
    const finalState = {
      ...initialState,
      createTempDnsError: "Error: some error message",
      createTempDnsStatus: "failure",
    };

    const state = demoCreate(initialState, createTempDnsFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when wrappingDocument is called", () => {
    const finalState = {
      ...initialState,
      wrapDocumentStatus: "pending",
    };

    const state = demoCreate(initialState, wrappingDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when wrapDocumentSuccess is called", () => {
    const finalState = {
      ...initialState,
      wrappedDocument: { name: "WRAPPED_DOCUMENT" },
      wrapDocumentStatus: "success",
    };

    const state = demoCreate(initialState, wrapDocumentSuccess({ name: "WRAPPED_DOCUMENT" }));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when wrapDocumentFailure is called", () => {
    const finalState = {
      ...initialState,
      wrapDocumentError: "Error: some error message",
      wrapDocumentStatus: "failure",
    };

    const state = demoCreate(initialState, wrapDocumentFailure("Error: some error message"));
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state when issuingDocument is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentStatus: "pending",
    };

    const state = demoCreate(initialState, issuingDocument());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when issueDocumentSuccess is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentStatus: "success",
    };

    const state = demoCreate(initialState, issueDocumentSuccess());
    expect(state).toStrictEqual(finalState);
  });

  it("should set the correct state from payload when issueDocumentFailure is called", () => {
    const finalState = {
      ...initialState,
      issueDocumentError: "Error: some error message",
      issueDocumentStatus: "failure",
    };

    const state = demoCreate(initialState, issueDocumentFailure("Error: some error message"));
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

    const state1 = demoCreate(initialState, updateDemoFormValues({ documentName: "DOCUMENT_NAME" }));
    const state2 = demoCreate(
      state1,
      updateDemoFormValues({
        exporterDetails: {
          ...initialState.demoFormValues.exporterDetails,
          exporterCountry: "JAPAN",
        },
      })
    );
    const state3 = demoCreate(
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
    const state4 = demoCreate(
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
});
