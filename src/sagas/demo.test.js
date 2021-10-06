import * as demo from "../reducers/demo";
import * as verify from "../services/verify";
import * as create from "../services/create";
import { verifyDemoDocument, prepareDemoDocument, issueDemoDocument, deployDemoDocStore } from "./demo";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";
import { runSaga } from "redux-saga";

async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      getState: () => ({ demo: { rawModifiedDocument: "DEMO_DOCUMENT_OBJECT" } }),
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}

describe("prepareDemoDocument", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should deploy document store and create temp dns", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToForm" };

    const getSigner = jest.spyOn(demo, "getSigner").mockImplementation(() => ({
      signer: "SIGNER",
    }));

    jest.spyOn(create, "deployDocumentStore").mockImplementation(() => Promise.resolve("0x1234567890"));
    jest.spyOn(create, "createTempDns").mockImplementation(() => Promise.resolve("pink-little-turtle"));

    const dispatched = await recordSaga(prepareDemoDocument, initialAction);

    expect(getSigner).toHaveBeenCalledTimes(1);

    expect(dispatched).toStrictEqual([
      { type: "demo/deployingDocStore" },
      { type: "demo/deployDocStoreSuccess", payload: "0x1234567890" },
      { type: "demo/creatingTempDns" },
      { type: "demo/createTempDnsSuccess", payload: "pink-little-turtle" },
    ]);
  });

  it("should dispatch deployDocStoreFailure when deployment fails", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToForm" };

    jest.spyOn(demo, "getSigner").mockImplementation(() => ({
      signer: "SIGNER",
    }));

    jest.spyOn(create, "deployDocumentStore").mockImplementation(() => Promise.reject(new Error("ERROR_MESSAGE")));

    const dispatched = await recordSaga(prepareDemoDocument, initialAction);

    expect(dispatched).toStrictEqual([
      { type: "demo/deployingDocStore" },
      { type: "demo/deployDocStoreFailure", payload: "ERROR_MESSAGE" },
    ]);
  });

  it("should dispatch createTempDnsFailure when createTempDns fails", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToForm" };

    jest.spyOn(demo, "getSigner").mockImplementation(() => ({
      signer: "SIGNER",
    }));

    jest.spyOn(create, "deployDocumentStore").mockImplementation(() => Promise.resolve("0x1234567890"));
    jest.spyOn(create, "createTempDns").mockImplementation(() => Promise.reject(new Error("ERROR_MESSAGE")));

    const dispatched = await recordSaga(prepareDemoDocument, initialAction);

    expect(dispatched).toStrictEqual([
      { type: "demo/deployingDocStore" },
      { type: "demo/deployDocStoreSuccess", payload: "0x1234567890" },
      { type: "demo/creatingTempDns" },
      { type: "demo/createTempDnsFailure", payload: "ERROR_MESSAGE" },
    ]);
  });
});

