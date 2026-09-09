import { wrapOADocument, v2 } from "@trustvc/trustvc";
import { render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { DocumentUtility } from "./DocumentUtility";
HTMLCanvasElement.prototype.getContext = jest.fn();

const issuers = [
  {
    name: "John",
    documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
    identityProof: {
      type: v2.IdentityProofType.DNSTxt,
      location: "example.com",
    },
  },
];

describe("DocumentUtility", () => {
  it("should show QR code when document has one", async () => {
    const document = await wrapOADocument({
      issuers,
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
    await act(async () => {
      const container = render(
        <DocumentUtility document={document} onPrint={() => {}} selectedTemplate="bill-of-lading-template" />
      );

      const qrbuttonComponent = container.getByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeVisible();
    });
  });

  it("should not show QR code when document does not have one", async () => {
    const document = await wrapOADocument({
      issuers,
      name: "bah bah black sheep",
    });
    await act(async () => {
      const container = render(
        <DocumentUtility document={document} onPrint={() => {}} selectedTemplate="bill-of-lading-template" />
      );

      const qrbuttonComponent = container.queryByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeNull();
    });
  });

  it("should show correct download file name if exists", async () => {
    const document = await wrapOADocument({
      issuers,
      name: "bah bah black sheep",
    });
    render(<DocumentUtility document={document} onPrint={() => {}} selectedTemplate="bill-of-lading-template" />);
    expect(screen.queryByRole("button", { name: "document-utility-download" })).toHaveAttribute(
      "download",
      "bah bah black sheep.tt"
    );
  });

  it("should show Untitled file name if not exists", async () => {
    const document = await wrapOADocument({
      issuers,
    });
    render(<DocumentUtility document={document} onPrint={() => {}} selectedTemplate="bill-of-lading-template" />);
    expect(screen.queryByRole("button", { name: "document-utility-download" })).toHaveAttribute(
      "download",
      "Untitled.tt"
    );
  });
});

describe("DocumentUtility — download name", () => {
  const renderUtility = async (props: any) => {
    await act(async () => {
      render(<DocumentUtility onPrint={() => {}} selectedTemplate="custom-template" {...props} />);
    });
  };

  it("names the download after the document by default", async () => {
    const document = await wrapOADocument({ issuers, name: "bah bah black sheep" });
    await renderUtility({ document });
    expect(screen.getByLabelText("document-utility-download")).toHaveAttribute("download", "bah bah black sheep.tt");
  });

  it("falls back to Untitled when the document has no name", async () => {
    const document = await wrapOADocument({ issuers });
    await renderUtility({ document });
    expect(screen.getByLabelText("document-utility-download")).toHaveAttribute("download", "Untitled.tt");
  });

  it("uses downloadName when given, so presentation tabs cannot overwrite each other", async () => {
    // Two unnamed credentials in one presentation both fall back to "Untitled" while holding
    // DIFFERENT content — the override is what keeps their downloads distinct.
    const document = await wrapOADocument({ issuers });
    await renderUtility({ document, downloadName: "presentation-chafta-coo" });
    expect(screen.getByLabelText("document-utility-download")).toHaveAttribute(
      "download",
      "presentation-chafta-coo.tt"
    );
  });

  it("lets downloadName win over the document's own name", async () => {
    const document = await wrapOADocument({ issuers, name: "bah bah black sheep" });
    await renderUtility({ document, downloadName: "presentation-bill-of-lading" });
    expect(screen.getByLabelText("document-utility-download")).toHaveAttribute(
      "download",
      "presentation-bill-of-lading.tt"
    );
  });
});
