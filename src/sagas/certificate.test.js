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
import { history } from "../history";

jest.mock("../history", () => ({ history: { push: jest.fn() } }));

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

/**
 * A real signed credential, used wherever the saga needs a DOCUMENT.
 *
 * These tests previously passed `Promise.resolve(<verifier response>)` here, which was wrong
 * twice over: getCertificate is a SELECTOR, so `yield select()` handed the saga the Promise
 * itself rather than its value, and the value was a fragment array rather than a document. Every
 * document predicate therefore read false and getKeyId threw, aborting the run with SERVER_ERROR
 * — invisibly, because each test only asserted dispatches that happen before that point.
 */
const documentToVerify = JSON.parse(
  require("fs").readFileSync(
    require("path").join(__dirname, "../test/fixture/w3c/presentations/valid/two_credentials.json"),
    "utf8"
  )
).verifiableCredential[0];

/** getCertificate is a selector: its return value is used as-is, so it must not be a Promise. */
const mockCertificate = (document) => jest.spyOn(certificate, "getCertificate").mockImplementation(() => document);

describe("verifyCertificate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    isTransferableRecord.mockReturnValue(false);
    isObligationRecord.mockReturnValue(false);
  });

  it("should verify the document and change the router to /viewer when verification passes", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    const getCertificate = mockCertificate(documentToVerify);
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
    // The test is named for this; it previously asserted nothing about it.
    expect(history.push).toHaveBeenCalledWith("/viewer");
    expect(dispatched.map((action) => action.type)).not.toContain(certificate.types.VERIFYING_CERTIFICATE_FAILURE);
  });

  it("should verify the document and do not update the router when verification fails", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    const getCertificate = mockCertificate(documentToVerify);
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
    expect(history.push).not.toHaveBeenCalled();
  });

  it("dispatches V5 version detection for an obligation document without probing isTokenRegistryV4", async () => {
    const initialAction = { type: certificate.types.UPDATE_CERTIFICATE };
    mockCertificate(documentToVerify);
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
    mockCertificate(documentToVerify);
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

describe("verifyCertificate — Verifiable Presentation", () => {
  const fs = require("fs");
  const path = require("path");
  const loadVp = (name) =>
    JSON.parse(fs.readFileSync(path.join(__dirname, "../test/fixture/w3c/presentations", name), "utf8"));

  const runWith = async (document) => {
    mockCertificate(document);
    jest.spyOn(verify, "verifyDocument").mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    return recordSaga(verifyCertificate, { type: certificate.types.UPDATE_CERTIFICATE });
  };

  const schemaOf = (dispatched) => dispatched.find((a) => a.type === certificate.types.UPDATE_DOCUMENT_SCHEMA)?.payload;

  beforeEach(() => {
    jest.resetAllMocks();
    isTransferableRecord.mockReturnValue(false);
    isObligationRecord.mockReturnValue(false);
  });

  it("tags a v2.0 presentation envelope by its own data model", async () => {
    expect(schemaOf(await runWith(loadVp("valid/two_credentials.json")))).toBe(certificate.DOCUMENT_SCHEMA.W3C_VP_2_0);
  });

  it("tags a v1.1 presentation envelope", async () => {
    const vp = loadVp("valid/two_credentials.json");
    vp["@context"] = ["https://www.w3.org/2018/credentials/v1"];
    expect(schemaOf(await runWith(vp))).toBe(certificate.DOCUMENT_SCHEMA.W3C_VP_1_1);
  });

  it("does not mistake a presentation for a credential", async () => {
    const schema = schemaOf(await runWith(loadVp("valid/two_credentials.json")));
    expect(schema).not.toBe(certificate.DOCUMENT_SCHEMA.W3C_VC_2_0);
    expect(schema).not.toBe(certificate.DOCUMENT_SCHEMA.OA_V2);
  });

  it("gets through verification without throwing on a presentation", async () => {
    // getKeyId reaches getOpenAttestationData, which without its presentation guard falls
    // through to OpenAttestation's getDocumentData and throws — failing the whole run.
    const dispatched = await runWith(loadVp("valid/two_credentials.json"));
    expect(dispatched).toContainEqual({
      type: certificate.types.VERIFYING_CERTIFICATE_COMPLETED,
      payload: whenDocumentValidAndIssuedByDns,
    });
    expect(dispatched.map((a) => a.type)).not.toContain(certificate.types.VERIFYING_CERTIFICATE_FAILURE);
  });

  it("still tags a plain credential as a credential", async () => {
    const [credential] = loadVp("valid/two_credentials.json").verifiableCredential;
    expect(schemaOf(await runWith(credential))).toBe(certificate.DOCUMENT_SCHEMA.W3C_VC_2_0);
  });
});
