import * as dnsprove from "@govtechsg/dnsprove";
import verify from "@govtechsg/oa-verify";
import * as openattestation from "@govtechsg/open-attestation";
import { verifyDocument } from "./index";

jest.mock("@govtechsg/dnsprove");
jest.mock("@govtechsg/oa-verify");
jest.mock("@govtechsg/open-attestation");

const falsyResult = {
  hash: {
    checksumMatch: true
  },
  issued: {
    issuedOnAll: true,
    details: [
      {
        address: "0xA",
        issued: true
      }
    ]
  },
  revoked: {
    revokedOnAny: true,
    details: [
      {
        address: "0xA",
        revoked: true
      }
    ]
  },
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        identified: true,
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ]
  },
  valid: false
};

const truthyResult = {
  hash: {
    checksumMatch: true
  },
  issued: {
    issuedOnAll: true,
    details: [
      {
        address: "0xA",
        issued: true
      }
    ]
  },
  revoked: {
    revokedOnAny: false,
    details: [
      {
        address: "0xA",
        revoked: false
      }
    ]
  },
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        identified: true,
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ]
  },
  valid: true
};

const whenVerifySucceed = () =>
  verify.mockResolvedValue({
    hash: { checksumMatch: true },
    issued: {
      issuedOnAll: true,
      details: [{ address: "0xA", issued: true }]
    },
    revoked: {
      revokedOnAny: false,
      details: [
        {
          address: "0xA",
          revoked: false
        }
      ]
    },
    valid: true
  });

const whenVerifyFailed = () =>
  verify.mockResolvedValue({
    hash: { checksumMatch: true },
    issued: {
      issuedOnAll: true,
      details: [{ address: "0xA", issued: true }]
    },
    revoked: {
      revokedOnAny: true,
      details: [
        {
          address: "0xA",
          revoked: true
        }
      ]
    },
    valid: false
  });

const whenGetDataReturnsDocument = (modifiedIssuerRecord = {}) => {
  openattestation.getData.mockReturnValue({
    issuers: [
      {
        ...{
          documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
          identityProof: { location: "domain1.com", type: "DNS-TXT" }
        },
        ...modifiedIssuerRecord
      },
      {
        documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        identityProof: { location: "domain2.com", type: "DNS-TXT" }
      }
    ],
    foo: "bar"
  });
};

const whenGetDataReturnsDocument1 = (modifiedIssuerRecord = {}) => {
  openattestation.getData.mockReturnValue({
    issuers: [
      {
        ...{
          documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
          identityProof: { location: "domain2.com", type: "DNS-TXT" }
        },
        ...modifiedIssuerRecord
      }
    ],
    foo: "bar"
  });
};

const whenDnsProveResolvesAddress1 = () => {
  dnsprove.getDocumentStoreRecords.mockResolvedValueOnce([
    {
      type: "openatts",
      net: "ethereum",
      netId: "3",
      addr: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      dnssec: true
    }
  ]);
};

const whenDnsProveResolvesBothAddresses = () => {
  dnsprove.getDocumentStoreRecords.mockResolvedValueOnce([
    {
      type: "openatts",
      net: "ethereum",
      netId: "3",
      addr: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      dnssec: true
    },
    {
      type: "openatts",
      net: "ethereum",
      netId: "3",
      addr: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
      dnssec: true
    }
  ]);
};

describe("verifyDocument", () => {
  it("returns true as overall valid when all the checks passes", async () => {
    whenVerifySucceed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toEqual(truthyResult);
  });

  it("returns false as overall valid when any of the checks fail", async () => {
    whenVerifyFailed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toEqual(falsyResult);
  });
});
describe("resolveIssuerIdentity", () => {
  it("returns invalid when matching DNS record does not exist", async () => {
    whenGetDataReturnsDocument1();
    whenDnsProveResolvesAddress1();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults.identity.identifiedOnAll).toEqual(false);
    expect(verificationResults.valid).toEqual(false);
  });

  it("returns error when matching DNS record does not exist", async () => {
    whenGetDataReturnsDocument1({ identityProof: { type: "FOO-TXT" } });

    const verificationResults = await verifyDocument("RAW_DOCUMENT");

    expect(verificationResults.identity.identifiedOnAll).toEqual(false);
    expect(verificationResults.valid).toEqual(false);
    expect(verificationResults.identity.details).toEqual([
      {
        identified: false,
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        error: "Identity type not supported"
      }
    ]);
  });

  it("throws error when location does not exist", async () => {
    whenGetDataReturnsDocument1({
      identityProof: { location: "", type: "DNS-TXT" }
    });

    const verificationResults = await verifyDocument("RAW_DOCUMENT");

    expect(verificationResults.identity.identifiedOnAll).toEqual(false);
    expect(verificationResults.valid).toEqual(false);
    expect(verificationResults.identity.details).toEqual([
      {
        identified: false,
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        error: "Location is missing"
      }
    ]);
  });
});

describe("getIssuersIdentities", () => {
  it("returns identities given a list of issuers", async () => {
    whenVerifySucceed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const expectedResults = [
      {
        identified: true,
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        identified: true,
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toEqual(truthyResult);
    expect(verificationResults.identity.details).toEqual(expectedResults);
  });

  it("includes error when any issuers is not correctly formatted", async () => {
    whenDnsProveResolvesAddress1();
    const issuers = {
      identityProof: { location: "domain1.com" }
    };
    whenGetDataReturnsDocument(issuers);
    const expectedResults = [
      {
        identified: false,
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        error: "Identity type not supported"
      },
      {
        identified: false,
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults.identity.identifiedOnAll).toEqual(false);
    expect(verificationResults.identity.details).toEqual(expectedResults);
  });
});
