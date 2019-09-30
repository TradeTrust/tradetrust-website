import * as dnsprove from "@govtechsg/dnsprove";
import * as verify from "@govtechsg/oa-verify";
import * as openattestation from "@govtechsg/open-attestation";
import {
  isIssuerIdentityVerified,
  getIssuersIdentities,
  verifyDocument,
  issuersIdentitiesAllVerified
} from "./index";

jest.mock("@govtechsg/dnsprove");
jest.mock("@govtechsg/oa-verify");
jest.mock("@govtechsg/open-attestation");

const whenVerifySucceed = () =>
  verify.mockResolvedValue({
    hash: { valid: true },
    issued: {
      valid: true,
      issued: {
        "0xA": true
      }
    },
    revoked: {
      valid: true,
      revoked: {
        "0xA": false
      }
    },
    valid: true
  });

const whenVerifyFailed = () =>
  verify.mockResolvedValue({
    hash: { valid: true },
    issued: {
      valid: true,
      issued: {
        "0xA": true
      }
    },
    revoked: {
      valid: false,
      revoked: {
        "0xA": true
      }
    },
    valid: false
  });

const whenGetDataReturnsDocument = () => {
  openattestation.getData.mockReturnValue({
    issuers: [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com", type: "DNS-TXT" }
      },
      {
        documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        identityProof: { location: "domain2.com", type: "DNS-TXT" }
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
// const whenGetIssuersI

describe("isIssuerIdentityVerified", () => {
  it("returns true when there is a matching DNS record", async () => {
    whenDnsProveResolvesBothAddresses();
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(true);
  });

  it("returns false when matching DNS record does not exist", async () => {
    whenDnsProveResolvesAddress1();
    const issuer = {
      documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(false);
  });

  it("throws when the type does not exist", async () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "FOO-BAR",
        location: "example.openattestation.com"
      }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(false);
  });

  it("throws when the location does not exist", async () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: { type: "DNS-TXT" }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(false);
  });
});

describe("getIssuersIdentities", () => {
  it("returns identities given a list of issuers", async () => {
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();
    const issuers = [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com", type: "DNS-TXT" }
      },
      {
        documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        identityProof: { location: "domain2.com", type: "DNS-TXT" }
      }
    ];
    const expectedResults = [
      {
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];
    const identities = await getIssuersIdentities(issuers);
    expect(identities).toEqual(expectedResults);
  });

  it("throws when any issuers is not correctly formatted", () => {
    const issuers = [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com" }
      }
    ];
    const identities = getIssuersIdentities(issuers);
    expect(identities).rejects.toThrow("not supported");
  });
});

describe("verifyDocument", () => {
  it("returns true as overall valid when all the checks passes", async () => {
    whenVerifySucceed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toEqual({
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
            dns: "domain1.com",
            smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
          },
          {
            dns: "domain2.com",
            smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
          }
        ]
      },
      valid: true
    });
  });

  it("returns true as overall valid when all the checks passes", async () => {
    whenVerifyFailed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toEqual({
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
            dns: "domain1.com",
            smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
          },
          {
            dns: "domain2.com",
            smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
          }
        ]
      },
      valid: false
    });
  });
});

describe("issuersIdentitiesAllVerified", () => {
  it("should reduce the issuer identities to true if all the identities resolves", () => {
    const validIdentities = [
      {
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];
    expect(issuersIdentitiesAllVerified(validIdentities)).toBe(true);
  });

  it("should reduce the issuer identities to false if any of the identities is invalid", () => {
    const validIdentities = [
      {
        dns: undefined,
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];
    expect(issuersIdentitiesAllVerified(validIdentities)).toBe(false);
  });
});
