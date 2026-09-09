import { render, screen } from "@testing-library/react";
import { v2, wrapOADocument } from "@trustvc/trustvc";
import React from "react";
import fs from "fs";
import path from "path";
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

describe("IssuedBy — Verifiable Presentation", () => {
  const presentation = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../test/fixture/w3c/presentations/valid/two_credentials.json"), "utf8")
  );

  // Any non-empty fragment set: IssuedBy only uses it to decide whether to render at all, and
  // for a presentation it reads the holder off the document rather than off the fragments.
  const fragments = [{ name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" }] as any;

  it('labels the identity "Presented by", because a presentation is asserted by its holder', () => {
    render(<IssuedBy verificationStatus={fragments} document={presentation} />);
    expect(screen.getByText("Presented by:")).toBeInTheDocument();
    expect(screen.queryByText("Issued by:")).not.toBeInTheDocument();
  });

  it("shows the holder, not an issuer — the envelope has no issuer of its own", () => {
    render(<IssuedBy verificationStatus={fragments} document={presentation} />);
    expect(screen.getByText(presentation.holder.toUpperCase())).toBeInTheDocument();
  });

  it('overrides the caller\'s title, since "Issued by" would be wrong for a presentation', () => {
    render(<IssuedBy verificationStatus={fragments} document={presentation} title="Demo issued by" />);
    expect(screen.getByText("Presented by:")).toBeInTheDocument();
    expect(screen.queryByText("Demo issued by:")).not.toBeInTheDocument();
  });

  it("falls back to Unknown when the presentation declares no holder", () => {
    const noHolder = { ...presentation };
    delete noHolder.holder;
    render(<IssuedBy verificationStatus={fragments} document={noHolder as any} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
