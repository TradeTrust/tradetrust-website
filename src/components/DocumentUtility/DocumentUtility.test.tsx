import { v2, wrapDocument } from "@govtechsg/open-attestation";
import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { DocumentUtility } from "./DocumentUtility";
HTMLCanvasElement.prototype.getContext = jest.fn();

describe("Nominate Owner", () => {
  it("should show QR code when document has one", async () => {
    const document = wrapDocument({
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
    await act(async () => {
      const container = render(<DocumentUtility document={document} onPrint={() => {}} />);

      const qrbuttonComponent = container.getByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeVisible();
    });
  });

  it("should not show QR code when document does not have one", async () => {
    const document = wrapDocument({
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
    });
    await act(async () => {
      const container = render(<DocumentUtility document={document as any} onPrint={() => {}} />);

      const qrbuttonComponent = container.queryByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeNull();
    });
  });
});
