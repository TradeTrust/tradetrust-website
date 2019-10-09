import * as dnsprove from "@govtechsg/dnsprove";
import verify from "@govtechsg/oa-verify";
import * as openattestation from "@govtechsg/open-attestation";
import { resolveIssuerIdentity, getIssuersIdentities, verifyDocument, issuersIdentitiesAllVerified } from "./index";

jest.mock("@govtechsg/dnsprove");
jest.mock("@govtechsg/oa-verify");
jest.mock("@govtechsg/open-attestation");

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

describe("resolveIssuerIdentity", () => {
  it("returns correctly when there is a matching DNS record", async () => {
    whenDnsProveResolvesBothAddresses();
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await resolveIssuerIdentity(issuer);
    expect(identified).toStrictEqual({
      identified: true,
      dns: "example.openattestation.com",
      smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
    });
  });

  it("returns correctly when matching DNS record does not exist", async () => {
    whenDnsProveResolvesAddress1();
    const issuer = {
      documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await resolveIssuerIdentity(issuer);
    expect(identified).toStrictEqual({
      identified: false,
      smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
    });
  });

  it("return error when the type does not exist", async () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "FOO-BAR",
        location: "example.openattestation.com"
      }
    };
    const identified = await resolveIssuerIdentity(issuer);
    expect(identified).toStrictEqual({
      error: "Identity type not supported",
      identified: false,
      smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
    });
  });

  it("throws when the location does not exist", async () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: { type: "DNS-TXT" }
    };
    const identified = await resolveIssuerIdentity(issuer);
    expect(identified).toStrictEqual({
      error: "Location is missing",
      identified: false,
      smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
    });
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
    const identities = await getIssuersIdentities(issuers);
    expect(identities).toStrictEqual(expectedResults);
  });

  it("includes error when any issuers is not correctly formatted", async () => {
    whenDnsProveResolvesAddress1();
    const issuers = [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com" }
      },
      {
        documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        identityProof: { location: "domain2.com", type: "DNS-TXT" }
      }
    ];
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
    const identities = await getIssuersIdentities(issuers);
    expect(identities).toStrictEqual(expectedResults);
  });
});

describe("verifyDocument", () => {
  it("returns true as overall valid when all the checks passes", async () => {
    whenVerifySucceed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toStrictEqual({
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
    });
  });

  it("returns false as overall valid when any of the checks fail", async () => {
    whenVerifyFailed();
    whenGetDataReturnsDocument();
    whenDnsProveResolvesBothAddresses();
    whenDnsProveResolvesBothAddresses();

    const verificationResults = await verifyDocument("RAW_DOCUMENT");
    expect(verificationResults).toStrictEqual({
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
    });
  });
});

describe("issuersIdentitiesAllVerified", () => {
  it("should reduce the issuer identities to true if all the identities resolves", () => {
    const validIdentities = [
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
    expect(issuersIdentitiesAllVerified(validIdentities)).toBe(true);
  });

  it("should reduce the issuer identities to false if any of the identities is invalid", () => {
    const validIdentities = [
      {
        identified: false,
        dns: undefined,
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        identified: true,
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];
    expect(issuersIdentitiesAllVerified(validIdentities)).toBe(false);
  });
});
