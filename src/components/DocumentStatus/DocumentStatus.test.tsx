import React from "react";
import { render } from "@testing-library/react";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { DocumentStatus, IssuedBy } from "./DocumentStatus";
import {
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentIssuerIdentityInvalidDid,
} from "../../test/fixture/verifier-responses";
import { MESSAGES } from "../../constants/VerificationErrorMessages";

describe("IssuedBy", () => {
  it("should return appropriate display text when single dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "abc.com",
          },
        ],
      },
    ] as VerificationFragment[];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText("ABC.COM")).not.toBeNull();
  });

  it("should return appropriate display text when multiple dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "abc.com",
          },
          {
            status: "VALID",
            location: "xyz.com",
          },
          {
            status: "VALID",
            location: "demo.com",
          },
        ],
      },
    ] as VerificationFragment[];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText("ABC.COM, XYZ.COM and DEMO.COM")).not.toBeNull();
  });

  it("should return did identity if is verified with did", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsDidIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "abc.com",
          },
        ],
      },
    ] as VerificationFragment[];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText("ABC.COM")).not.toBeNull();
  });

  it("should return did identity if is verified with did", () => {
    const sampleDidIdentity = "did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89";
    const fragments = [
      {
        name: "OpenAttestationDidIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            did: sampleDidIdentity,
          },
        ],
      },
    ] as VerificationFragment[];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText(sampleDidIdentity.toUpperCase())).not.toBeNull();
  });
});

describe("DocumentStatus", () => {
  it("should display hash error if the hash is invalid", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentHashInvalid as VerificationFragment[]} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeNull();
  });

  it("displays issuing error if the document is not issued", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentNotIssued as VerificationFragment[]} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeNull();
  });

  it("displays identity error if the dns txt identity is not verified", () => {
    const container = render(
      <DocumentStatus verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[]} />
    );
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).not.toBeNull();
  });

  it("displays identity error if the did identity is not verified", () => {
    const container = render(
      <DocumentStatus verificationStatus={whenDocumentIssuerIdentityInvalidDid as VerificationFragment[]} />
    );
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).not.toBeNull();
  });

  it("displays error in all fields when all verification fail", () => {
    const container = render(
      <DocumentStatus verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]} />
    );
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).not.toBeNull();
  });
});
