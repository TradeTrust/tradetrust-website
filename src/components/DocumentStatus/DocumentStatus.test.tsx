import React from "react";
import { render } from "@testing-library/react";
import { DocumentStatus, IssuedBy } from "./DocumentStatus";
import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalid,
  whenDocumentHashInvalidAndNotIssued,
} from "../../test/fixture/verifier-responses";
import { MESSAGES } from "../../constants/VerificationErrorMessages";

describe("IssuedBy", () => {
  it("should return appropriate display text when single dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxt",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "abc.com",
          },
        ],
      },
    ];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText("ABC.COM")).not.toBeNull();
  });

  it("should return appropriate display text when multiple dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxt",
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
    ];
    const container = render(<IssuedBy verificationStatus={fragments} />);
    expect(container.queryByText("ABC.COM, XYZ.COM and DEMO.COM")).not.toBeNull();
  });
});

describe("DocumentStatus", () => {
  it("should display hash error if the hash is invalid", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentHashInvalid as any} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["REVOKED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeNull();
  });

  it("displays issuing error if the document is not issued", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentNotIssued as any} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["REVOKED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeNull();
  });

  it("displays revocation error if the document is revoked", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentRevoked as any} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["REVOKED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeNull();
  });

  it("displays identity error if the identity is not verified", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentIssuerIdentityInvalid as any} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["REVOKED"]["failureTitle"])).toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).not.toBeNull();
  });

  it("displays error in all fields when all verification fail", () => {
    const container = render(<DocumentStatus verificationStatus={whenDocumentHashInvalidAndNotIssued as any} />);
    expect(container.queryByText(MESSAGES["HASH"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["ISSUED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["REVOKED"]["failureTitle"])).not.toBeNull();
    expect(container.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).not.toBeNull();
  });
});
