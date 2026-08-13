import * as certificate from "../reducers/certificate";
import * as verify from "../services/verify";
import * as shared from "../utils/shared";
import { verifyCertificate } from "./certificate";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";
import { runSaga } from "redux-saga";
import {
  errorMessages,
  isTransferableRecord,
  isObligationRecord,
  getTokenId,
  getTokenRegistryAddress,
  getObligationRegistryAddress,
} from "@trustvc/trustvc";
import { TokenRegistryVersions } from "../constants";

// The compiled @trustvc/trustvc exports are non-configurable getters — jest.spyOn on them
// throws. Use a jest.mock factory instead (precedented in StatusChecks.test.tsx / useGaslessActions.test.tsx).
jest.mock("@trustvc/trustvc", () => {
  const original = jest.requireActual("@trustvc/trustvc");
  return {
    ...original,
    isTransferableRecord: jest.fn(),
    isObligationRecord: jest.fn(),
    getTokenId: jest.fn(),
    getTokenRegistryAddress: jest.fn(),
    getObligationRegistryAddress: jest.fn(),
  };
});

async function recordSaga(saga, initialAction) {
  const dispatched = [];
  await runSaga(
    {
      getState: () => ({ demo: { rawModifiedDocument: "DOCUMENT_OBJECT" } }),
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}

const { TYPES } = errorMessages;

describe("verifyCertificate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    isTransferableRecord.mockReturnValue(false);
    isObligationRecord.mockReturnValue(false);
  });

  it("should verify the document and change the router to /viewer when verification passes", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    const getCertificate = jest
      .spyOn(certificate, "getCertificate")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    const verifyDocument = jest
      .spyOn(verify, "verifyDocument")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    const dispatched = await recordSaga(verifyCertificate, initialAction);

    expect(getCertificate).toHaveBeenCalledTimes(1);
    expect(verifyDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: certificate.types.VERIFYING_CERTIFICATE_COMPLETED,
      payload: whenDocumentValidAndIssuedByDns,
    });
  });

  it("should verify the document and do not update the router when verification fails", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    const getCertificate = jest
      .spyOn(certificate, "getCertificate")
      .mockImplementation(() => Promise.resolve(whenDocumentHashInvalidAndNotIssued));
    const verifyDocument = jest
      .spyOn(verify, "verifyDocument")
      .mockImplementation(() => Promise.reject(new Error("Failed to verify document")));
    const dispatched = await recordSaga(verifyCertificate, initialAction);

    expect(getCertificate).toHaveBeenCalledTimes(1);
    expect(verifyDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: certificate.types.VERIFYING_CERTIFICATE_FAILURE,
      payload: TYPES.SERVER_ERROR,
    });
  });

  it("dispatches V5 version detection for an obligation document without probing isTokenRegistryV4", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    jest
      .spyOn(certificate, "getCertificate")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    jest.spyOn(verify, "verifyDocument").mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    const isTokenRegistryV4Spy = jest.spyOn(shared, "isTokenRegistryV4");

    isObligationRecord.mockReturnValue(true);
    getObligationRegistryAddress.mockReturnValue("0xObligationRegistryAddress");
    getTokenId.mockReturnValue("0xTokenId");

    const dispatched = await recordSaga(verifyCertificate, initialAction);

    expect(isTokenRegistryV4Spy).not.toHaveBeenCalled();
    expect(getTokenRegistryAddress).not.toHaveBeenCalled();
    expect(dispatched).toContainEqual(certificate.detectingTRCertificateVersion(TokenRegistryVersions.V5));
  });

  it("keeps classic transferable-record V4/V5 detection unchanged", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    jest
      .spyOn(certificate, "getCertificate")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    jest.spyOn(verify, "verifyDocument").mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    const isTokenRegistryV4Spy = jest
      .spyOn(shared, "isTokenRegistryV4")
      .mockImplementation(() => Promise.resolve(true));

    isTransferableRecord.mockReturnValue(true);
    getTokenRegistryAddress.mockReturnValue("0xTokenRegistryAddress");
    getTokenId.mockReturnValue("0xTokenId");

    const dispatched = await recordSaga(verifyCertificate, initialAction);

    expect(isTokenRegistryV4Spy).toHaveBeenCalledWith("0xTokenRegistryAddress", "0xTokenId");
    expect(getObligationRegistryAddress).not.toHaveBeenCalled();
    expect(dispatched).toContainEqual(certificate.detectingTRCertificateVersion(TokenRegistryVersions.V4));
  });
});
