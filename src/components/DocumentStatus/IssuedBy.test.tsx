import { render, screen } from "@testing-library/react";
import { v2, wrapOADocument } from "@trustvc/trustvc";
import React from "react";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { IssuedBy } from "./IssuedBy";

describe("IssuedBy", () => {
  let document: WrappedOrSignedOpenAttestationDocument;

  beforeAll(async () => {
    document = await wrapOADocument({
      issuers: [
        {
          name: "John",
          documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
          identityProof: {
            type: v2.IdentityProofType.DNSTxt,
            location: "example.com",
          },
        },
      ],
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
  });

  const renderIssuedBy = (verificationStatus: any, customTitle?: string) => {
    return render(<IssuedBy verificationStatus={verificationStatus} document={document} title={customTitle} />);
  };

  it("should return appropriate display text when single dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "example.com",
          },
        ],
      },
    ];

    renderIssuedBy(fragments);
    expect(screen.getByText("Issued by:")).toBeInTheDocument();
    expect(screen.getByText("EXAMPLE.COM")).toBeInTheDocument();
  });

  it("should return appropriate display text when multiple dns are verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "example.com",
          },
          {
            status: "VALID",
            location: "tradetrust.io",
          },
        ],
      },
    ];

    renderIssuedBy(fragments);
    expect(screen.getByText("EXAMPLE.COM and TRADETRUST.IO")).toBeInTheDocument();
  });

  it("should return appropriate display text when multiple dns are verified (more than two)", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "example.com",
          },
          {
            status: "VALID",
            location: "tradetrust.io",
          },
          {
            status: "VALID",
            location: "openattestation.com",
          },
        ],
      },
    ];

    renderIssuedBy(fragments);
    expect(screen.getByText("EXAMPLE.COM, TRADETRUST.IO and OPENATTESTATION.COM")).toBeInTheDocument();
  });

  it("should return Unknown when no dns is verified", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "INVALID",
        data: [],
      },
    ];

    renderIssuedBy(fragments);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("should display custom title when provided", () => {
    const fragments = [
      {
        name: "OpenAttestationDnsTxtIdentityProof",
        type: "ISSUER_IDENTITY",
        status: "VALID",
        data: [
          {
            status: "VALID",
            location: "example.com",
          },
        ],
      },
    ];

    renderIssuedBy(fragments, "Demo issued by");
    expect(screen.getByText("Demo issued by:")).toBeInTheDocument();
  });

  it("should not render when document is null", () => {
    const { container } = render(<IssuedBy verificationStatus={[]} document={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render when verificationStatus is null", () => {
    const { container } = render(<IssuedBy verificationStatus={null as any} document={document} />);
    expect(container.firstChild).toBeNull();
  });
});