describe("issueDemoDocument", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should wrap and issue the document", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToIssue", issueDemoDocument };

    const getDocumentStoreAddress = jest
      .spyOn(demo, "getDocumentStoreAddress")
      .mockImplementation(() => "0x1234567890");

    const getTempDns = jest.spyOn(demo, "getTempDns").mockImplementation(() => "pink-little-turtle");

    const getDemoFormValues = jest.spyOn(demo, "getDemoFormValues").mockImplementation(() => ({}));

    jest.spyOn(create, "getWrappedDocument").mockImplementation(() => Promise.resolve({ name: "WRAPPED_DOCUMENT" }));

    const getSigner = jest.spyOn(demo, "getSigner").mockImplementation(() => ({
      signer: "SIGNER",
    }));

    jest.spyOn(create, "publishDocument").mockImplementation(() => Promise.resolve());

    const dispatched = await recordSaga(issueDemoDocument, initialAction);
    expect(getDocumentStoreAddress).toHaveBeenCalledTimes(1);
    expect(getTempDns).toHaveBeenCalledTimes(1);
    expect(getDemoFormValues).toHaveBeenCalledTimes(1);
    expect(getSigner).toHaveBeenCalledTimes(1);
    expect(dispatched).toStrictEqual([
      { type: "demo/wrappingDocument" },
      {
        type: "demo/wrapDocumentSuccess",
        payload: { name: "WRAPPED_DOCUMENT" },
      },
      { type: "demo/issuingDocument" },
      { type: "demo/issueDocumentSuccess", payload: undefined },
    ]);
  });

  it("should dispatch wrapDocumentFailure when wrapDocument fails", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToIssue", issueDemoDocument };

    jest.spyOn(demo, "getDocumentStoreAddress").mockImplementation(() => "0x1234567890");

    jest.spyOn(demo, "getTempDns").mockImplementation(() => "pink-little-turtle");

    jest.spyOn(demo, "getDemoFormValues").mockImplementation(() => ({}));

    jest.spyOn(create, "getWrappedDocument").mockImplementation(() => Promise.reject(new Error("ERROR_MESSAGE")));

    const dispatched = await recordSaga(issueDemoDocument, initialAction);

    expect(dispatched).toStrictEqual([
      { type: "demo/wrappingDocument" },
      {
        type: "demo/wrapDocumentFailure",
        payload: "ERROR_MESSAGE",
      },
    ]);
  });

  it("should dispatch issueDocumentFailure when publishDocument fails", async () => {
    const initialAction = { type: "demo/updateDemoCreateStatusToIssue", issueDemoDocument };

    jest.spyOn(demo, "getDocumentStoreAddress").mockImplementation(() => "0x1234567890");

    jest.spyOn(demo, "getTempDns").mockImplementation(() => "pink-little-turtle");

    jest.spyOn(demo, "getDemoFormValues").mockImplementation(() => ({}));

    jest.spyOn(create, "getWrappedDocument").mockImplementation(() => Promise.resolve({ name: "WRAPPED_DOCUMENT" }));

    jest.spyOn(demo, "getSigner").mockImplementation(() => ({
      signer: "SIGNER",
    }));

    jest.spyOn(create, "publishDocument").mockImplementation(() => Promise.reject(new Error("ERROR_MESSAGE")));

    const dispatched = await recordSaga(issueDemoDocument, initialAction);

    expect(dispatched).toStrictEqual([
      { type: "demo/wrappingDocument" },
      {
        type: "demo/wrapDocumentSuccess",
        payload: { name: "WRAPPED_DOCUMENT" },
      },
      { type: "demo/issuingDocument" },
      { type: "demo/issueDocumentFailure", payload: "ERROR_MESSAGE" },
    ]);
  });
});

describe("verifyDemoDocument", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should verify the document and change the router to /demoViewer when verification passes", async () => {
    const initialAction = { type: "demo/updateDemoDocument" };

    const getDemoDocument = jest
      .spyOn(demo, "getDemoDocument")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));

    jest.spyOn(verify, "verifyDocument").mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));

    const dispatched = await recordSaga(verifyDemoDocument, initialAction);

    expect(getDemoDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: "demo/verifyDemoDocumentCompleted",
      payload: whenDocumentValidAndIssuedByDns,
    });

    //TODO: test for path as it will redirect to /demoViewer if success
  });

  it("should verify the document and dont update the router when verification fails", async () => {
    const initialAction = { type: "demo/updateDemoDocument" };
    const getDemoDocument = jest
      .spyOn(demo, "getDemoDocument")
      .mockImplementation(() => Promise.resolve(whenDocumentHashInvalidAndNotIssued));
    jest
      .spyOn(verify, "verifyDocument")
      .mockImplementation(() => Promise.reject(new Error("Failed to verify document")));
    const dispatched = await recordSaga(verifyDemoDocument, initialAction);

    expect(getDemoDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: "demo/verifyDemoDocumentFailure",
      payload: "Failed to verify document",
    });
  });
});
