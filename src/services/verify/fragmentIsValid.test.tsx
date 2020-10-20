import { isValid as isValidFromUpstream, VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "./fragments";

jest.mock("@govtechsg/oa-verify");

const mockIsValid = isValidFromUpstream as jest.Mock;
mockIsValid.mockResolvedValue(true);

describe("isValid", () => {
  it("should work with document with only valid issuers using one dns-txt", () => {
    const dnsTxtFragment: VerificationFragment = {
      name: "OpenAttestationDnsTxt",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "VALID",
          location: "example.openattestation.com",
          value: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        },
      ],
      status: "VALID",
    };
    const dnsDidFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsDid",
      reason: { code: 0, codeString: "SKIPPED", message: "Document was not issued using DNS-DID" },
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(true);
  });

  it("should work with document with only valid issuers using multiple dns-txt", () => {
    const dnsTxtFragment: VerificationFragment = {
      name: "OpenAttestationDnsTxt",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "VALID",
          location: "example.openattestation.com",
          value: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        },
        {
          status: "VALID",
          location: "example2.openattestation.com",
          value: "0x2f60375e8144e16Adf1979936301D8341D58C36D",
        },
      ],
      status: "VALID",
    };
    const dnsDidFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsDid",
      reason: { code: 0, codeString: "SKIPPED", message: "Document was not issued using DNS-DID" },
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(true);
  });

  it("should work with document with only valid issuers using one dns-did", () => {
    const dnsTxtFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsTxt",
      reason: {
        code: 2,
        codeString: "SKIPPED",
        message:
          'Document issuers doesn\'t have "documentStore" / "tokenRegistry" property or doesn\'t use DNS-TXT type',
      },
    };
    const dnsDidFragment: VerificationFragment = {
      name: "OpenAttestationDnsDid",
      type: "ISSUER_IDENTITY",
      data: [
        {
          location: "donotverify.testing.openattestation.com",
          key: "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
          status: "VALID",
        },
      ],
      status: "VALID",
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(true);
  });

  it("should work with document with only valid issuers using multiple dns-did", () => {
    const dnsTxtFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsTxt",
      reason: {
        code: 2,
        codeString: "SKIPPED",
        message:
          'Document issuers doesn\'t have "documentStore" / "tokenRegistry" property or doesn\'t use DNS-TXT type',
      },
    };
    const dnsDidFragment: VerificationFragment = {
      name: "OpenAttestationDnsDid",
      type: "ISSUER_IDENTITY",
      data: [
        {
          location: "donotverify.testing.openattestation.com",
          key: "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
          status: "VALID",
        },
        {
          location: "donotverify2.testing.openattestation.com",
          key: "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
          status: "VALID",
        },
      ],
      status: "VALID",
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(true);
  });

  it("should not work with document with invalid issuers using dns-txt", () => {
    const dnsTxtFragment: VerificationFragment = {
      name: "OpenAttestationDnsTxt",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "INVALID",
          location: "example.openattestation.com",
          value: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        },
      ],
      status: "INVALID",
    };
    const dnsDidFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsDid",
      reason: { code: 0, codeString: "SKIPPED", message: "Document was not issued using DNS-DID" },
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(false);
  });

  it("should not work with document with invalid issuers using dns-did", () => {
    const dnsTxtFragment: VerificationFragment = {
      status: "SKIPPED",
      type: "ISSUER_IDENTITY",
      name: "OpenAttestationDnsTxt",
      reason: {
        code: 2,
        codeString: "SKIPPED",
        message:
          'Document issuers doesn\'t have "documentStore" / "tokenRegistry" property or doesn\'t use DNS-TXT type',
      },
    };
    const dnsDidFragment: VerificationFragment = {
      name: "OpenAttestationDnsDid",
      type: "ISSUER_IDENTITY",
      data: [
        {
          location: "donotverify.testing.openattestation.com",
          key: "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
          status: "INVALID",
        },
      ],
      status: "INVALID",
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(false);
  });

  it("should not work with document with issuers using both dns-txt & dns-did (stricter condition)", () => {
    const dnsTxtFragment: VerificationFragment = {
      name: "OpenAttestationDnsTxt",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "VALID",
          location: "example.openattestation.com",
          value: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        },
        {
          status: "SKIPPED",
        },
      ],
      status: "VALID",
    };
    const dnsDidFragment: VerificationFragment = {
      name: "OpenAttestationDnsDid",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "SKIPPED",
        },
        {
          location: "donotverify2.testing.openattestation.com",
          key: "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
          status: "VALID",
        },
      ],
      status: "VALID",
    };
    expect(isValid([dnsTxtFragment, dnsDidFragment])).toBe(false);
  });
});
